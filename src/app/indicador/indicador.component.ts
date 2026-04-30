import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IndicadorService } from '../services/indicador.services';
import { Indicador } from '../models/indicador.model';

@Component({
  selector: 'app-indicador',
  templateUrl: './indicador.component.html',
  styleUrls: ['./indicador.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class IndicadorComponent implements OnInit {
  private indicadorService = inject(IndicadorService);

  public listaIndicadores: Indicador[] = [];
  public nuevoIndicador: Indicador = {
    nombre: '',
    etiqueta: '',
    descripcion: '',
    valor: 0,
    unidad: '',
    tipo: 'cantidad',
    meta: 0
  };
  public cargando = false;
  public error: string | null = null;
  public mostrarFormulario = false;

  ngOnInit(): void {
    this.cargarIndicadores();
  }

  /**
   * Cargar todos los indicadores desde el backend
   */
  cargarIndicadores(): void {
    this.cargando = true;
    this.error = null;
    this.indicadorService.getIndicadores().subscribe({
      next: (data) => {
        this.listaIndicadores = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar indicadores:', err);
        this.error = 'No se pudieron cargar los indicadores. Intenta de nuevo.';
        this.cargando = false;
      }
    });
  }

  /**
   * Cargar indicadores de impacto social
   */
  cargarIndicadoresImpacto(): void {
    this.cargando = true;
    this.error = null;
    this.indicadorService.getEstadisticasImpacto().subscribe({
      next: (data) => {
        this.listaIndicadores = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar indicadores de impacto:', err);
        this.error = 'No se pudieron cargar los indicadores de impacto.';
        this.cargando = false;
      }
    });
  }

  /**
   * Crear un nuevo indicador
   */
  crearIndicador(): void {
    // Validar campos requeridos
    if (!this.nuevoIndicador.nombre.trim() ||
        !this.nuevoIndicador.etiqueta.trim()) {
      alert('Por favor, completa los campos requeridos (Nombre y Etiqueta)');
      return;
    }

    this.cargando = true;
    this.error = null;

    this.indicadorService.crearIndicador(this.nuevoIndicador).subscribe({
      next: (indicadorCreado) => {
        this.listaIndicadores.push(indicadorCreado);
        this.resetForm();
        this.mostrarFormulario = false;
        this.cargando = false;
        alert('¡Indicador creado exitosamente!');
      },
      error: (err) => {
        console.error('Error al crear indicador:', err);
        this.error = 'Error al conectar con el servidor.';
        this.cargando = false;
        alert('Error: No se pudo crear el indicador');
      }
    });
  }

  /**
   * Actualizar un indicador existente
   */
  actualizarIndicador(indicador: Indicador): void {
    if (!indicador.id) {
      alert('Error: El indicador no tiene ID');
      return;
    }

    this.cargando = true;
    this.error = null;

    this.indicadorService.actualizarIndicador(indicador.id, indicador).subscribe({
      next: (indicadorActualizado) => {
        const index = this.listaIndicadores.findIndex(ind => ind.id === indicador.id);
        if (index !== -1) {
          this.listaIndicadores[index] = indicadorActualizado;
        }
        this.cargando = false;
        alert('¡Indicador actualizado exitosamente!');
      },
      error: (err) => {
        console.error('Error al actualizar indicador:', err);
        this.error = 'Error al actualizar el indicador.';
        this.cargando = false;
        alert('Error: No se pudo actualizar el indicador');
      }
    });
  }

  /**
   * Eliminar un indicador
   */
  eliminarIndicador(id?: number): void {
    if (!id) {
      alert('Error: No se puede eliminar un indicador sin ID');
      return;
    }

    if (confirm('¿Estás seguro de que deseas eliminar este indicador?')) {
      this.indicadorService.eliminarIndicador(id).subscribe({
        next: () => {
          this.listaIndicadores = this.listaIndicadores.filter(ind => ind.id !== id);
          alert('Indicador eliminado exitosamente');
        },
        error: (err) => {
          console.error('Error al eliminar indicador:', err);
          alert('Error al eliminar el indicador');
        }
      });
    }
  }

  /**
   * Alternar formulario
   */
  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) {
      this.resetForm();
    }
  }

  /**
   * Resetear formulario
   */
  resetForm(): void {
    this.nuevoIndicador = {
      nombre: '',
      etiqueta: '',
      descripcion: '',
      valor: 0,
      unidad: '',
      tipo: 'cantidad',
      meta: 0
    };
    this.error = null;
  }

  /**
   * Obtener color según el estado del indicador
   */
  getColorIndicador(indicador: Indicador): string {
    if (!indicador.meta || indicador.meta === 0) {
      return 'neutral';
    }
    const porcentaje = (indicador.valor / indicador.meta) * 100;
    if (porcentaje >= 90) return 'alto';
    if (porcentaje >= 60) return 'medio';
    return 'bajo';
  }
}
