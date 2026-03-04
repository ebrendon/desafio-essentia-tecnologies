import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { AuthResponse } from '../../shared/models/auth.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private tokenKey = 'access_token';

  private isAuthenticated$ = new BehaviorSubject<boolean>(this.hasToken());

  get isAuthenticated() {
    return this.isAuthenticated$.asObservable();
  }

  get currentUser(): { sub: string; role: string; name: string; email: string } | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }

  hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  login(credentials: { email: string; password: string }) {
    return this.http.post<AuthResponse>('/api/auth/login', credentials).pipe(
      tap(res => {
        localStorage.setItem(this.tokenKey, res.access_token);
        this.isAuthenticated$.next(true);
      })
    );
  }

  register(user: any) {
    return this.http.post('/api/users', user);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticated$.next(false);
    this.router.navigate(['/auth/login']);
  }
}
