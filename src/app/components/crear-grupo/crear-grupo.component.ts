import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GruposService } from '../../services/grupos.service';
import { ProfesorService } from '../../services/profesor.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-crear-grupo',
  templateUrl: './crear-grupo.component.html',
  styleUrls: ['./crear-grupo.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule,ReactiveFormsModule],
})
export class CrearGrupoComponent implements OnInit {
  grupoForm!: FormGroup;
  alumnos: any[] = [];
  clases: any[] = [];
  profesor: any = null;

  constructor(
    private fb: FormBuilder,
    private gruposService: GruposService,
    private profesorService: ProfesorService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.grupoForm = this.fb.group({
      nombre_grupo: ['', Validators.required],
      id_clase: [null, Validators.required],
      alumnos: [[], Validators.required],
    });

    this.authService.getUser().subscribe((user) => {
      if (user) {
        this.profesor = user;
        this.cargarClases(user.id_usuario);
        this.cargarAlumnos();
      }
    });
  }

  cargarClases(idProfesor: string): void {
    this.profesorService.obtenerClasesPorProfesor(idProfesor).subscribe({
      next: (response) => {
        this.clases = response.data;
      },
      error: (err) => {
        console.error('Error al cargar clases:', err);
      },
    });
  }

  cargarAlumnos(): void {
    this.gruposService.obtenerAlumnos().subscribe({
      next: (response) => {
        this.alumnos = response.usuarios;
      },
      error: (err) => {
        console.error('Error al cargar alumnos:', err);
      },
    });
  }

  onAlumnoSelect(event: any): void {
    const selectedAlumnos = this.grupoForm.get('alumnos')?.value || [];
    if (event.target.checked) {
      this.grupoForm.get('alumnos')?.setValue([...selectedAlumnos, event.target.value]);
    } else {
      this.grupoForm
        .get('alumnos')
        ?.setValue(selectedAlumnos.filter((id: string) => id !== event.target.value));
    }
  }

  onSubmit(): void {
    if (this.grupoForm.invalid) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }

    this.gruposService.crearGrupo(this.grupoForm.value).subscribe({
      next: (response) => {
        alert('Alumnos agregados exitosamente.');
        this.grupoForm.reset(); // Limpiar el formulario
      },
      error: (err) => {
        console.error('Error al agregar alumnos:', err); // Mostrar en consola para depuración
        const errorMessage = err?.error?.message || 'Ocurrió un error desconocido.';
        alert(errorMessage); // Mostrar el mensaje enviado por el backend
      },
    }); 
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
