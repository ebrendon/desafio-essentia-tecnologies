import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, CreateTaskDto, UpdateTaskDto } from '../../../shared/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private http = inject(HttpClient);
  private apiUrl = '/api/tasks';

  findAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  findOne(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  create(createTaskDto: CreateTaskDto): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, createTaskDto);
  }

  update(id: string, updateTaskDto: UpdateTaskDto): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}`, updateTaskDto);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
