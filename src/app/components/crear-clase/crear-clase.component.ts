import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { ClasesService } from '../../services/clases.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-crear-clase',
  templateUrl: './crear-clase.component.html',
  styleUrls: ['./crear-clase.component.css'],
  standalone: true, // Indica que este es un componente independiente
  imports: [CommonModule, RouterModule,ReactiveFormsModule,FormsModule],
})
export class CrearClaseComponent implements OnInit {
  claseForm!: FormGroup;
  profesores: any[] = [];

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private clasesService: ClasesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Inicializar el formulario
    this.claseForm = this.fb.group({
      nombre_clase: ['', Validators.required],
      descripcion: ['', Validators.required],
      id_profesor: [null, Validators.required],
    });

    // Obtener la lista de profesores
    this.cargarProfesores();
  }

  cargarProfesores(): void {
    this.usuariosService.obtenerProfesores().subscribe({
      next: (response) => {
        this.profesores = response.profesores; // Asignar la lista de profesores
      },
      error: (err) => {
        console.error('Error al obtener la lista de profesores:', err);
        alert('Error al cargar los profesores.');
      },
    });
  }

  onSubmit(): void {
    if (this.claseForm.invalid) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }

    this.clasesService.crearClase(this.claseForm.value).subscribe({
      next: (response) => {
        alert('Clase creada exitosamente.');
        this.router.navigate(['/dashboard']); // Redirigir después de crear
      },
      error: (err) => {
        if (err.error && err.error.message) {
          alert(err.error.message); // Mostrar mensaje de error del backend
        } else {
          alert('Error al crear la clase.');
        }
      },
    });
  }
  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
