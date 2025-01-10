import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true, // Asegura que sea un componente autónomo
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
})
export class LoginComponent {
  correo: string = '';
  password: string = '';
  showToast: boolean = false;
  toastMessage: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  login() {
    
    this.http
      .post('https://colegio-back-production.up.railway.app/api/auth/login', {
        correo: this.correo,
        password: this.password,
      })
      .subscribe(
        (response: any) => {
          alert('Inicio de sesión exitoso');
          this.authService.setUser(response.usuario);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.showToastMessage('Error al iniciar sesión');
        }
      );
  }
  showToastMessage(message: string) {
    this.toastMessage = message;
    this.showToast = true;

    // El mensaje se cerrará automáticamente después de 3 segundos
    setTimeout(() => {
      this.closeToast();
    }, 3000);
  }

  closeToast() {
    this.showToast = false;
  }
}
