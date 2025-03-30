import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Role } from '../models/role';
import { API_URI } from '../../../config/config';
@Injectable({
  providedIn: 'root'
})

export class RoleService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<any[]> {
      return this.http.get(`${API_URI}/roles`).pipe(
        map(response => response as any[])
      );
    }
    get(id: any): Observable<Role> {
      return this.http.get<Role>(`${API_URI}/role/${id}`);
    }
  
    create(data: any): Observable<any> {
      return this.http.post(`${API_URI}/role`, data);
    }
  
    update(id: any, data: any): Observable<any> {
      return this.http.put(`${API_URI}/role/${id}`, data);
    }
  
    delete(id: any): Observable<any> {
      return this.http.delete(`${API_URI}/role/${id}`);
    }
}
