import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BeneficiarioService } from '../services/beneficiario.services';
import { Beneficiario } from '../models/beneficiario.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-beneficiario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './beneficiario.component.html',
  styleUrls: ['./beneficiario.component.css'],
})
export class BeneficiarioComponent implements OnInit {
  readonly generos = ['Masculino', 'Femenino', 'Otro'];
  readonly tiposPoblacion = ['Emprendedor', 'Empresario', 'Comunidad', 'Productor'];
  beneficiarios: Beneficiario[] = [];
  cargando = false;
  error = '';
  mensaje: string = '';

  editandoId: number | null = null;

  private readonly fb = inject(FormBuilder);
  private readonly beneficiarioService = inject(BeneficiarioService);

  readonly form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    documento: ['', Validators.required],
    telefono: ['', Validators.required],
    edad: [null as number | null],
    genero: ['', Validators.required],
    municipio: ['', Validators.required],
    barrio: ['', Validators.required],
    poblacion: ['', Validators.required],
    servicio: ['', Validators.required]
  });
  readonly filtroDocumento = this.fb.nonNullable.control('');

  ngOnInit(): void {
    this.cargarBeneficiarios();
  }

  cargarBeneficiarios(): void {
    this.cargando = true;
    this.error = '';

    this.beneficiarioService.listar().subscribe({
      next: (data) => {
        this.beneficiarios = data;
        this.cargando = false;
      },
      error: (error: HttpErrorResponse) => {
        this.error = this.obtenerMensajeError(error, 'No se pudo listar beneficiarios');
        this.cargando = false;
      }
    });
  }

  buscarPorDocumento(): void {
    const documento = this.filtroDocumento.value.trim();
    if (!documento) {
      this.cargarBeneficiarios();
      return;
    }

    this.cargando = true;
    this.error = '';
    this.mensaje = '';

    this.beneficiarioService.buscarPorDocumento(documento).subscribe({
      next: (beneficiario) => {
        this.beneficiarios = [beneficiario];
        this.cargando = false;
      },
      error: (err: HttpErrorResponse) => {
        this.error = this.obtenerMensajeError(err, 'No se encontró beneficiario con ese documento');
        this.beneficiarios = [];
        this.cargando = false;
      }
    });
  }

  limpiarBusqueda(): void {
    this.filtroDocumento.setValue('');
    this.cargarBeneficiarios();
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.error = '';
    this.mensaje = '';
    const payload: Beneficiario = this.form.getRawValue();

    if (this.editandoId !== null) {
      this.beneficiarioService.actualizar(this.editandoId, payload).subscribe({
        next: () => {
          this.mensaje = 'Beneficiario actualizado correctamente';
          this.cancelarEdicion();
          this.cargarBeneficiarios();
        },
        error: (err: HttpErrorResponse) => {
          this.error = this.obtenerMensajeError(err, 'No se pudo actualizar beneficiario');
        }
      });
      return;
    }

    this.beneficiarioService.crear(payload).subscribe({
      next: () => {
        this.mensaje = 'Beneficiario creado correctamente';
        this.form.reset({
          nombre: '',
          correo: '',
          documento: '',
          telefono: '',
          edad: null,
          genero: '',
          municipio: '',
          barrio: '',
          poblacion: '',
          servicio: '',
        });
        this.cargarBeneficiarios();
      },
      error: (err: HttpErrorResponse) => {
        this.error = this.obtenerMensajeError(err, 'No se pudo crear beneficiario');
      }
    });
  }

  iniciarEdicion(beneficiario: Beneficiario): void {
    this.editandoId = beneficiario.id ?? null;
    this.form.patchValue({
      nombre: beneficiario.nombre,
      correo: beneficiario.correo,
      documento: beneficiario.documento,
      telefono: beneficiario.telefono,
      edad: beneficiario.edad,
      genero: beneficiario.genero,
      municipio: beneficiario.municipio,
      barrio: beneficiario.barrio,
      poblacion: beneficiario.poblacion,
      servicio: beneficiario.servicio,
    });
  }

  cancelarEdicion(): void {
    this.editandoId = null;
    this.form.reset({
      nombre: '',
      correo: '',
      documento: '',
      telefono: '',
      edad: null,
      genero: '',
      municipio: '',
      barrio: '',
      poblacion: '',
      servicio: '',
    });
  }

  eliminar(id: number | undefined): void {
    if (id === undefined) {
      return;
    }

    const confirmar = globalThis.confirm('¿Seguro que deseas eliminar este beneficiario?');
    if (!confirmar) {
      return;
    }

    this.error = '';
    this.mensaje = '';

    this.beneficiarioService.eliminar(id).subscribe({
      next: () => {
        this.mensaje = 'Beneficiario eliminado correctamente';
        this.cargarBeneficiarios();
      },
      error: (err: HttpErrorResponse) => {
        this.error = this.obtenerMensajeError(err, 'No se pudo eliminar beneficiario');
      }
    });
  }

  private obtenerMensajeError(err: HttpErrorResponse, fallback: string): string {
    return err.error?.message || fallback;
  }
}