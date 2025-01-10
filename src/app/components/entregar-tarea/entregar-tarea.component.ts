import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { EntregasService } from '../../services/entregas.service';

@Component({
  selector: 'app-entregar-tarea',
  templateUrl: './entregar-tarea.component.html',
  styleUrls: ['./entregar-tarea.component.css'],
})
export class EntregarTareaComponent implements OnInit {
  selectedFile!: File;
  id_tarea!: number; // Recibido desde la ruta
  id_alumno: string = ''; // ID del alumno obtenido del servicio AuthService
  usuario: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private entregasService: EntregasService
  ) {}

  ngOnInit(): void {
    // Obtener el id_tarea desde la ruta
    this.route.queryParams.subscribe((params) => {
      this.id_tarea = +params['id_tarea'] || 0;
      console.log('ID de la tarea:', this.id_tarea);
    });

    this.authService.getUser().subscribe((user) => {
      if (user) {
        this.usuario = user;
        console.log('Usuario cargado:', this.usuario);
      }
    });
  }

  logout() {
    this.authService.clearUser();
    alert('Sesión cerrada correctamente');
    this.router.navigate(['/login']);
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    console.log('Archivo seleccionado:', this.selectedFile);
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goBack(): void {
    this.router.navigate(['/tareas-asignadas']);
  }

  entregarTarea(): void {
    if (!this.selectedFile) {
      alert('Selecciona un archivo antes de enviar.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('id_tarea', this.id_tarea.toString());
    formData.append('id_alumno', this.usuario.id_usuario);

    this.entregasService.subirArchivo(formData).subscribe({
      next: (response: any) => {
        console.log('Respuesta del servidor:', response);
        alert('Archivo subido exitosamente.');
        this.router.navigate(['/tareas-asignadas']);
      },
      error: (err: any) => {
        console.error('Error en la subida:', err);
        alert(
          `Error al subir archivo: ${
            err.error?.message || 'Ocurrió un error desconocido.'
          }`
        );
      },
    });
  }
}
