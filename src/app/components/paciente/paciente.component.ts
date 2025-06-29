import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CamaService } from '../../services/cama.service';
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
  currentCama: any;
  pacienteForm!: FormGroup;
  camaId: string = '';

  constructor(private route: ActivatedRoute, private router: Router,
    private pacienteService: PacienteService, private fb: FormBuilder, private camaService: CamaService) {
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
    this.route.params.subscribe((params) => {
      this.route.paramMap.subscribe(params => {
        this.camaId = params.get('id') || '';
        console.log('Cama ID:', this.camaId);
      });

      this.route.queryParamMap.subscribe(params => {
        this.pacienteId = params.get('pacienteId') || '';
        console.log('Paciente ID:', this.pacienteId);
        if (this.pacienteId) {
          this.isEditing = true;
          this.getPaciente();
        }
      });
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
    if (this.pacienteForm.valid) {
      const paciente = this.pacienteForm.value;
      console.log('Paciente a guardar:', paciente);
      if (this.isEditing) {
        this.pacienteService.update(this.pacienteId, this.pacienteForm.value).subscribe(() => {
          console.log('Paciente actualizado');

          this.router.navigate(['/salas'],);
        });
      } else {
        this.pacienteService.create(this.pacienteForm.value).subscribe((res) => {
          console.log('Paciente creado');
          this.actualizarCama(res);
          this.router.navigate(['/salas'],);
        });
      }
    }
  }

  get diagnosticos(): FormArray {
    return this.pacienteForm.get('diagnosticos') as FormArray;
  }

  actualizarCama(res:any) {
    if (this.camaId) {
      this.camaService.get(this.camaId).subscribe(cama => {
        this.currentCama = cama;
        this.currentCama.paciente = res;
        this.currentCama.estado = 'ocupada';
        console.log('Cama a actualizar:', this.currentCama);
        this.camaService.update(this.camaId, this.currentCama).subscribe(() => {
          console.log('Cama actualizada');
        });
      });
    }
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
  cancelar(): void {
    this.pacienteForm.reset();
  }

}
