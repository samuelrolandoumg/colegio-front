

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProfesorService } from '../../services/profesor.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
})
export class ListaAlumnosComponent implements OnInit {
  clases: any[] = [];
  idProfesor: string | null = null;

  constructor(
    private authService: AuthService,
    private profesorService: ProfesorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe({
      next: (user) => {
        if (user && user.id_usuario) {
          this.idProfesor = user.id_usuario;
          this.cargarGruposClasesAlumnos();
        }
      },
      error: (err) => {
        console.error('Error al obtener el usuario:', err);
      },
    });
  }

  cargarGruposClasesAlumnos(): void {
    if (this.idProfesor) {
      this.profesorService.obtenerGruposClasesAlumnos(this.idProfesor).subscribe({
        next: (response) => {
          this.clases = response.data;
        },
        error: (err) => {
          console.error('Error al obtener los datos:', err);
        },
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  descargarPDF(): void {
    // Usar la funcionalidad de impresión del navegador
    window.print();
  }
}
