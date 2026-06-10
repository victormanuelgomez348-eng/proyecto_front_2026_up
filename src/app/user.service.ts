import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

// Definimos una interfaz clara para las credenciales de login
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UsuarioLogin {
  id?: number;
  nombre?: string;
  apellido?: string;
  email?: string;
  documento?: string;
  facultad?: string;
  especialidad?: string;
  password?: string;
  activo?: boolean;
  role?: string;
}

export interface Estudiante {
  id?: number;
  nombre: string;
  email: string;
  facultad: string;
  password?: string;
  fechaRegistro?: string;
}

interface JornadaRequest {
  id?: number;
  nombreSolicitante: string;
  emailSolicitante: string;
  telefonoSolicitante?: string;
  municipio: string;
  comunidad: string;
  descripcionNecesidad: string;
  fechaSolicitud?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // CORREGIDO: Ahora recibe LoginCredentials y envía el objeto correctamente
  login(credentials: LoginCredentials): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  // =====================
  // ESTUDIANTES
  // =====================
  getStudents(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(`${this.apiUrl}/admin/students`);
  }

  createStudent(student: Estudiante): Observable<Estudiante> {
    return this.http.post<Estudiante>(`${this.apiUrl}/admin/students`, student);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/students/${id}`);
  }

  // =====================
  // DOCENTES
  // =====================
  getTeachers(): Observable<UsuarioLogin[]> {
    return this.http.get<UsuarioLogin[]>(`${this.apiUrl}/docentes`);
  }

  createTeacher(teacher: UsuarioLogin): Observable<UsuarioLogin> {
    return this.http.post<UsuarioLogin>(`${this.apiUrl}/docentes`, teacher);
  }

  updateTeacher(id: number, teacher: UsuarioLogin): Observable<UsuarioLogin> {
    return this.http.put<UsuarioLogin>(`${this.apiUrl}/docentes/${id}`, teacher);
  }

  deleteTeacher(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/docentes/${id}`);
  }

  // =====================
  // DONACIONES
  // =====================
  registrarDonacion(donacionData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/donaciones`, donacionData);
  }

  // =====================
  // SOLICITUD DE JORNADA
  // =====================
  createJornadaRequest(jornada: JornadaRequest): Observable<JornadaRequest> {
    return this.http.post<JornadaRequest>(`${this.apiUrl}/jornadas`, jornada);
  }
}
