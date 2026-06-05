import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-beneficiario-vista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './beneficiario-vista.component.html',
  styleUrls: ['./beneficiario-vista.component.scss']
})
export class BeneficiarioVistaComponent implements OnInit {
  usuarioLogueado: any;

  constructor(private router: Router) {}

  ngOnInit() {
    const data = localStorage.getItem('usuario');
    if (data) {
      this.usuarioLogueado = JSON.parse(data);
    } else {
      this.router.navigate(['/login']); // Si no hay sesión, al login
    }
  }

  logout() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}
