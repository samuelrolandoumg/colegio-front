import { Component, OnInit } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-grupos-clases-alumno',
  templateUrl: './grupos-clases-alumno.component.html',
  styleUrls: ['./grupos-clases-alumno.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule], // Importar CommonModule para habilitar *ngIf y *ngFor
})
export class GruposClasesAlumnoComponent implements OnInit {
  clases: any[] = [];
  grupos: any[] = [];
  usuario: any = null;
  gruposClases: any[] = [];

  constructor(
    private tareasService: TareasService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      if (user) {
        this.usuario = user;
        this.obtenerGruposClases(user.id_usuario);
      }
    });
  }

  obtenerGruposClases(idUsuario: string): void {
    this.tareasService.obtenerGruposYClases(idUsuario).subscribe({
      next: (response) => {
        this.gruposClases = response.grupos;
      },
      error: (err) => {
        console.error('Error al obtener los grupos y clases:', err);
      },
    });
  }

  verNotas(idGrupo: number, idClase: number): void {
    this.router.navigate(['/ver-notas'], { queryParams: { idGrupo, idClase, idUsuario: this.usuario.id_usuario } });
  }
  

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
