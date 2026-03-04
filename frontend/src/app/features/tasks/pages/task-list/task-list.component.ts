import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { combineLatest, Subscription } from 'rxjs';
import { debounceTime, startWith } from 'rxjs/operators';
import { TasksService } from '../../services/tasks.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Task } from '../../../../shared/models/task.model';
import { TaskModalComponent } from '../../components/task-modal/task-modal.component';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TaskModalComponent, ConfirmModalComponent, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit, OnDestroy {
  private tasksService = inject(TasksService);
  private authService = inject(AuthService);

  tasks: Task[] = [];
  currentUser = this.authService.currentUser;
  
  isModalOpen = false;
  selectedTask: Task | null = null;
  
  isDeleteModalOpen = false;
  taskToDeleteId: string | null = null;
  
  statusControl = new FormControl<'ALL' | 'COMPLETED' | 'PENDING'>('ALL');
  mineOnlyControl = new FormControl<boolean>(false);
  private filtersSub?: Subscription;

  ngOnInit() {
    this.setupFilters();
  }

  ngOnDestroy() {
    if (this.filtersSub) {
      this.filtersSub.unsubscribe();
    }
  }

  setupFilters() {
    this.filtersSub = combineLatest([
      this.statusControl.valueChanges.pipe(startWith(this.statusControl.value)),
      this.mineOnlyControl.valueChanges.pipe(startWith(this.mineOnlyControl.value))
    ]).pipe(
      debounceTime(300)
    ).subscribe(([status, mineOnly]) => {
      this.loadTasks(status, mineOnly);
    });
  }

  loadTasks(status: 'ALL' | 'COMPLETED' | 'PENDING' | null, mineOnly: boolean | null) {
    const filters: { completed?: boolean; authorId?: string } = {};

    if (status === 'COMPLETED') filters.completed = true;
    else if (status === 'PENDING') filters.completed = false;

    if (mineOnly && this.currentUser) {
      filters.authorId = this.currentUser.sub;
    }

    this.tasksService.findAll(filters).subscribe({
      next: (tasks) => this.tasks = tasks,
      error: (err) => console.error('Falha ao carregar as tarefas', err)
    });
  }

  canManage(task: Task): boolean {
    if (!this.currentUser) return false;
    return this.currentUser.role === 'ADMIN' || this.currentUser.sub === task.authorId;
  }

  openCreateModal() {
    this.selectedTask = null;
    this.isModalOpen = true;
  }

  openEditModal(task: Task) {
    if (!this.canManage(task)) return;
    this.selectedTask = task;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedTask = null;
  }

  onSaveTask(data: { id?: string, payload: any }) {
    if (data.id) {
      this.tasksService.update(data.id, data.payload).subscribe(() => {
        this.loadTasks(this.statusControl.value, this.mineOnlyControl.value);
        this.closeModal();
      });
    } else {
      this.tasksService.create(data.payload).subscribe(() => {
        this.loadTasks(this.statusControl.value, this.mineOnlyControl.value);
        this.closeModal();
      });
    }
  }

  deleteTask(id: string) {
    this.taskToDeleteId = id;
    this.isDeleteModalOpen = true;
  }

  confirmDelete() {
    if (this.taskToDeleteId) {
      this.tasksService.remove(this.taskToDeleteId).subscribe(() => {
        this.loadTasks(this.statusControl.value, this.mineOnlyControl.value);
        this.isDeleteModalOpen = false;
        this.taskToDeleteId = null;
      });
    }
  }

  cancelDelete() {
    this.isDeleteModalOpen = false;
    this.taskToDeleteId = null;
  }

  logout() {
    this.authService.logout();
  }
}
