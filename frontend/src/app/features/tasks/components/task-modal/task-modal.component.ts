import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../../../shared/models/task.model';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss'
})
export class TaskModalComponent implements OnInit {
  @Input() task: Task | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<{id?: string, payload: any}>();

  private fb = inject(FormBuilder);

  taskForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    completed: [false]
  });

  ngOnInit() {
    if (this.task) {
      this.taskForm.patchValue({
        title: this.task.title,
        description: this.task.description || '',
        completed: this.task.completed
      });
    }
  }

  onSave() {
    if (this.taskForm.valid) {
      this.save.emit({
        id: this.task?.id,
        payload: this.taskForm.value
      });
    }
  }
}
