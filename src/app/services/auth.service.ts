import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);

  constructor() {
    const user = this.getUserFromLocalStorage();
    this.currentUserSubject.next(user);
  }

  getUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  setUser(user: any): void {
    this.saveUserToLocalStorage(user);
    this.currentUserSubject.next(user);
  }

  clearUser(): void {
    this.removeUserFromLocalStorage();
    this.currentUserSubject.next(null);
  }

  private saveUserToLocalStorage(user: any): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('usuario', JSON.stringify(user));
    }
  }

  private getUserFromLocalStorage(): any {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('usuario');
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  }

  private removeUserFromLocalStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('usuario');
    }
  }
}
