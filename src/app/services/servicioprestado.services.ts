import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // ¡Esto es indispensable para que no falle la inyección!
})
export class ServicioPrestadoService {
  private API_URL = 'http://localhost:8080/api/servicios';

  constructor(private http: HttpClient) { }

  crear(datos: any): Observable<any> {
    return this.http.post(this.API_URL, datos);
  }
}
