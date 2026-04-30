import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private fb = inject(FormBuilder);

  // Formularios Reactivos
  beneficiarioForm!: FormGroup;
  estudianteForm!: FormGroup;

  // Estadísticas del Dashboard (Dinámicas)
  totalBeneficiarios = 1250;
  totalEstudiantes = 450;
  totalServicios = 3200;
  totalSeguimientos = 890;

  // Estado de mensajes
  successMessage = '';

  // Datos de prueba iniciales
  beneficiarios: any[] = [
    { documento: '102030', nombre: 'Juan', apellido: 'Pérez', municipio: 'Medellín', servicio: 'Odontología' },
    { documento: '405060', nombre: 'María', apellido: 'García', municipio: 'Bello', servicio: 'Veterinaria' }
  ];

  servicios: any[] = [
    { beneficiario: 'Juan Pérez', tipo: 'Consulta General', facultad: 'Medicina', resultado: 'Favorable', estado: 'Completado' },
    { beneficiario: 'María García', tipo: 'Vacunación Canina', facultad: 'Veterinaria', resultado: 'Pendiente refuerzo', estado: 'Pendiente' }
  ];

  estudiantes: any[] = [
    { codigo: 'EST001', nombre: 'Andrés Felipe', programa: 'Ingeniería de Sistemas', horas: 40 },
    { codigo: 'EST002', nombre: 'Camila Torres', programa: 'Derecho', horas: 32 }
  ];

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.beneficiarioForm = this.fb.group({
      documento: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(0), Validators.max(120)]],
      genero: ['', Validators.required],
      municipio: ['', Validators.required],
      poblacion: ['General'],
      servicio: ['', Validators.required]
    });

    this.estudianteForm = this.fb.group({
      nombre: ['', Validators.required],
      codigo: ['', Validators.required],
      programa: ['', Validators.required],
      horas: ['', [Validators.required, Validators.min(1)]]
    });
  }

  guardarBeneficiario(): void {
    if (this.beneficiarioForm.valid) {
      const data = this.beneficiarioForm.value;

      // 1. Agregar a la lista de beneficiarios
      this.beneficiarios.unshift({ ...data });

      // 2. Simular creación de servicio automático basado en el registro
      this.servicios.unshift({
        beneficiario: `${data.nombre} ${data.apellido}`,
        tipo: data.servicio,
        facultad: 'Por asignar',
        resultado: 'En proceso',
        estado: 'Pendiente'
      });

      // 3. Actualizar contadores
      this.totalBeneficiarios++;
      this.totalServicios++;

      this.showSuccess('¡Registro y servicio creados correctamente!');
      this.beneficiarioForm.reset({ genero: '', poblacion: 'General' });
    } else {
      this.markFormGroupTouched(this.beneficiarioForm);
    }
  }

  guardarEstudiante(): void {
    if (this.estudianteForm.valid) {
      const nuevo = this.estudianteForm.value;
      this.estudiantes.unshift({...nuevo});
      this.totalEstudiantes++;
      this.showSuccess('¡Horas de estudiante cargadas al sistema!');
      this.estudianteForm.reset({ programa: '' });
    }
  }

  // Helper para mostrar errores visuales si intentan guardar vacío
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  private showSuccess(msg: string): void {
    this.successMessage = msg;
    setTimeout(() => this.successMessage = '', 3500);
  }

  readonly currentYear = new Date().getFullYear();
}
