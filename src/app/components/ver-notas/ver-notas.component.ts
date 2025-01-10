import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TareasService } from '../../services/tareas.service'; // Ajustar según tu estructura
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-ver-notas',
  templateUrl: './ver-notas.component.html',
  styleUrls: ['./ver-notas.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class VerNotasComponent implements OnInit {
  notas: any[] = [];
  idUsuario!: string;
  idClase!: number;
  idGrupo!: number;

  constructor(
    private route: ActivatedRoute,
    private tareasService: TareasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.idUsuario = params['idUsuario'] || 0;
      this.idClase = +params['idClase'] || 0;
      this.idGrupo = +params['idGrupo'] || 0;
  
      // Llama al servicio para obtener las notas
      this.obtenerNotas();
    });
  }

  obtenerNotas(): void {
    this.tareasService.obtenerNotas(this.idGrupo, this.idClase, this.idUsuario).subscribe({
      next: (response) => {
        this.notas = response.notas;
      },
      error: (err) => {
        console.error('Error al obtener las notas:', err);
      },
    });
  }

  goBack(): void {
    // Redirige de regreso al componente de grupos-clases-alumno
    this.router.navigate(['/grupos-clases-alumno']);
  }
}
