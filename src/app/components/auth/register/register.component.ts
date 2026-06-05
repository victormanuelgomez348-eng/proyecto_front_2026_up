import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  // Este modelo debe ser idéntico a tu entidad Usuario.java
  usuario = {
    nombre: '',
    apellidos: '',
    tipoDocumento: '',
    numeroDocumento: '',
    email: '',
    confirmacionCorreo: '',
    password: '',
    confirmacionPassword: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  registrar() {
    // 1. Validaciones preventivas en Frontend
    if (this.usuario.email !== this.usuario.confirmacionCorreo) {
      alert('¡Error! Los correos electrónicos no coinciden.');
      return;
    }
    if (this.usuario.password !== this.usuario.confirmacionPassword) {
      alert('¡Error! Las contraseñas no coinciden.');
      return;
    }

    // 2. Log de depuración: Abre la consola del navegador (F12) para ver esto
    console.log('Enviando datos al servidor:', this.usuario);

    // 3. Petición POST
    // Si sigue dando 404, prueba quitando el /api del inicio o añadiendo el nombre de tu proyecto
    const url = 'http://localhost:8080/api/auth/registro';

    this.http.post(url, this.usuario).subscribe({
      next: (res: any) => {
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error de conexión:', err);
        // Si el estatus es 404, significa que Spring no encuentra el endpoint
        if (err.status === 404) {
          alert('Error 404: La ruta del servidor no existe. Verifica tu @RequestMapping en Java.');
        } else {
          alert('Error: ' + (err.error?.message || 'No se pudo conectar con el servidor.'));
        }
      }
    });
  }
}
