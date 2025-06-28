import { Component } from '@angular/core';
import { MedicoService } from '../../../services/medico.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-medico',
  imports: [CommonModule],
  templateUrl: './list-medico.component.html',
  styleUrl: './list-medico.component.css'
})

export class ListMedicoComponent {
  title = 'List Medico';
  medicos: any[] = [];

  constructor(private medicoService: MedicoService) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos(): void {
    this.medicoService.getAll().subscribe((res:any) => {
      this.medicos = res.items || []  ;
      console.log(this.medicos);
    });
  }

  nuevoMedico(): void {
    // Lógica para navegar o mostrar formulario
    console.log('Crear nuevo médico');
  }

  editarMedico(medico: any): void {
    // Lógica para editar médico
    console.log('Editar médico:', medico);
  }

  eliminarMedico(medico: any): void {
    if (confirm(`¿Desea eliminar al médico ${medico.nombre} ${medico.apellido}?`)) {

    }
  }
}
