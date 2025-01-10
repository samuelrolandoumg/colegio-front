import { Component, OnInit } from '@angular/core';
import { ProfesorService } from '../../services/profesor.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-grupos-clases',
  templateUrl: './grupos-clases.component.html',
  styleUrls: ['./grupos-clases.component.css'],
  standalone: true, // Indica que este es un componente independiente
  imports: [CommonModule, RouterModule], // Importar CommonModule para habilitar *ngIf y *ngFor
})
export class GruposClasesComponent implements OnInit {
  clases: any[] = [];
  grupos: any[] = [];
  usuario: any = null;
  tareas: any[] = [];
  gruposClases: any[] = [];

  constructor(
    private profesorService: ProfesorService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      if (user) {
        this.usuario = user;
        this.obtenerGruposClases(user.id_usuario);
      }
    });
  }

  obtenerGruposClases(idProfesor: string): void {
    this.profesorService.obtenerGruposPorProfesor(idProfesor).subscribe({
      next: (response) => {
        this.gruposClases = response.grupos;
      },
      error: (err) => {
        console.error('Error al obtener los grupos y clases:', err);
      },
    });
  }

  verTareas(idGrupo: number, idClase: number): void {
    this.router.navigate(['/tareas'], { queryParams: { idGrupo, idClase } });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
