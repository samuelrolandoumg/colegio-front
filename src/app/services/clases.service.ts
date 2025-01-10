import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClasesService {
  private apiUrl = 'https://colegio-back-production.up.railway.app/api/clases';

  constructor(private http: HttpClient) {}

  crearClase(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear`, data);
  }
}
