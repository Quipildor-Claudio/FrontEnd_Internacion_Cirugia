import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-paciente',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css'
})
export class PacienteComponent implements OnInit {
  title = "Datos del Paciente";
  pacienteId?: string;
  isEditing = false;
  currentPaciente: any;
  pacienteForm!: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private pacienteService: PacienteService, private fb: FormBuilder) {
    this.pacienteForm = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      nombre: [''],
      apellido: [''],
      edad: ['', [Validators.pattern(/^\d+$/)]],
      fecha_nac: [''],
      sexo: [''],
      hclinica: [''],
      diagnosticos: this.fb.array([
        this.crearDiagnostico()
      ]),
      fechaIngreso: [''],
      fechaSalida: ['']
    });
  }

  ngOnInit(): void {
    // Verificar si estamos editando
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.pacienteId = params['id'];
        this.getPaciente();
        this.isEditing = true;
         console.log(this.currentPaciente); 
      }
    });
  }
  
  getPaciente() {
    this.pacienteService.get(this.pacienteId).subscribe(res => { 
      this.currentPaciente = res;
      this.pacienteForm.patchValue(this.currentPaciente)
    });
  }

  guardar(): void {
    if (this.pacienteForm.invalid) {
      this.pacienteForm.markAllAsTouched();
      return;
    }

    const paciente = this.pacienteForm.value;
    console.log('Paciente a guardar:', paciente);


  }

  get diagnosticos(): FormArray {
    return this.pacienteForm.get('diagnosticos') as FormArray;
  }

  crearDiagnostico(): FormGroup {
    return this.fb.group({
      tipo: [''],
      descripcion: [''],
      fecha: ['']
    });
  }

  agregarDiagnostico(): void {
    this.diagnosticos.push(this.crearDiagnostico());
  }

  quitarDiagnostico(index: number): void {
    this.diagnosticos.removeAt(index);
  }

}
