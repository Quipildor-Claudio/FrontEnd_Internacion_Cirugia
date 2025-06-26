import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario';


@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'Home';
  usuarios: Usuario[] = [];
  currentUser: any;
  constructor( private userService: UserService, private authService:AuthService) {
    this.authService.getUserTk().subscribe((user) => { this.currentUser = user; console.log(user); });
  }

  fetchData() {
   
  }
  delete(item: any) {

  }
  print() { }

}
