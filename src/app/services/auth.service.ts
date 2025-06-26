import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';
import { API_URI } from '../../../config/config';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http:HttpClient, private router: Router,private jwtService:JwtService) { }


  signIn(credentials: any) {
    return this.http.post(`${API_URI}/auth/login`, credentials);
  }

  logout() {
    localStorage.removeItem('tokenInter');
    this.router.navigate(['/auth']);
  }

  get(id: any): Observable<Usuario> {
    return this.http.get<Usuario>(`${API_URI}/auth/user/${id}`);
  }

  isLoggedIn():boolean {
    if (typeof window !== 'undefined' && !!localStorage.getItem('tokenInter')) {
      return true;
    }else{
      return false;
    }
  }

  getUserTk():Observable<Usuario>{
    const token = localStorage.getItem('tokenInter');
    const userId = this.jwtService.getUserIdFromToken(token);
    return this.http.get<Usuario>(`${API_URI}/auth/user/${userId}`);
  }
}
