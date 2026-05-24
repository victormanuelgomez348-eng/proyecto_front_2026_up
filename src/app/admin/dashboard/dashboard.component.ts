import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EstudianteService } from '../../services/estudiante.services';
import { DocenteService } from '../../services/docente.services';

interface DashboardWidget {
  label: string;
  value: string | number;
  detail: string;
  icon: string;
  accent: 'blue' | 'green' | 'violet' | 'orange';
  route: string;
}

interface SetupStep {
  title: string;
  description: string;
  icon: string;
  done: boolean;
  action: string;
  route: string;
}

interface ServiceRow {
  name: string;
  owner: string;
  status: 'En linea' | 'Pendiente' | 'Revision';
  progress: number;
  icon: string;
}

interface ActivityItem {
  title: string;
  description: string;
  time: string;
  icon: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalDocentes = 0;
  totalEstudiantes = 0;
  serviciosActivos = 6;
  reportesPendientes = 3;

  setupSteps: SetupStep[] = [
    {
      title: 'Perfil institucional',
      description: 'Verifica datos de contacto, sede y responsables administrativos.',
      icon: 'fa-solid fa-building-columns',
      done: true,
      action: 'Revisar usuarios',
      route: '/admin/usuarios'
    },
    {
      title: 'Equipo docente',
      description: 'Mantiene docentes activos, roles y asignaciones actualizadas.',
      icon: 'fa-solid fa-chalkboard-user',
      done: true,
      action: 'Gestionar docentes',
      route: '/admin/docentes'
    },
    {
      title: 'Reportes operativos',
      description: 'Consulta indicadores, exportaciones y actividad reciente.',
      icon: 'fa-solid fa-chart-line',
      done: false,
      action: 'Ver reportes',
      route: '/admin/reportes'
    },
    {
      title: 'Servicios vinculados',
      description: 'Supervisa servicios prestados y seguimiento comunitario.',
      icon: 'fa-solid fa-network-wired',
      done: false,
      action: 'Abrir servicios',
      route: '/servicios-prestados'
    }
  ];

  widgets: DashboardWidget[] = [];

  topServices: ServiceRow[] = [
    {
      name: 'Gestion academica',
      owner: 'Coordinacion administrativa',
      status: 'En linea',
      progress: 94,
      icon: 'fa-solid fa-graduation-cap'
    },
    {
      name: 'Seguimiento comunitario',
      owner: 'Proyeccion social',
      status: 'En linea',
      progress: 88,
      icon: 'fa-solid fa-people-group'
    },
    {
      name: 'Reportes e indicadores',
      owner: 'Analitica institucional',
      status: 'Revision',
      progress: 76,
      icon: 'fa-solid fa-chart-simple'
    },
    {
      name: 'Servicios prestados',
      owner: 'Equipo operativo',
      status: 'Pendiente',
      progress: 64,
      icon: 'fa-solid fa-handshake-angle'
    }
  ];

  recentLogins: ActivityItem[] = [
    {
      title: 'Administrador principal',
      description: 'Ingreso al panel de control',
      time: 'Hace 8 min',
      icon: 'fa-solid fa-user-shield'
    },
    {
      title: 'Modulo de docentes',
      description: 'Actualizacion de registro academico',
      time: 'Hace 34 min',
      icon: 'fa-solid fa-chalkboard-user'
    },
    {
      title: 'Modulo de reportes',
      description: 'Consulta de indicadores operativos',
      time: 'Hace 2 horas',
      icon: 'fa-solid fa-file-lines'
    }
  ];

  constructor(
    private router: Router,
    private estudianteService: EstudianteService,
    private docenteService: DocenteService
  ) {}

  ngOnInit(): void {
    this.actualizarWidgets();
    this.cargarEstadisticas();
  }

  cargarEstadisticas(): void {
    this.estudianteService.listarEstudiantes().subscribe({
      next: (data: any[]) => {
        this.totalEstudiantes = data ? data.length : 0;
        this.actualizarWidgets();
      },
      error: (err) => console.error('Error cargando estudiantes', err)
    });

    this.docenteService.listarDocentes().subscribe({
      next: (data: any[]) => {
        this.totalDocentes = data ? data.length : 0;
        this.actualizarWidgets();
      },
      error: (err) => console.error('Error cargando docentes', err)
    });
  }

  actualizarWidgets(): void {
    this.widgets = [
      {
        label: 'Estudiantes activos',
        value: this.totalEstudiantes,
        detail: 'Usuarios vinculados al sistema academico.',
        icon: 'fa-solid fa-user-graduate',
        accent: 'blue',
        route: '/admin/usuarios'
      },
      {
        label: 'Docentes activos',
        value: this.totalDocentes,
        detail: 'Personal docente disponible para asignacion.',
        icon: 'fa-solid fa-chalkboard-user',
        accent: 'green',
        route: '/admin/docentes'
      },
      {
        label: 'Servicios en linea',
        value: this.serviciosActivos,
        detail: 'Procesos operativos disponibles para consulta.',
        icon: 'fa-solid fa-signal',
        accent: 'violet',
        route: '/servicios-prestados'
      },
      {
        label: 'Reportes pendientes',
        value: this.reportesPendientes,
        detail: 'Informes que requieren revision administrativa.',
        icon: 'fa-solid fa-clipboard-list',
        accent: 'orange',
        route: '/admin/reportes'
      }
    ];
  }

  navegarACrearDocente(): void {
    this.router.navigate(['/admin/docentes'], { queryParams: { crear: 'true' } });
  }

  navegarACrearEstudiante(): void {
    this.router.navigate(['/admin/usuarios'], { queryParams: { crear: 'true' } });
  }

  navegarA(ruta: string): void {
    this.router.navigate([ruta]);
  }

  abrirReportes(): void {
    this.router.navigate(['/admin/reportes']);
  }

  cerrarSesion(): void {
    if (confirm('Seguro que deseas cerrar sesion?')) {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }
}
