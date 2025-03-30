import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';
import { API_URI } from '../../../config/config';

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

  get(id: any): Observable<User> {
    return this.http.get<User>(`${API_URI}/auth/user/${id}`);
  }

  isLoggedIn():boolean {
    if (typeof window !== 'undefined' && !!localStorage.getItem('tokenInter')) {
      return true;
    }else{
      return false;
    }
  }

  getUserTk():Observable<User>{
    const token = localStorage.getItem('tokenInter');
    const userId = this.jwtService.getUserIdFromToken(token);
    return this.http.get<User>(`${API_URI}/auth/user/${userId}`);
  }
}
