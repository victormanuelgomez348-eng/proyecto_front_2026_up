import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  // Título de la sección principal
  public title: string = 'Uniremington Al Parque';

  // Facultades desde AppComponent
  public selectedFaculty: any = null;
  public serviceFaculties = [
    {
      id: 1,
      nombre: 'Bienestar animal',
      icono: 'fa-solid fa-paw',
      color: '#27ae60',
      descripcionCorta: 'Atencion basica veterinaria y cuidado preventivo para animales de compania y equinos.',
      descripcionLarga: 'El area de bienestar animal ofrece servicios orientados al cuidado, prevencion y acompanamiento veterinario comunitario.',
      carreras: ['Odontologia animal', 'Desparasitacion y vitaminizacion equina', 'Corte de unas de perros y gatos', 'Consulta basica veterinaria'],
      pilares: ['Cuidado preventivo', 'Bienestar comunitario', 'Atencion veterinaria', 'Tenencia responsable']
    },
    {
      id: 2,
      nombre: 'Brigadas juridicas',
      icono: 'fa-solid fa-scale-balanced',
      color: '#1a3a52',
      descripcionCorta: 'Consultorio y asesoria juridica para orientar a la comunidad en sus necesidades legales.',
      descripcionLarga: 'Las brigadas juridicas acercan el consultorio y la asesoria legal a la comunidad, con enfoque social y pedagogico.',
      carreras: ['Consultorio juridico', 'Asesoria juridica'],
      pilares: ['Acceso a la justicia', 'Orientacion ciudadana', 'Derechos y deberes', 'Acompanamiento legal']
    },
    {
      id: 3,
      nombre: 'Asesorias empresariales',
      icono: 'fa-solid fa-briefcase',
      color: '#f39c12',
      descripcionCorta: 'Acompanamiento para fortalecer ideas de negocio, gestion y crecimiento empresarial.',
      descripcionLarga: 'Las asesorias empresariales apoyan a emprendedores, unidades productivas y organizaciones en procesos de mejoramiento y toma de decisiones.',
      carreras: ['Diagnostico empresarial', 'Orientacion administrativa', 'Fortalecimiento comercial', 'Gestion de emprendimientos'],
      pilares: ['Emprendimiento', 'Gestion estrategica', 'Productividad', 'Crecimiento local']
    },
    {
      id: 4,
      nombre: 'Diseno de imagen corporativa',
      icono: 'fa-solid fa-pen-nib',
      color: '#e91e63',
      descripcionCorta: 'Apoyo creativo para construir identidad visual y comunicacion de marcas o emprendimientos.',
      descripcionLarga: 'El diseno de imagen corporativa acompana la creacion o mejora de piezas visuales que fortalecen la presencia de proyectos comunitarios y empresariales.',
      carreras: ['Identidad visual', 'Imagen de marca', 'Piezas graficas', 'Comunicacion visual'],
      pilares: ['Creatividad', 'Identidad de marca', 'Comunicacion clara', 'Proyeccion visual']
    },
    {
      id: 5,
      nombre: 'Servicios de salud',
      icono: 'fa-solid fa-hand-holding-medical',
      color: '#e74c3c',
      descripcionCorta: 'Atencion en salud con enfoque preventivo, familiar y comunitario.',
      descripcionLarga: 'Los servicios de salud acercan orientacion y atencion basica a la comunidad desde diferentes especialidades.',
      carreras: ['Nutricion', 'Enfermeria', 'Medicina familiar y comunitaria', 'Ginecobstetricia', 'Psiquiatria', 'Pediatria'],
      pilares: ['Prevencion', 'Salud integral', 'Atencion comunitaria', 'Bienestar familiar']
    },
    {
      id: 6,
      nombre: 'Consultorio contable',
      icono: 'fa-solid fa-calculator',
      color: '#2980b9',
      descripcionCorta: 'Orientacion contable para personas, emprendimientos y pequenas unidades productivas.',
      descripcionLarga: 'El consultorio contable brinda acompanamiento en temas basicos de organizacion financiera, obligaciones y gestion contable.',
      carreras: ['Orientacion contable', 'Revision financiera basica', 'Apoyo tributario inicial', 'Organizacion de registros'],
      pilares: ['Claridad financiera', 'Responsabilidad contable', 'Educacion tributaria', 'Gestion organizada']
    },
    {
      id: 7,
      nombre: 'Ingenieria y medio ambiente',
      icono: 'fa-solid fa-seedling',
      color: '#16a085',
      descripcionCorta: 'Asesorias tecnicas para soluciones ambientales, sostenibles y comunitarias.',
      descripcionLarga: 'Las asesorias en ingenieria y medio ambiente promueven soluciones practicas para el cuidado del entorno y el mejoramiento territorial.',
      carreras: ['Asesoria ambiental', 'Soluciones sostenibles', 'Gestion de recursos', 'Orientacion tecnica comunitaria'],
      pilares: ['Sostenibilidad', 'Innovacion aplicada', 'Cuidado ambiental', 'Impacto territorial']
    }
  ];

  public faculties = [
    {
      id: 1, nombre: 'Ciencias de la Salud', icono: 'fa-solid fa-hand-holding-medical', color: '#e74c3c',
      descripcionCorta: 'Líderes en formación humana y técnica para el bienestar integral.',
      descripcionLarga: 'La Facultad de Ciencias de la Salud se enfoca en la formación de profesionales éticos, capaces de responder a los retos del sistema de salud actual con responsabilidad social.',
      carreras: ['Enfermería', 'Nutrición y Dietética', 'Medicina Veterinaria'],
      pilares: ['Salud integral', 'Responsabilidad social', 'Innovación clínica', 'Humanismo']
    },
    {
      id: 2, nombre: 'Ingeniería', icono: 'fa-solid fa-laptop-code', color: '#2980b9',
      descripcionCorta: 'Innovación tecnológica y soluciones sostenibles para los retos del futuro.',
      descripcionLarga: 'Nuestros programas de ingeniería integran la teoría con la práctica aplicada, preparando líderes de proyectos tecnológicos.',
      carreras: ['Ingeniería de Sistemas', 'Ingeniería Industrial', 'Ingeniería Civil'],
      pilares: ['Innovación tecnológica', 'Sostenibilidad', 'Resolución de problemas', 'Liderazgo técnico']
    },
    {
      id: 3, nombre: 'Ciencias Jurídicas y Políticas', icono: 'fa-solid fa-scale-balanced', color: '#1a3a52',
      descripcionCorta: 'Excelencia en la defensa de la justicia y los valores democráticos.',
      descripcionLarga: 'Formamos abogados y líderes comprometidos con la equidad, derechos humanos y resolución de conflictos.',
      carreras: ['Derecho', 'Gobierno y Relaciones Internacionales'],
      pilares: ['Justicia social', 'Derechos humanos', 'Análisis crítico', 'Gobernanza']
    },
    {
      id: 4, nombre: 'Ciencias Administrativas', icono: 'fa-solid fa-chart-pie', color: '#f39c12',
      descripcionCorta: 'Gestión estratégica y liderazgo para el crecimiento empresarial.',
      descripcionLarga: 'Preparamos gerentes y contadores para navegar los negocios globales con visión estratégica e impacto.',
      carreras: ['Administración de Empresas', 'Contaduría Pública', 'Negocios Internacionales'],
      pilares: ['Gestión estratégica', 'Emprendimiento', 'Finanzas responsables', 'Liderazgo empresarial']
    },
    {
      id: 5, nombre: 'Ciencias Sociales y Humanas', icono: 'fa-solid fa-users-line', color: '#9b59b6',
      descripcionCorta: 'Compromiso con el desarrollo social y la comprensión del ser humano.',
      descripcionLarga: 'Generamos transformaciones positivas en comunidades, bienestar individual y equidad social.',
      carreras: ['Psicología', 'Trabajo Social'],
      pilares: ['Transformación social', 'Bienestar comunitario', 'Inclusión', 'Empatía']
    },
    {
      id: 6, nombre: 'Diseño y Comunicación', icono: 'fa-solid fa-pen-nib', color: '#e91e63',
      descripcionCorta: 'Creatividad y narrativa visual para transformar realidades.',
      descripcionLarga: 'Fomentamos expresión creativa y nuevas tecnologías para comunicación efectiva e innovación visual.',
      carreras: ['Diseño Gráfico', 'Comunicación Social y Periodismo'],
      pilares: ['Creatividad visual', 'Narrativa digital', 'Innovación mediática', 'Expresión artística']
    },
    {
      id: 7, nombre: 'Educación', icono: 'fa-solid fa-chalkboard-user', color: '#27ae60',
      descripcionCorta: 'Pasión por la pedagogía y la formación de las nuevas generaciones.',
      descripcionLarga: 'Formamos docentes que inspiren transformación social a través de pedagogía moderna y humanista.',
      carreras: ['Licenciatura en Educación Infantil', 'Licenciatura en Educación Física'],
      pilares: ['Excelencia pedagógica', 'Transformación social', 'Inclusión educativa', 'Innovación docente']
    }
  ];

  public stats = [
    { label: 'Comunidades Beneficiadas', value: 85, icon: 'fa-solid fa-hand-holding-heart', highlight: false },
    { label: 'Jornadas Realizadas', value: 42, icon: 'fa-solid fa-calendar-check', highlight: false },
    { label: 'Estudiantes Participantes', value: 500, icon: 'fa-solid fa-user-graduate', highlight: false },
    { label: 'Historias de Éxito', value: '100+', icon: 'fa-solid fa-star', highlight: true }
  ];

  public services = [
    {
      icon: 'fa-solid fa-user-graduate',
      title: 'Pregrados',
      description: 'Programas de formación profesional orientados a distintos proyectos de vida.',
      url: 'https://www.uniremington.edu.co/programa/pregrado.html'
    },
    {
      icon: 'fa-solid fa-award',
      title: 'Posgrados',
      description: 'Opciones para fortalecer competencias, liderazgo y crecimiento académico.',
      url: 'https://www.uniremington.edu.co/especializaciones/'
    },
    {
      icon: 'fa-solid fa-laptop-code',
      title: 'Modalidad virtual',
      description: 'Rutas flexibles para aprender desde diferentes lugares con acompañamiento.',
      url: 'https://www.uniremington.edu.co/programa1/virtualidad-formulario/'
    },
    {
      icon: 'fa-solid fa-universal-access',
      title: 'Accesibilidad',
      description: 'Enfoque institucional en inclusión, cercanía y oportunidades académicas.',
      url: 'https://www.uniremington.edu.co/programa/pregrado.html'
    }
  ];

  public currentStatIndex: number = 0;
  public currentHeroIndex: number = 0;
  public heroSlides = [
    {
      title: 'Atención integral en terreno',
      description: 'Jornadas con servicios profesionales de salud, derecho y bienestar animal para comunidades.',
      cta: 'Ver nuestras jornadas',
      image: 'assets/images/jornadaveterinaria.jpg.jpg',
      eyebrow: 'Jornadas activas'
    },
    {
      title: 'Acompañamiento jurídico gratuito',
      description: 'Consultorios legales que apoyan derechos, trámites y asesoría comunitaria.',
      cta: 'Conoce el equipo',
      image: 'assets/images/consultoriojuridicogratuito.jpg.jpg',
      eyebrow: 'Asesoría social'
    },
    {
      title: 'Impacto real en el territorio',
      description: 'Eventos comunitarios que conectan estudiantes, aliados y familias alrededor de soluciones prácticas.',
      cta: 'Lee los resultados',
      image: 'assets/images/eventocomunitario.jpg.webp',
      eyebrow: 'Comunidades'
    }
  ];
  public currentFeatureIndex: number = 0;
  private statIntervalId: any;
  private heroIntervalId: any;
  private featureIntervalId: any;

  constructor(private router: Router) {}

  selectFaculty(faculty: any): void {
    this.selectedFaculty = faculty;
  }

  closeFacultyModal(): void {
    this.selectedFaculty = null;
  }

  openDonationModal(): void {
    try {
      window.dispatchEvent(new CustomEvent('openDonationModal'));
    } catch (e) {}
  }

  /** Open the global Remi chat (AppComponent will listen to this event) */
  openGlobalRemi(): void {
    try {
      window.dispatchEvent(new CustomEvent('openRemiChat'));
    } catch (e) {}
  }

  handleAssistantAction(action: string): void {
    switch (action) {
      case 'inicio':
        this.verHistorias();
        break;
      case 'jornada':
        this.router.navigate(['/solicitar-jornada']);
        break;
      case 'donacion':
        this.router.navigate(['/donar']);
        break;
      case 'game':
        this.router.navigate(['/remi-game']);
        break;
      case 'soporte':
        this.router.navigate(['/contacto']);
        break;
      default:
        break;
    }
  }

  prevHeroSlide(): void {
    this.currentHeroIndex = (this.currentHeroIndex - 1 + this.heroSlides.length) % this.heroSlides.length;
  }

  nextHeroSlide(): void {
    this.currentHeroIndex = (this.currentHeroIndex + 1) % this.heroSlides.length;
  }

  goToHeroSlide(index: number): void {
    this.currentHeroIndex = index;
  }

  ngOnInit(): void {
    console.log('HomeComponent inicializado correctamente.');
    // Carrusel automático de estadísticas
    this.statIntervalId = setInterval(() => {
      this.currentStatIndex = (this.currentStatIndex + 1) % this.stats.length;
    }, 3600);

    this.heroIntervalId = setInterval(() => {
      this.currentHeroIndex = (this.currentHeroIndex + 1) % this.heroSlides.length;
    }, 5200);

    // Rotación automática de features (badge + claims)
    this.featureIntervalId = setInterval(() => {
      this.currentFeatureIndex = (this.currentFeatureIndex + 1) % 2; // tenemos 2 features principales
    }, 4200);
  }

  ngOnDestroy(): void {
    if (this.statIntervalId) { clearInterval(this.statIntervalId); }
    if (this.heroIntervalId) { clearInterval(this.heroIntervalId); }
    if (this.featureIntervalId) { clearInterval(this.featureIntervalId); }
  }

  /**
   * Maneja la suscripción al boletín informativo (Referencia Imagen 4)
   * @param email El valor capturado desde el input del HTML
   */
  onSubscribe(email: string): void {
    if (email && email.includes('@')) {
      console.log('Suscribiendo el correo:', email);
      alert(`¡Gracias! Hemos registrado el correo: ${email}`);
    } else {
      alert('Por favor, ingresa un correo electrónico válido.');
    }
  }

  contactarEquipo(): void {
    this.router.navigate(['/contacto']);
  }

  accederPlataforma(): void {
    this.router.navigate(['/login']);
  }

  /**
   * Navega a la sección de testimonios o impacto social
   */
  verHistorias(): void {
    this.router.navigate(['/impacto']);
  }
}
