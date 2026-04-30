import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Gestion de Beneficiarios';

  @ViewChild('emailInput') emailInput!: ElementRef;

  onSubscribe(): void {
    const email = this.emailInput?.nativeElement?.value?.trim();

    if (email) {
      console.log('Suscripción con email:', email);
      alert('¡Gracias por suscribirte! Pronto te contactaremos.');
      this.emailInput.nativeElement.value = '';
    } else {
      alert('Por favor ingresa un correo válido.');
    }
  }
}
