import { Component } from '@angular/core';
import { MedicoService } from '../../../services/medico.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-medico',
  imports: [CommonModule,RouterLink],
  templateUrl: './list-medico.component.html',
  styleUrl: './list-medico.component.css'
})

export class ListMedicoComponent {
  title = 'List Medico';
  medicos: any[] = [];

  constructor(private medicoService: MedicoService,private router:Router) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos(): void {
    this.medicoService.getAll().subscribe((res:any) => {
      this.medicos = res.items || []  ;
      console.log(this.medicos);
    });
  }


  eliminarMedico(medico: any): void {
    if (confirm(`¿Desea eliminar al médico ${medico.nombre} ${medico.apellido}?`)) {
      this.medicoService.delete(medico._id).subscribe(res => {
        this.cargarMedicos();
      });
    }
  }
}
