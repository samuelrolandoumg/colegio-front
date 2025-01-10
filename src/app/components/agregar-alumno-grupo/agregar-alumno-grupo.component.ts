import { Component, OnInit } from '@angular/core';
import { ProfesorService } from '../../services/profesor.service';
import { UsuariosService } from '../../services/usuarios.service';
import { TareasService } from '../../services/tareas.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-agregar-alumno-grupo',
  templateUrl: './agregar-alumno-grupo.component.html',
  styleUrls: ['./agregar-alumno-grupo.component.css'],
  standalone: true, // Indica que este es un componente independiente
  imports: [CommonModule, RouterModule,ReactiveFormsModule,FormsModule],
})
export class AgregarAlumnoGrupoComponent implements OnInit {
  grupos: any[] = [];
  alumnos: any[] = [];
  idGrupoSeleccionado: number | null = null;
  alumnosSeleccionados: string[] = [];
  idProfesor: string | null = null;

  constructor(
    private profesorService: ProfesorService,
    private usuariosService: UsuariosService,
    private tareasService: TareasService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe({
      next: (user) => {
        if (user && user.id_usuario) {
          this.idProfesor = user.id_usuario;
          this.profesorService.obtenerGruposPorProfesor(user.id_usuario).subscribe({
            next: (response) => {
              this.grupos = response.grupos;
            },
            error: (err) => {
              console.error('Error al obtener los grupos:', err);
            },
          });
        }
      },
      error: (err) => {
        console.error('Error al obtener el usuario:', err);
      },
    });

    // Obtén los alumnos
    this.usuariosService.obtenerAlumnos().subscribe({
      next: (response) => {
        this.alumnos = response.usuarios;
      },
      error: (err) => {
        console.error('Error al obtener los alumnos:', err);
      },
    });
  }

  agregarAlumnosAGrupo(): void {
    if (!this.idGrupoSeleccionado || this.alumnosSeleccionados.length === 0) {
      alert('Selecciona un grupo y al menos un alumno.');
      return;
    }

    const body = {
      id_grupo: this.idGrupoSeleccionado,
      alumnos: this.alumnosSeleccionados,
    };

    this.tareasService.agregarAlumnosAGrupo(body).subscribe({
      next: () => {
        alert('Alumnos agregados al grupo exitosamente.');
        this.alumnosSeleccionados = [];
        this.idGrupoSeleccionado = null;
      },
      error: (err) => {
        console.error('Error al agregar alumnos al grupo:', err);
        if (err.error && err.error.message) {
          alert(err.error.message); // Muestra el mensaje del backend
        } else {
          alert('Ocurrió un error al agregar alumnos al grupo.'); // Mensaje genérico si no hay mensaje específico
        }
      },
    });
  }

  toggleAlumnoSeleccionado(idUsuario: string): void {
    if (this.alumnosSeleccionados.includes(idUsuario)) {
      this.alumnosSeleccionados = this.alumnosSeleccionados.filter(
        (id) => id !== idUsuario
      );
    } else {
      this.alumnosSeleccionados.push(idUsuario);
    }
  }
  
  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
