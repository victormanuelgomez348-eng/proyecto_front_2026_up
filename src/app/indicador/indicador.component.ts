import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface IndicadorVisual {
  nombre: string;
  valor: number;
  meta: number;
  unidad: string;
  color: string;
  icono: string;
  area: string;
}

interface Municipio {
  nombre: string;
  top: number;
  left: number;
  beneficiarios: number;
  servicio: string;
  color: string;
}

type VistaIndicador = 'resumen' | 'cobertura' | 'facultades';

@Component({
  selector: 'app-indicador',
  templateUrl: './indicador.component.html',
  styleUrls: ['./indicador.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class IndicadorComponent {
  public vistaActiva: VistaIndicador = 'resumen';
  public areaSeleccionada = 'Todas';
  public municipioSeleccionado: Municipio | null = null;

  public indicadores: IndicadorVisual[] = [
    {
      nombre: 'Personas beneficiadas',
      valor: 1250,
      meta: 1600,
      unidad: 'personas',
      color: '#0f5ea8',
      icono: 'fa-people-group',
      area: 'Salud'
    },
    {
      nombre: 'Servicios prestados',
      valor: 3200,
      meta: 4000,
      unidad: 'atenciones',
      color: '#148a72',
      icono: 'fa-hand-holding-heart',
      area: 'Veterinaria'
    },
    {
      nombre: 'Jornadas realizadas',
      valor: 28,
      meta: 36,
      unidad: 'jornadas',
      color: '#b86b00',
      icono: 'fa-calendar-check',
      area: 'Ingeniería'
    },
    {
      nombre: 'Municipios impactados',
      valor: 14,
      meta: 20,
      unidad: 'municipios',
      color: '#c5162e',
      icono: 'fa-location-dot',
      area: 'Jurídica'
    }
  ];

  public municipios: Municipio[] = [
    { nombre: 'Medellín', top: 34, left: 45, beneficiarios: 450, servicio: 'Salud', color: '#0f5ea8' },
    { nombre: 'Bello', top: 20, left: 50, beneficiarios: 280, servicio: 'Veterinaria', color: '#148a72' },
    { nombre: 'Itagüí', top: 52, left: 42, beneficiarios: 200, servicio: 'Jurídica', color: '#6d3bbf' },
    { nombre: 'Envigado', top: 58, left: 57, beneficiarios: 180, servicio: 'Empresarial', color: '#b86b00' },
    { nombre: 'Sabaneta', top: 72, left: 51, beneficiarios: 140, servicio: 'Salud', color: '#0f5ea8' }
  ];

  public areas = [
    { nombre: 'Salud', valor: 82, color: '#0f5ea8' },
    { nombre: 'Jurídica', valor: 68, color: '#6d3bbf' },
    { nombre: 'Veterinaria', valor: 91, color: '#148a72' },
    { nombre: 'Ingeniería', valor: 74, color: '#b86b00' },
    { nombre: 'Empresarial', valor: 61, color: '#c5162e' }
  ];

  get opcionesArea(): string[] {
    return ['Todas', ...this.areas.map((area) => area.nombre)];
  }

  get indicadoresFiltrados(): IndicadorVisual[] {
    if (this.areaSeleccionada === 'Todas') {
      return this.indicadores;
    }

    return this.indicadores.filter((indicador) => indicador.area === this.areaSeleccionada);
  }

  get municipiosFiltrados(): Municipio[] {
    if (this.areaSeleccionada === 'Todas') {
      return this.municipios;
    }

    return this.municipios.filter((municipio) => municipio.servicio === this.areaSeleccionada);
  }

  get totalBeneficiarios(): number {
    return this.indicadores[0].valor;
  }

  get promedioAvance(): number {
    const total = this.indicadores.reduce((sum, indicador) => sum + this.porcentaje(indicador), 0);
    return Math.round(total / this.indicadores.length);
  }

  get areaDestacada(): string {
    return [...this.areas].sort((a, b) => b.valor - a.valor)[0].nombre;
  }

  porcentaje(indicador: IndicadorVisual): number {
    if (!indicador.meta) return 0;
    return Math.min(Math.round((indicador.valor / indicador.meta) * 100), 100);
  }

  cambiarVista(vista: VistaIndicador): void {
    this.vistaActiva = vista;
  }

  seleccionarArea(area: string): void {
    this.areaSeleccionada = area;
    this.municipioSeleccionado = null;
  }

  seleccionarMunicipio(municipio: Municipio): void {
    this.municipioSeleccionado = municipio;
  }

  limpiarFiltros(): void {
    this.areaSeleccionada = 'Todas';
    this.vistaActiva = 'resumen';
    this.municipioSeleccionado = null;
  }
}
