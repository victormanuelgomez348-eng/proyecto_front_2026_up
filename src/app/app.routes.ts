import { Routes } from '@angular/router';
import { BeneficiarioComponent } from './beneficiario/beneficiario.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { IndicadorComponent } from './indicador/indicador.component';
import { SeguimientoComponent } from './seguimiento/seguimiento.component';
import { ServicioPrestadoComponent } from './servicioprestado/servicioprestado.component';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'beneficiarios', component: BeneficiarioComponent },
  { path: 'estudiantes', component: EstudianteComponent },
  { path: 'indicadores', component: IndicadorComponent },
  { path: 'seguimientos', component: SeguimientoComponent },
  { path: 'servicios-prestados', component: ServicioPrestadoComponent },
  { path: '**', redirectTo: 'home' }
];
