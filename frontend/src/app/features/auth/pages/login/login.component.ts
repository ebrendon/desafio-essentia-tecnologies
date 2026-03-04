import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  errorMessage = '';

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value as any).subscribe({
        next: () => this.router.navigate(['/tasks']),
        error: (err) => this.errorMessage = err.error?.message || 'Login failed. Invalid credentials.'
      });
    }
  }
}
