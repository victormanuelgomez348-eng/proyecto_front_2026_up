import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// IMPORTANTE: Ajusta el nombre si tu archivo es 'servicioprestado.services.ts'
import { ServicioPrestadoService } from '../services/servicioprestado.services';

@Component({
  selector: 'app-servicioprestado',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './servicioprestado.component.html'
})
export class ServicioPrestadoComponent implements OnInit {
eliminar(arg0: any) {
throw new Error('Method not implemented.');
}
editar(_t41: any) {
throw new Error('Method not implemented.');
}
  form: FormGroup;
editandoId: any;
registros: any;

  constructor(
    private fb: FormBuilder,
    private services: ServicioPrestadoService
  ) {
    this.form = this.fb.group({
      servicio: ['', Validators.required],
      beneficiario: ['', Validators.required],
      documento: ['', Validators.required],
      municipio: ['', Validators.required],
      fecha: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  guardar(): void {
    if (this.form.valid) {
      this.services.crear(this.form.value).subscribe({
        next: (res: any) => {
          console.log('Guardado con éxito', res);
          this.form.reset();
        },
        error: (err: any) => {
          console.error('Error al guardar:', err);
        }
      });
    }
  }
}
