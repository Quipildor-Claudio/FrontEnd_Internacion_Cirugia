import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{ 
  authService=inject(AuthService);
  currentUser : User;
  constructor() {
    this.currentUser =  new User();
  }
  ngOnInit(): void {
    this.authService.getUserTk().subscribe(res=>this.currentUser=res);
   
  }
}
