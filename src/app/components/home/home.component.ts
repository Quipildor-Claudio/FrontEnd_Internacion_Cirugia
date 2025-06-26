import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
  title = 'Gestión de Salas Hospitalarias';
  usuarios: Usuario[] = [];
  currentUser: any;

  dni: string = '';
  pacienteEncontrado: any = null;

  pacientes = [
    { dni: '12345678', nombre: 'Juan Pérez' },
    { dni: '87654321', nombre: 'María García' }
  ];

  salas = [
    { id: 1, nombre: 'Sala A', ocupadas: 10, libres: 5 },
    { id: 2, nombre: 'Sala B', ocupadas: 7, libres: 8 },
    { id: 3, nombre: 'Sala C', ocupadas: 4, libres: 11 }
  ];

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
    this.authService.getUserTk().subscribe((user) => { this.currentUser = user; console.log(user); });
  }

  buscarPorDni() {
    this.pacienteEncontrado = this.pacientes.find(p => p.dni === this.dni);
  }
  delete(item: any) {

  }

  verSala(id: number) {
    this.router.navigate(['/sala', id]);
  }
  print() { }

}
