import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../user.service'; // Asegúrate de que esta ruta sea la correcta en tu proyecto

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData = { user: '', pass: '' };

  constructor(private router: Router, private userService: UserService) {}

  onLogin(event: Event) {
    event.preventDefault();
    const email = this.loginData.user.trim().toLowerCase();
    const pass = this.loginData.pass.trim();

    if (!email || !pass) {
      alert('Por favor, ingresa correo y contraseña.');
      return;
    }

    this.userService.login({ email, pass }).subscribe({
      next: (userData: any) => {
        // 1. Depuración: Vemos qué trae el servidor
        console.log("Respuesta del servidor:", userData);

        // 2. Normalizamos el rol (buscamos 'role' o 'rol' y convertimos a minúsculas)
        const rol = (userData.role || userData.rol || '').toLowerCase().trim();

        // 3. Redirección independiente según el rol
        switch (rol) {
          case 'administrador':
          case 'admin':
            this.router.navigate(['/admin/dashboard']);
            break;

          case 'docente':
            // Ahora docente va a su vista propia configurada en app.routes.ts
            this.router.navigate(['/docente']);
            break;

          case 'estudiante':
            // Estudiante va a su vista propia
            this.router.navigate(['/servicios-prestados']);
            break;

          default:
            alert('Error: El usuario entró, pero el sistema no reconoce el rol: "' + rol + '"');
            console.error('Rol recibido no mapeado:', rol);
            break;
        }
      },
      error: (err) => {
        console.error("Error en login:", err);
        alert('Credenciales incorrectas o error de servidor. Verifica en la consola (F12).');
      }
    });
  }
}
