import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, CreateTaskDto, UpdateTaskDto } from '../../../shared/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private http = inject(HttpClient);
  private apiUrl = '/api/tasks';

  findAll(filters?: { completed?: boolean; authorId?: string }): Observable<Task[]> {
    let params = new HttpParams();
    if (filters?.completed !== undefined) {
      params = params.set('completed', String(filters.completed));
    }
    if (filters?.authorId) {
      params = params.set('authorId', filters.authorId);
    }
    return this.http.get<Task[]>(this.apiUrl, { params });
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
