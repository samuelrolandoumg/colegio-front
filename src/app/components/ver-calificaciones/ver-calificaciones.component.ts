import { Component, OnInit } from '@angular/core';
import { ProfesorService } from '../../services/profesor.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-ver-calificaciones',
  templateUrl: './ver-calificaciones.component.html',
  styleUrls: ['./ver-calificaciones.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class VerCalificacionesComponent implements OnInit {
  calificacionesData: any[] = [];
  usuario: any = null;

  constructor(
    private profesorService: ProfesorService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      if (user) {
        this.usuario = user;
        this.obtenerCalificaciones(user.id_usuario);
      }
    });
  }

  obtenerCalificaciones(idProfesor: string): void {
    this.profesorService.obtenerCalificaciones(idProfesor).subscribe({
      next: (response) => {
        this.calificacionesData = response.data;
        console.log('Calificaciones obtenidas:', this.calificacionesData);
      },
      error: (err) => {
        console.error('Error al obtener las calificaciones:', err);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
