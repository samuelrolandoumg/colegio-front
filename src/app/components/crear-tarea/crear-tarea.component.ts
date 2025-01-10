import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfesorService } from '../../services/profesor.service';
import { TareasService } from '../../services/tareas.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.css'],
  standalone: true, // Indica que este es un componente independiente
  imports: [CommonModule, RouterModule,ReactiveFormsModule],
})
export class CrearTareaComponent implements OnInit {
  tareaForm!: FormGroup;
  gruposClases: any[] = [];
  profesor: any = null;

  constructor(
    private fb: FormBuilder,
    private profesorService: ProfesorService,
    private tareasService: TareasService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tareaForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      puntuacion: [0, [Validators.required, Validators.min(1)]],
      fecha_entrega: ['', Validators.required],
      tipo_documento: ['pdf', Validators.required],
      id_grupo: [null, Validators.required],
    });

    this.authService.getUser().subscribe((user) => {
      if (user) {
        this.profesor = user;
        this.cargarGruposYClases(user.id_usuario);
      }
    });
  }

  cargarGruposYClases(idProfesor: string): void {
    this.profesorService.obtenerGruposPorProfesor(idProfesor).subscribe({
      next: (response) => {
        this.gruposClases = response.grupos;
      },
      error: (err) => {
        console.error('Error al cargar los grupos y clases:', err);
      },
    });
  }

  onSubmit(): void {
    if (this.tareaForm.invalid) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }
  
    const formData = new FormData();
    const tarea = this.tareaForm.value;
  
    // Agregar los campos al FormData
    formData.append('titulo', tarea.titulo);
    formData.append('descripcion', tarea.descripcion);
    formData.append('puntuacion', tarea.puntuacion.toString());
    formData.append('fecha_entrega', tarea.fecha_entrega);
    formData.append('tipo_documento', tarea.tipo_documento);
    formData.append('id_grupo', tarea.id_grupo);
  
  // Opcional: agregar archivo si está seleccionado
  const fileInput = document.getElementById('archivo') as HTMLInputElement;
  if (fileInput.files && fileInput.files[0]) {
    formData.append('file', fileInput.files[0]);
  }
  
    this.tareasService.crearTarea(formData).subscribe({
      next: (response) => {
        alert('Tarea creada exitosamente.');
        this.tareaForm.reset(); // Resetear el formulario
        if (fileInput) {
          fileInput.value = ''; // Limpiar el campo de archivo
        }
      },
      error: (err) => {
        console.error('Error al crear tarea:', err);
        alert('Error al crear la tarea.');
      },
    });
  }
  

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

}
