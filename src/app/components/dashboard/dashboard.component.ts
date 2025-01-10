import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common'; // Importa esto para usar *ngFor y *ngIf

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true, // Asegúrate de que esté configurado como standalone si estás usando Angular independiente
  imports: [CommonModule], // Asegúrate de incluir CommonModule
})
export class DashboardComponent {
  usuario: any = null;
  menuOptions: any[] = [];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUser().subscribe((user) => {
      if (user) {
        this.usuario = user;
        this.cargarMenu(user.rol); // Configura el menú según el rol
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  cargarMenu(rol: string) {
    const menuByRole: { [key: string]: any[] } = {
      Alumno: [
        { label: 'Tareas Pendientes', action: () => this.redirigirTarea() },
        { label: 'Mis Clases', action: () => this.clasesAlumnos() },
      ],
      Profesor: [
        { label: 'Agregar Alumno a Grupo', action: () => this.agregarAlumnoGrupo() },
        { label: 'Crear Tarea', action: () => this.crearTarea() },
        { label: 'Crear Materia', action: () => this.crearGrupo() },
        { label: 'Grados y tareas', action: () => this.redirigirAsignaciones() },
        { label: 'Lista de Alumnos', action: () => this.listarAlumnos() },
        { label: 'Ver calificaciones', action: () => this.verCalificaciones() },

      ],
      Admin: [
        { label: 'Crear Grado', action: () => this.crearClase() },
        { label: 'Crear Usuario', action: () => this.crearUsuario() },
      ],
    };

    this.menuOptions = menuByRole[rol] || [];
  }

  logout() {
    this.authService.clearUser();
    alert('Sesión cerrada correctamente');
    this.router.navigate(['/login']);
  }

  redirigirTarea() {
    this.router.navigate(['/tareas-asignadas']);
  }

  redirigirAsignaciones() {
    this.router.navigate(['/grupos-clases']);
  }

  clasesAlumnos() {
    this.router.navigate(['/grupos-clases-alumno']);
  }

  crearTarea() {
    this.router.navigate(['/crear-tarea']);
  }

  crearUsuario() {
    this.router.navigate(['/crear-usuario']);
  }

  crearGrupo() {
    this.router.navigate(['/crear-grupo']);
  }

  agregarAlumnoGrupo() {
    this.router.navigate(['/agregar-alumno-grupo']);
  }

  crearClase() {
    this.router.navigate(['/crear-clase']);
  }

  listarAlumnos() {
    this.router.navigate(['/lista-alumnos']);
  }

  verCalificaciones() {
    this.router.navigate(['/ver-calificaciones-alumnos']);
  }
}
