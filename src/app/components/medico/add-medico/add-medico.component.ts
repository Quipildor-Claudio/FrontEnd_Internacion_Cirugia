import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-medico',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-medico.component.html',
  styleUrl: './add-medico.component.css'
})
export class AddMedicoComponent implements OnInit{
  @Input() isEditMode = false;
  @Input() medicoData: any;
  medicoForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cuil: ['', Validators.required],
      titulo: [''],
      matricula: [''],
      servicio: [''],
      funcion: ['']
    });

    if (this.isEditMode && this.medicoData) {
      this.medicoForm.patchValue(this.medicoData);
    }
  }

  onSubmit(): void {
    if (this.medicoForm.valid) {
      const medico = this.medicoForm.value;
      if (this.isEditMode) {
        // Lógica de actualización
        console.log('Actualizar médico:', medico);
      } else {
        // Lógica de creación
        console.log('Registrar médico:', medico);
      }
    }
  }
}
