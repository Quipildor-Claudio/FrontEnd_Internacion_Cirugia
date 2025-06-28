import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{ 
  authService=inject(AuthService);
  currentUser : Usuario;
  constructor() {
    this.currentUser =  new Usuario();
  }
  ngOnInit(): void {
    this.authService.getUserTk().subscribe(res=>this.currentUser=res);
   
  }
}
