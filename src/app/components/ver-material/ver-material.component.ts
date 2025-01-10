import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe'; // Asegúrate de usar la ruta correcta


@Component({
  selector: 'app-ver-material',
  templateUrl: './ver-material.component.html',
  styleUrls: ['./ver-material.component.css'],
  standalone: true, // Asegúrate de usar standalone si estás usando módulos independientes
  imports: [CommonModule,SafeUrlPipe], // Agrega CommonModule aquí
})
export class VerMaterialComponent implements OnInit {
  archivoUrl: string | null = null;
  archivoNombre: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.archivoUrl = params['archivoUrl'];
      this.archivoNombre = params['archivoNombre'];
    });
  }

  goBack(): void {
    this.router.navigate(['/tareas-asignadas']);
  }
}
