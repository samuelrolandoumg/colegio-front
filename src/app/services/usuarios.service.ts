import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private apiUrl = 'https://colegio-back-production.up.railway.app/api/usuarios';

  constructor(private http: HttpClient) {}

  crearUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear`, usuario);
  }

  obtenerAlumnos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/alumnos`);
  }

  obtenerProfesores(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profesores`);
  }

  obtenerUltimoId(prefijo: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${prefijo}`);
  }
}
