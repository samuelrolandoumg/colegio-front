import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EntregasService {
  private baseUrl = 'https://colegio-back-production.up.railway.app/api/entregas';

  constructor(private http: HttpClient) {}

  subirArchivo(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/subir`, formData);
  }
}
