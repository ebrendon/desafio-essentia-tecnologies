import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Task } from '../../../../shared/models/task.model';
import { TaskModalComponent } from '../../components/task-modal/task-modal.component';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskModalComponent, ConfirmModalComponent, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  private tasksService = inject(TasksService);
  private authService = inject(AuthService);

  tasks: Task[] = [];
  currentUser = this.authService.currentUser;
  
  isModalOpen = false;
  selectedTask: Task | null = null;
  
  isDeleteModalOpen = false;
  taskToDeleteId: string | null = null;
  
  filterStatus: 'ALL' | 'COMPLETED' | 'PENDING' = 'ALL';
  filterMineOnly: boolean = false;

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    const filters: { completed?: boolean; authorId?: string } = {};

    if (this.filterStatus === 'COMPLETED') filters.completed = true;
    else if (this.filterStatus === 'PENDING') filters.completed = false;

    if (this.filterMineOnly && this.currentUser) {
      filters.authorId = this.currentUser.sub;
    }

    this.tasksService.findAll(filters).subscribe({
      next: (tasks) => this.tasks = tasks,
      error: (err) => console.error('Falha ao carregar as tarefas', err)
    });
  }

  onFilterStatusChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.filterStatus = target.value as any;
    this.loadTasks();
  }

  onFilterMineOnlyChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.filterMineOnly = target.checked;
    this.loadTasks();
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
        this.loadTasks();
        this.closeModal();
      });
    } else {
      this.tasksService.create(data.payload).subscribe(() => {
        this.loadTasks();
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
        this.loadTasks();
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
