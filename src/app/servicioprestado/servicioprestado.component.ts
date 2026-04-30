import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicioPrestadoService } from '../services/servicioprestado.services';
import { ServicioPrestado } from '../models/servicioprestado.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-servicioprestado',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './servicioprestado.component.html',
  styleUrls: ['./servicioprestado.component.css'],
})
export class ServicioPrestadoComponent implements OnInit {
  readonly estados = ['Completado', 'En progreso', 'Pendiente', 'Cancelado'];
  servicios: ServicioPrestado[] = [];
  cargando = false;
  error = '';
  mensaje: string = '';

  editandoId: number | null = null;

  private readonly fb = inject(FormBuilder);
  private readonly servicioPrestadoService = inject(ServicioPrestadoService);

  readonly form = this.fb.nonNullable.group({
    idBeneficiario: [0, [Validators.required, Validators.min(1)]],
    descripcion: ['', Validators.required],
    fecha: ['', Validators.required],
    estado: ['', Validators.required],
    observaciones: ['']
  });
  readonly filtroId = this.fb.nonNullable.control('');

  ngOnInit(): void {
    this.cargarServicios();
  }

  cargarServicios(): void {
    this.cargando = true;
    this.error = '';
    this.servicioPrestadoService.listarTodos().subscribe({
      next: (data) => {
        this.servicios = data;
        this.cargando = false;
      },
      error: (err: HttpErrorResponse) => {
        this.error = 'Error al cargar los servicios: ' + (err.error?.message || err.statusText);
        this.cargando = false;
      }
    });
  }

  guardar(): void {
    if (this.form.invalid) {
      this.error = 'Por favor completa todos los campos requeridos';
      return;
    }

    const servicio: ServicioPrestado = this.form.getRawValue();

    if (this.editandoId !== null) {
      servicio.id = this.editandoId;
      this.servicioPrestadoService.actualizar(this.editandoId, servicio).subscribe({
        next: () => {
          this.mensaje = 'Servicio actualizado exitosamente';
          this.cargarServicios();
          this.form.reset();
          this.editandoId = null;
        },
        error: (err: HttpErrorResponse) => {
          this.error = 'Error al actualizar el servicio: ' + (err.error?.message || err.statusText);
        }
      });
    } else {
      this.servicioPrestadoService.crear(servicio).subscribe({
        next: () => {
          this.mensaje = 'Servicio creado exitosamente';
          this.cargarServicios();
          this.form.reset();
        },
        error: (err: HttpErrorResponse) => {
          this.error = 'Error al crear el servicio: ' + (err.error?.message || err.statusText);
        }
      });
    }
  }

  editar(servicio: ServicioPrestado): void {
    if (servicio.id) {
      this.editandoId = servicio.id;
      this.form.patchValue(servicio);
    }
  }

  eliminar(id: number | undefined): void {
    if (id && confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
      this.servicioPrestadoService.eliminar(id).subscribe({
        next: () => {
          this.mensaje = 'Servicio eliminado exitosamente';
          this.cargarServicios();
        },
        error: (err: HttpErrorResponse) => {
          this.error = 'Error al eliminar el servicio: ' + (err.error?.message || err.statusText);
        }
      });
    }
  }

  cancelarEdicion(): void {
    this.editandoId = null;
    this.form.reset();
    this.error = '';
  }

  buscarPorId(): void {
    const id = this.filtroId.value;
    if (id) {
      const idNum = parseInt(id, 10);
      this.cargando = true;
      this.servicioPrestadoService.listarPorBeneficiario(idNum).subscribe({
        next: (data) => {
          this.servicios = data;
          this.cargando = false;
        },
        error: (err: HttpErrorResponse) => {
          this.error = 'Error en la búsqueda: ' + (err.error?.message || err.statusText);
          this.cargando = false;
        }
      });
    }
  }

  limpiarBusqueda(): void {
    this.filtroId.reset();
    this.cargarServicios();
  }

  getEstadoClass(estado: string | undefined): string {
    if (!estado) return '';
    const estadoMap: { [key: string]: string } = {
      'Completado': 'completado',
      'En progreso': 'enProgreso',
      'Pendiente': 'pendiente',
      'Cancelado': 'cancelado'
    };
    return estadoMap[estado] || estado.toLowerCase();
  }
}