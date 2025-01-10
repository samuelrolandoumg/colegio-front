import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TareasService {
  private apiUrl = 'https://colegio-back-production.up.railway.app/api/tareas';
  private baseUrl1 = 'https://colegio-back-production.up.railway.app/api';


  constructor(private http: HttpClient) {}

  obtenerTareasAsignadas(id_usuario: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuario/${id_usuario}`);
  }

  entregarTarea(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/entregar`, data);
  }

  obtenerGruposYClases(idUsuario: string): Observable<any> {
    return this.http.get(`${this.baseUrl1}/notas/${idUsuario}`);
  }
  
  obtenerNotas(idGrupo: number, idClase: number, idUsuario: string): Observable<any> {
    return this.http.get(`${this.baseUrl1}/notas/${idGrupo}/${idClase}/${idUsuario}`);
  }

  crearTarea(tarea: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear`, tarea);
  }

  agregarAlumnosAGrupo(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl1}/grupos/agregar-alumnos`, data);
  }
}
