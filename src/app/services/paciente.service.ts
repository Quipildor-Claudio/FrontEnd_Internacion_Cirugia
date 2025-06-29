import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_URI } from '../../../config/config';
import { Paciente } from '../models/paciente';


@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get(`${API_URI}/pacientes`).pipe(
      map(response => response as any[])
    );
  }

  get(id: any): Observable<any> {
    return this.http.get<any>(`${API_URI}/paciente/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${API_URI}/paciente`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${API_URI}/paciente/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${API_URI}/paciente/${id}`);
  }
  buscarPacientes(query: string): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${API_URI}/searchpaciente?query=${query}`);
  }
}
