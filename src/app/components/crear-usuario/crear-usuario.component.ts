// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { UsuariosService } from '../../services/usuarios.service';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
// import { ActivatedRoute, Router } from '@angular/router';

// @Component({
//   selector: 'app-crear-usuario',
//   templateUrl: './crear-usuario.component.html',
//   styleUrls: ['./crear-usuario.component.css'],
//   standalone: true,
//   imports: [CommonModule,ReactiveFormsModule],
// })
// export class CrearUsuarioComponent implements OnInit {
//   usuarioForm!: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private usuariosService: UsuariosService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.usuarioForm = this.fb.group({
//       id_usuario: ['', Validators.required],
//       nombre: ['', Validators.required],
//       correo: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required],
//       rol: ['', Validators.required],
//     });
//   }

//   onSubmit(): void {
//     if (this.usuarioForm.invalid) {
//       alert('Por favor, complete todos los campos correctamente.');
//       return;
//     }

//     this.usuariosService.crearUsuario(this.usuarioForm.value).subscribe({
//       next: (response) => {
//         alert('Usuario creado exitosamente.');
//         this.usuarioForm.reset();
//       },
//       error: (err) => {
//         console.error('Error al crear el usuario:', err);
//         alert('Error al crear el usuario.');
//       },
//     });
//   }

//   goBack(): void {
//     this.router.navigate(['/dashboard']);
//   }

// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class CrearUsuarioComponent implements OnInit {
  usuarioForm!: FormGroup;
  currentYear = new Date().getFullYear(); // Año actual

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      id_usuario: ['', Validators.required],
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rol: ['', Validators.required],
    });

    this.usuarioForm.get('rol')?.valueChanges.subscribe((rol) => {
      this.generarIdUsuario(rol);
    });
  }

  generarIdUsuario(rol: string): void {
    let prefijo = '';

    switch (rol) {
      case 'Alumno':
        prefijo = '10';
        break;
      case 'Profesor':
        prefijo = '20';
        break;
      case 'Admin':
        prefijo = '30';
        break;
      default:
        this.usuarioForm.patchValue({ id_usuario: '' });
        return;
    }

    this.usuariosService.obtenerUltimoId(prefijo).subscribe({
      next: (response) => {
        const ultimoId = response.ultimoId || 0;
        const nuevoId = `${prefijo}-${this.currentYear}-${ultimoId + 1}`;
        this.usuarioForm.patchValue({ id_usuario: nuevoId });
      },
      error: (err) => {
        console.error('Error al obtener el último ID:', err);
        alert('No se pudo generar el ID de usuario automáticamente.');
      },
    });
  }

  onSubmit(): void {
    if (this.usuarioForm.invalid) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }

    this.usuariosService.crearUsuario(this.usuarioForm.value).subscribe({
      next: (response) => {
        alert('Usuario creado exitosamente.');
        this.usuarioForm.reset();
      },
      error: (err) => {
        console.error('Error al crear el usuario:', err);
        alert('Error al crear el usuario.');
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}