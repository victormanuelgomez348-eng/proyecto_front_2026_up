import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServicioPrestadoService } from '../services/servicioprestado.services';

@Component({
  selector: 'app-servicioprestado',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './servicioprestado.component.html',
  styleUrls: ['./servicioprestado.component.scss']
})
export class ServicioPrestadoComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isChatOpen = false;
  respuestaIA = 'Hola, soy el asistente Uniremington. ¿Qué deseas consultar?';

  facultades = ['Ingeniería', 'Ciencias Administrativas', 'Ciencias Jurídicas', 'Ciencias Básicas', 'Ciencias Sociales', 'Ciencias de la Salud', 'Educación'];

  segundos = 0;
  intervalo: any;

  constructor(private fb: FormBuilder, private services: ServicioPrestadoService) {
    this.form = this.fb.group({
      facultad: ['', Validators.required],
      servicio: ['', Validators.required],
      beneficiario: ['', Validators.required],
      documento: ['', Validators.required],
      departamento: ['', Validators.required],
      municipio: ['', Validators.required],
      vereda: ['', Validators.required],
      barrio: ['', Validators.required],
      contacto: ['', Validators.required],
      fecha: ['', Validators.required],
      tiempo_atencion: ['00:00']
    });
  }

  ngOnInit(): void {}

  consultarIA(pregunta: string) {
    const p = pregunta.toLowerCase();
    if(p.includes('facultad')) this.respuestaIA = 'Contamos con 7 facultades: Ingeniería, Admin, Jurídicas, Básicas, Sociales, Salud y Educación.';
    else if(p.includes('tiempo')) this.respuestaIA = 'Presiona "Iniciar" para medir tu tiempo de atención.';
    else this.respuestaIA = 'Contacta a soporte técnico de Uniremington para consultas avanzadas.';
  }

  iniciarCronometro() { this.intervalo = setInterval(() => this.segundos++, 1000); }
  finalizarCronometro() {
    clearInterval(this.intervalo);
    const m = Math.floor(this.segundos / 60);
    const s = this.segundos % 60;
    this.form.patchValue({ tiempo_atencion: `${m}:${s}` });
    this.segundos = 0;
  }

  guardar() {
    if (this.form.valid) {
      this.services.crear(this.form.value).subscribe(() => { alert('Guardado'); this.form.reset(); });
    }
  }

  ngOnDestroy() { clearInterval(this.intervalo); }
}
