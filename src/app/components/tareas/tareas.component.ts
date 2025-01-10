import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfesorService } from '../../services/profesor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css'],
    standalone: true, 
    imports: [CommonModule], 
})
export class TareasComponent implements OnInit {
  idGrupo!: number;
  idClase!: number;
  tareas: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private profesorService: ProfesorService,
    private router: Router
  ) {}

  // ngOnInit(): void {
  //   this.route.queryParams.subscribe((params) => {
  //      this.idGrupo = +params['idGrupo'] || 0;
  //      this.idClase = +params['idClase'] || 0;
  //       this.obtenerTareas();
  //   });
  // } 

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.idGrupo = +params['idGrupo'] || 0;
      this.idClase = +params['idClase'] || 0;
  
        this.obtenerTareas();

    });
  }
  

  obtenerTareas(): void {
    this.profesorService.obtenerTareasPorClase(this.idGrupo, this.idClase).subscribe({
      next: (response) => {
        this.tareas = response.tareas;
      },
      error: (err) => {
        console.error('Error al obtener tareas:', err);
      },
    });
  }
  
  goBack(): void {
    this.router.navigate(['/grupos-clases']);
  }

  redirigirRevisarTarea(idTarea: number, idEntrega: number): void {
    this.router.navigate(['/revisar-tarea'], { queryParams: { idTarea, idEntrega } });
  }
  
  
}
