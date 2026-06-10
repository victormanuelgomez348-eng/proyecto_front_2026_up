import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService, LoginCredentials } from '../../../user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // Inicializamos con los campos que espera el backend
  loginData: LoginCredentials = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  onLogin() {
    // 1. Validación básica antes de enviar
    if (!this.loginData.email || !this.loginData.password) {
      alert('Por favor, ingresa el correo y la contraseña.');
      return;
    }

    // 2. Llamada al servicio
    this.userService.login(this.loginData).subscribe({
      next: (userData: any) => {
        console.log("Login exitoso. Datos recibidos:", userData);

        // 3. Guardar información de sesión en el navegador
        localStorage.setItem('user_session', JSON.stringify(userData));
        localStorage.setItem('user_role', userData.role || 'estudiante');

        // 4. Redirección basada en el rol recibido del servidor
        const rol = (userData.role || '').toLowerCase().trim();

        switch (rol) {
          case 'admin':
            this.router.navigate(['/admin/dashboard']);
            break;
          case 'docente':
            this.router.navigate(['/docente']);
            break;
          case 'estudiante':
            this.router.navigate(['/servicios-prestados']);
            break;
          default:
            this.router.navigate(['/home']);
            break;
        }
      },
      error: (err) => {
        console.error("Error de autenticación:", err);
        // Si el backend devuelve 401, aquí es donde lo capturas
        alert('Credenciales incorrectas. Por favor, verifica tu correo y contraseña.');
      }
    });
  }
}
