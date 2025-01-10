import { importProvidersFrom } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { provideHttpClient,withFetch } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EntregarTareaComponent } from './components/entregar-tarea/entregar-tarea.component';
import { TareasAsignadasComponent } from './components/tareas-asignadas/tareas-asignadas.component';
import { GruposClasesComponent } from './components/grupos-clases/grupos-clases.component';
import { TareasComponent } from './components/tareas/tareas.component';
import { RevisarTareaComponent } from './components/revisar-tarea/revisar-tarea.component';
import { GruposClasesAlumnoComponent } from './components/grupos-clases-alumno/grupos-clases-alumno.component';
import { VerNotasComponent } from './components/ver-notas/ver-notas.component';
import { CrearTareaComponent } from './components/crear-tarea/crear-tarea.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { CrearGrupoComponent } from './components/crear-grupo/crear-grupo.component';
import { AgregarAlumnoGrupoComponent } from './components/agregar-alumno-grupo/agregar-alumno-grupo.component';
import { ReactiveFormsModule } from '@angular/forms'; // IMPORTA FormsModule y ReactiveFormsModule
import { ListarProfesoresComponent } from './components/listar-profesores/listar-profesores.component';
import { CrearClaseComponent } from './components/crear-clase/crear-clase.component';
import { ListaAlumnosComponent } from './components/lista-alumnos/lista-alumnos.component';
import { VerCalificacionesComponent } from './components/ver-calificaciones/ver-calificaciones.component';
import { VerMaterialComponent } from './components/ver-material/ver-material.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'entregar-tarea', component: EntregarTareaComponent },
  { path: 'tareas-asignadas', component: TareasAsignadasComponent },
  { path: 'grupos-clases', component: GruposClasesComponent },
  { path: 'tareas', component: TareasComponent },
  { path: 'revisar-tarea', component: RevisarTareaComponent },
  { path: 'grupos-clases-alumno', component: GruposClasesAlumnoComponent }, 
  { path: 'ver-notas', component: VerNotasComponent }, 
  { path: 'crear-tarea', component: CrearTareaComponent },
  { path: 'crear-usuario', component: CrearUsuarioComponent },
  { path: 'crear-grupo', component: CrearGrupoComponent },
  { path: 'agregar-alumno-grupo', component: AgregarAlumnoGrupoComponent },
  { path: 'listar-profesores', component: ListarProfesoresComponent },
  { path: 'crear-clase', component: CrearClaseComponent },
  { path: 'lista-alumnos', component: ListaAlumnosComponent },
  { path: 'ver-calificaciones-alumnos', component: VerCalificacionesComponent },
  { path: 'ver-material', component: VerMaterialComponent },
];

export const appConfig = {
  providers: [
    provideRouter(routes),               // Proveedor para las rutas
    provideHttpClient(withFetch()),                 // Proveedor para HttpClient
    importProvidersFrom(FormsModule,ReactiveFormsModule),    // Importar FormsModule globalmente
    { provide: LocationStrategy, useClass: HashLocationStrategy }, // Configuración de hash
  ],
};
