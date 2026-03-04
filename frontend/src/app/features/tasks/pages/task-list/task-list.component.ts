import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Task } from '../../../../shared/models/task.model';
import { TaskModalComponent } from '../../components/task-modal/task-modal.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskModalComponent, RouterLink],
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

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.tasksService.findAll().subscribe({
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
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      this.tasksService.remove(id).subscribe(() => {
        this.loadTasks();
      });
    }
  }

  logout() {
    this.authService.logout();
  }
}
