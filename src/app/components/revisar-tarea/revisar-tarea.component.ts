import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe'; // Ruta ajustada según tu estructura
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { ProfesorService } from '../../services/profesor.service'; // Ajusta la ruta según tu estructura

@Component({
  selector: 'app-revisar-tarea',
  templateUrl: './revisar-tarea.component.html',
  styleUrls: ['./revisar-tarea.component.css'],
  standalone: true, // Indica que este es un componente independiente
  imports: [CommonModule, RouterModule,SafeUrlPipe, FormsModule], // Importar CommonModule para habilitar *ngIf y *ngFor
})
export class RevisarTareaComponent implements OnInit {
  archivoNombre: string = '';
  archivoUrl: string = '';
  mensaje: string = '';
  idTarea!: number;
  idEntrega!: number;
  idGrupo!: number;
  idClase!: number;
  idAlumno!: string;
  punteo: number = 0;
  punteoActual: number = 0;

  constructor(
    private route: ActivatedRoute,
    private profesorService: ProfesorService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.idTarea = +params['idTarea'] || 0;
      this.idEntrega = +params['idEntrega'] || 0;
      this.obtenerEntrega();
      this.cargarPunteoActual();
    });
  }

  obtenerEntrega(): void {
    this.profesorService
      .obtenerTareaPorId(this.idTarea, this.idEntrega)
      .subscribe(
        (response) => {
          this.archivoUrl = response.entrega.archivo_url;
          this.archivoNombre = response.entrega.archivo_nombre;
          this.punteoActual = response.entrega.Tarea.puntuaciocion; // Obtiene el punteo actual
          this.idAlumno = response.entrega.id_alumno; // Asigna el idAlumno correctamente
          this.punteoActual = response.entrega.punteo; // Asignamos directamente el punteo desde la respuesta
          this.idGrupo = response.entrega.Tarea.id_grupo; // Asignamos el grupo
          this.idClase = response.entrega.Tarea.Grupo.id_clase; // Asignamos la clase
        },
        (error) => {
          console.error('Error al cargar la entrega:', error);
          this.mensaje = 'No se pudo cargar la entrega. Verifica los parámetros.';
        }
      );
  }

  calificarEntrega(): void {
    if (!this.punteo || this.punteo <= 0) {
      alert('Por favor, ingrese un punteo válido.');
      return;
    }

    // Llama al servicio para calificar la tarea
    this.profesorService
      .calificarTarea(this.idTarea, this.idEntrega, this.idAlumno, this.punteo)
      .subscribe(
        (response) => {
          alert('Calificación actualizada correctamente.');
          this.punteoActual = this.punteo; // Actualiza el punteo mostrado
          this.punteo = 0; // Limpia el campo del input
        },
        (error) => {
          console.error('Error al calificar la tarea:', error);
          alert('Error al calificar la entrega.');
        }
      );
  }

  volver(): void {
    this.router.navigate(['/tareas'], { queryParams: { idGrupo: this.idGrupo, idClase: this.idClase } });
  }

  cargarPunteoActual(): void {
    this.profesorService.obtenerPunteoActual(this.idTarea, this.idEntrega, this.idAlumno).subscribe(
      (response) => {
        this.punteoActual = response.punteo;
      },
      (error) => {
        console.error('Error al cargar el punteo:', error);
        this.mensaje = 'No se pudo cargar el punteo actual.';
      }
    );
  }   
  
}
