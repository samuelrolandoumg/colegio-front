import { Component, OnInit } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-tareas-asignadas',
  standalone: true, // Indica que este es un componente independiente
  imports: [CommonModule, RouterModule], // Importar módulos necesarios
  templateUrl: './tareas-asignadas.component.html',
  styleUrls: ['./tareas-asignadas.component.css'],
})
export class TareasAsignadasComponent implements OnInit {
  tareas: any[] = [];
  usuario: any = null;
  noTareasPendientes: boolean = false;

  constructor(
    private tareasService: TareasService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      if (user) {
        this.usuario = user;
        this.cargarTareas();
      }
    });
  }

  cargarTareas(): void {
    this.tareasService.obtenerTareasAsignadas(this.usuario.id_usuario).subscribe({
      next: (response: any) => {
        this.tareas = response.tareas;
        this.noTareasPendientes = this.tareas.length === 0; // Validar si no hay tareas pendientes
      },
      error: (err) => {
        console.error('Error al cargar tareas:', err);
      },
    });
  }

  irAEntregarTarea(id_tarea: number): void {
    this.router.navigate(['/entregar-tarea'], { queryParams: { id_tarea } });
  }
  

    navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  logout(): void {
    this.authService.clearUser();
    alert('Sesión cerrada correctamente');
    this.router.navigate(['/login']);
  }

}
