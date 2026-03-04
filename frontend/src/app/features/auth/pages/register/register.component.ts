import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  errorMessage = '';

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value as any).subscribe({
        next: () => {
          this.authService.login({
            email: this.registerForm.value.email!,
            password: this.registerForm.value.password!
          }).subscribe({
            next: () => this.router.navigate(['/tasks'])
          });
        },
        error: (err) => this.errorMessage = err.error?.message || 'Registration failed.'
      });
    }
  }
}
