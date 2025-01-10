import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grupo } from '../models/grupo.model';


@Injectable({
  providedIn: 'root',
})
export class ProfesorService {
  private baseUrl = 'https://colegio-back-production.up.railway.app/api/profesor';
  private baseUrl1 = 'https://colegio-back-production.up.railway.app/api';


  constructor(private http: HttpClient) {}

  obtenerGruposClasesYtareas(idProfesor: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${idProfesor}/grupos-clases-tareas`);
  }

  obtenerGruposPorProfesor(idProfesor: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${idProfesor}/grupos`);
  }

  obtenerTareasPorClase(idGrupo: number, idClase: number): Observable<any> {
    if(!idGrupo || !idClase){
      throw new Error('Parámetros inválidos: idGrupo o idClase');
    }
    return this.http.get(`${this.baseUrl1}/grupos/${idGrupo}/clases/${idClase}/tareas-alumnos`);
  }

  obtenerTareaPorId(idTarea: number, idEntrega: number): Observable<any> {
    return this.http.get(`${this.baseUrl1}/tareas/${idTarea}/entregas/${idEntrega}`);
  }
  
 
  calificarTarea(idTarea: number, idEntrega: number, idAlumno: string, punteo: number): Observable<any> {
    return this.http.put(
      `${this.baseUrl1}/entregas/${idTarea}/${idEntrega}/${idAlumno}/${punteo}`,
      {}
    );
  }  

  obtenerPunteoActual(idTarea: number, idEntrega: number, idAlumno: string): Observable<any> {
    return this.http.get(`${this.baseUrl1}/entregas/${idTarea}/${idEntrega}/${idAlumno}`);
  }
  

  obtenerClasesPorProfesor(idProfesor: string): Observable<any> {
    return this.http.get(`${this.baseUrl1}/clases/consultar/${idProfesor}`);
  }

  obtenerGruposClasesAlumnos(idProfesor: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${idProfesor}`);
  }

  obtenerCalificaciones(idProfesor: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${idProfesor}/grupos-clases-alumnos-calificaciones`);
  }
}
