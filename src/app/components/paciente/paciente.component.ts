import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-paciente',
  imports: [],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css'
})
export class PacienteComponent implements OnInit {
  title = "Paciente";
  pacienteId?: string;
  isEditing = false;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Verificar si estamos editando
    this.route.params.subscribe((params) => {
      if (params['id']) {
        const pacienteId = params['id'];
      }
    });
  }


}
