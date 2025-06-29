import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Paciente } from '../../models/paciente';
import { OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-list-paciente',
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './list-paciente.component.html',
  styleUrl: './list-paciente.component.css'
})
export class ListPacienteComponent implements OnInit {
  pacientes: Paciente[] = [];
  filtro: string = '';
  busquedaControl = new FormControl();
  constructor(private route: Router, private pacienteService: PacienteService) {

  }

  ngOnInit(): void {
    this.cargarPacientes();

     this.busquedaControl.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((texto: string) => {
        if (texto.trim()) {
          return this.pacienteService.buscarPacientes(texto);
        } else {
          return []; // Evita mostrar todos si está vacío
        }
      })
    ).subscribe({
      next: (result) => this.pacientes = result,
      error: () => this.pacientes = [] // Reset si hay error o no se encuentran
    });
  
  }


  cargarPacientes() {
    this.pacienteService.getAll().subscribe(
      (res: any) => this.pacientes = res.items
    );

  }

  eliminarPaciente(id: string) {

  }
}
