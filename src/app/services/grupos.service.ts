// servicios/grupos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GruposService {
  private apiUrl = 'https://colegio-back-production.up.railway.app/api'; // Cambia esto si tienes una URL diferente

  constructor(private http: HttpClient) {}

  obtenerAlumnos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios/alumnos`);
  }

  crearGrupo(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/grupos/crear`, data);
  }
}
