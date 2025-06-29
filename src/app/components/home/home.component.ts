import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario';
import { Sala } from '../../models/sala';
import { SalaService } from '../../services/sala.service';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { PacienteService } from '../../services/paciente.service';
import { Paciente } from '../../models/paciente';
@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent implements OnInit {
  title = 'Gestión de Salas Hospitalarias';
  usuarios: Usuario[] = [];
  currentUser: any;
  dni: string = '';
  pacienteEncontrado: any = null;
  busquedaControl = new FormControl();
  pacientes: Paciente[] = [];
  busquedaActiva = false;
  salas: Sala[] = [];
  disponibles = 0;
  ocupadas = 0;


  constructor(private userService: UserService, private authService: AuthService,
    private router: Router, private salaService: SalaService, private pacienteService: PacienteService) {
    this.authService.getUserTk().subscribe((user) => { this.currentUser = user; console.log(user); });
  }
  ngOnInit() {

    this.getSalas();
    this.contarCamas(this.salas);
    this.busquedaControl.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(query => {
        const texto = query.trim();
        this.busquedaActiva = texto.length > 0;
        return texto
          ? this.pacienteService.buscarPacientes(texto)
          : [];
      })
    ).subscribe({
      next: (result) => this.pacientes = result,
      error: () => this.pacientes = [] // Reset si hay error o no se encuentran
    });
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
  contarCamas(sala: any) {
    if (sala.camas && sala.camas.length > 0) {
      for (const cama of sala.camas) {
        if (cama.estado === 'disponible') {
          this.disponibles++;
        } else if (cama.estado === 'ocupada') {
          this.ocupadas++;
        }
      }
    }
  }




}
