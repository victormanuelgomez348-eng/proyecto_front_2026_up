import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://api.tu-servidor.com/auth';

  // Propiedad para acceder al usuario desde cualquier componente
  private currentUser: any = null;

  constructor(private http: HttpClient) {
    // Recuperar sesión si recargan la página
    const savedUser = localStorage.getItem('user_session');
    if (savedUser) this.currentUser = JSON.parse(savedUser);
  }

  login(credentials: any): Observable<any> {
    // Simulación: En un caso real aquí iría tu llamada al backend
    return of({
      success: true,
      user: { nombre: 'Juan Pérez', facultad: 'Ingeniería' }
    }).pipe(
      tap(response => {
        if (response.success) {
          this.currentUser = response.user;
          localStorage.setItem('user_session', JSON.stringify(response.user));
        }
      })
    );
  }

  // Método clave para el saludo
  getUserName(): string {
    return this.currentUser ? this.currentUser.nombre : 'Estudiante';
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('user_session');
  }
}
