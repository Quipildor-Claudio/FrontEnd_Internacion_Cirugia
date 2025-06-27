import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario';
import { Sala } from '../../models/sala';
import { SalaService } from '../../services/sala.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  title = 'Gestión de Salas Hospitalarias';
  usuarios: Usuario[] = [];
  currentUser: any;
  dni: string = '';
  pacienteEncontrado: any = null;

  pacientes = [
    { dni: '12345678', nombre: 'Juan Pérez' },
    { dni: '87654321', nombre: 'María García' }
  ];
  salas: Sala[] = [];


  constructor(private userService: UserService, private authService: AuthService,
    private router: Router, private salaService: SalaService) {
    this.authService.getUserTk().subscribe((user) => { this.currentUser = user; console.log(user); });
  }
  ngOnInit() {
    this.getSalas();
  }
  getSalas() {
    this.salaService.getAll().subscribe((salas: Sala[]) => {
      this.salas = salas;
      console.log(salas);
    }, error => {
      console.error('Error al obtener las salas:', error);
    });
  }

  buscarPorDni() {

  }
  delete(item: any) {

  }




}
