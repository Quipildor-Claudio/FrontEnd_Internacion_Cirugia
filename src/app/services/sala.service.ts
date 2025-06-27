import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_URI } from '../../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SalaService {
   constructor(private http: HttpClient) { }
    getAll(): Observable<any[]> {
      return this.http.get(`${API_URI}/salas`).pipe(
        map(response => response as any[])
      );
    }
  
    get(id: any): Observable<any> {
      return this.http.get<any>(`${API_URI}/sala/${id}`);
    }
  
    create(data: any): Observable<any> {
      return this.http.post(`${API_URI}/sala`, data);
    }
  
    update(id: any, data: any): Observable<any> {
      return this.http.put(`${API_URI}/sala/${id}`, data);
    }
  
    delete(id: any): Observable<any> {
      return this.http.delete(`${API_URI}/sala/${id}`);
    }
}
