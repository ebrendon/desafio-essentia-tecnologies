export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  access_token: string;
}
