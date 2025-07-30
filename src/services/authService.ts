import { User } from '../types';

// Mock authentication service
class AuthService {
  private currentUser: User | null = null;

  // Simulate login
  async login(email: string, role: 'admin' | 'data-entry-operator'): Promise<User> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock user creation
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      role,
      name: this.getNameFromEmail(email)
    };

    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }

  // Get current user
  getCurrentUser(): User | null {
    if (this.currentUser) {
      return this.currentUser;
    }

    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.currentUser = JSON.parse(userStr);
      return this.currentUser;
    }

    return null;
  }

  // Logout
  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('user');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  // Check if user has specific role
  hasRole(role: 'admin' | 'data-entry-operator'): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  // Helper method to extract name from email
  private getNameFromEmail(email: string): string {
    const name = email.split('@')[0];
    return name.split('.').map(part => 
      part.charAt(0).toUpperCase() + part.slice(1)
    ).join(' ');
  }
}

export const authService = new AuthService();
