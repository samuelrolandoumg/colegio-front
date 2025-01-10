import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-listar-profesores',
  templateUrl: './listar-profesores.component.html',
  styleUrls: ['./listar-profesores.component.css'],
  standalone: true, // Indica que este es un componente independiente
  imports: [CommonModule, RouterModule,ReactiveFormsModule,FormsModule],
})
export class ListarProfesoresComponent implements OnInit {
  profesores: any[] = [];

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.usuariosService.obtenerProfesores().subscribe({
      next: (response) => {
        this.profesores = response.profesores;
      },
      error: (err) => {
        console.error('Error al obtener profesores:', err);
        alert('Error al obtener la lista de profesores.');
      },
    });
  }
}
