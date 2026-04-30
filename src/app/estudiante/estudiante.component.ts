import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstudianteService } from '../services/estudiante.services';
import { Estudiante } from '../models/estudiante.model';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EstudianteComponent implements OnInit {
  private estudianteService = inject(EstudianteService);
  public estudiantes: Estudiante[] = [];
  public nuevoEstudiante: Estudiante = {
    nombreCompleto: '',
    codigoEstudiantil: '',
    programaAcademico: '',
    horasParticipacion: 0,
    email: '',
    telefono: ''
  };
  public cargando = false;
  public error: string | null = null;

  ngOnInit(): void {
    this.cargarEstudiantes();
  }

  /**
   * Cargar todos los estudiantes desde el backend
   */
  cargarEstudiantes(): void {
    this.cargando = true;
    this.error = null;
    this.estudianteService.getEstudiantes().subscribe({
      next: (data) => {
        this.estudiantes = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar estudiantes:', err);
        this.error = 'No se pudieron cargar los estudiantes. Intenta de nuevo.';
        this.cargando = false;
      }
    });
  }

  /**
   * Registrar un nuevo estudiante
   */
  registrarEstudiante(): void {
    // Validar que los campos requeridos estén completos
    if (!this.nuevoEstudiante.nombreCompleto.trim() ||
        !this.nuevoEstudiante.codigoEstudiantil.trim() ||
        !this.nuevoEstudiante.programaAcademico.trim()) {
      alert('Por favor, completa los campos requeridos (Nombre, Código, Programa)');
      return;
    }

    this.cargando = true;
    this.error = null;

    this.estudianteService.registrarEstudiante(this.nuevoEstudiante).subscribe({
      next: (estudianteGuardado) => {
        this.estudiantes.push(estudianteGuardado);
        this.resetForm();
        this.cargando = false;
        alert('¡Estudiante registrado exitosamente!');
      },
      error: (err) => {
        console.error('Error al registrar estudiante:', err);
        this.error = 'Error al conectar con el servidor. Intenta de nuevo.';
        this.cargando = false;
        alert('Error: No se pudo registrar el estudiante');
      }
    });
  }

  /**
   * Eliminar un estudiante
   */
  eliminarEstudiante(id?: number): void {
    if (!id) {
      alert('Error: No se puede eliminar un estudiante sin ID');
      return;
    }

    if (confirm('¿Estás seguro de que deseas eliminar este estudiante?')) {
      this.estudianteService.eliminarEstudiante(id).subscribe({
        next: () => {
          this.estudiantes = this.estudiantes.filter(est => est.id !== id);
          alert('Estudiante eliminado exitosamente');
        },
        error: (err) => {
          console.error('Error al eliminar estudiante:', err);
          alert('Error al eliminar el estudiante');
        }
      });
    }
  }

  /**
   * Resetear el formulario
   */
  resetForm(): void {
    this.nuevoEstudiante = {
      nombreCompleto: '',
      codigoEstudiantil: '',
      programaAcademico: '',
      horasParticipacion: 0,
      email: '',
      telefono: ''
    };
  }
}
