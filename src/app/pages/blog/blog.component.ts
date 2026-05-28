import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
  categories = ['Todos', 'Social', 'Académico', 'Institucional'];
  selectedCategory = 'Todos';

  posts = [
    { id: 1, title: 'Uniremington al Parque: Támesis 2026', category: 'Social',
      image: 'assets/images/compromiso.jpg.jpg', content: 'Una jornada de integración donde la comunidad académica sale a los espacios públicos para ofrecer servicios gratuitos, orientación profesional y actividades lúdicas para toda la familia.', isFlipped: false },
    { id: 2, title: 'Derechos Humanos y Paz', category: 'Social',
      image: 'assets/images/asesoriadeclaracionderenta.jpg.jpg', content: 'Proyecto enfocado en la sensibilización y formación de líderes sociales. Trabajamos de la mano con las comunidades para promover la reconciliación y el respeto por los derechos fundamentales.', isFlipped: false },
    { id: 3, title: 'Brigada de Salud', category: 'Social',
      image: 'assets/images/brigadajuri.jpg.jpg', content: 'Nuestros estudiantes de medicina y enfermería brindan atención primaria, toma de presión y asesorías nutricionales totalmente gratuitas para las familias más vulnerables del municipio.', isFlipped: false },
    { id: 4, title: 'Uniremington Reforesta', category: 'Social',
      image: 'assets/images/medioambiente.jpg.jpg', content: 'Iniciativa de sostenibilidad ambiental enfocada en la siembra de árboles nativos y limpieza de cuencas hidrográficas locales con el apoyo de nuestros estudiantes.', isFlipped: false },
    { id: 5, title: 'Consultorio Jurídico', category: 'Social',
      image: 'assets/images/consultoriojuridico.jpg.jpg', content: 'Brindamos asesoría legal gratuita en temas de derecho civil, laboral y familiar para personas que no cuentan con los recursos para pagar un abogado privado.', isFlipped: false },
    { id: 6, title: 'Alianzas Estratégicas', category: 'Académico',
      image: 'assets/images/compromiso.jpg.jpg', content: 'Fortalecemos nuestro impacto firmando nuevos convenios con universidades internacionales y empresas líderes para garantizar mejores prácticas de aprendizaje.', isFlipped: false }
  ];

  get filteredPosts() {
    return this.selectedCategory === 'Todos'
      ? this.posts
      : this.posts.filter(p => p.category === this.selectedCategory);
  }

  selectCategory(cat: string) {
    this.selectedCategory = cat;
  }

  toggleFlip(post: any) {
    post.isFlipped = !post.isFlipped;
  }
}
