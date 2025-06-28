import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicoService } from '../../../services/medico.service';

@Component({
  selector: 'app-add-medico',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-medico.component.html',
  styleUrl: './add-medico.component.css'
})
export class AddMedicoComponent implements OnInit {
  @Input() isEditMode = false;
  @Input() medicoData: any;
  medicoForm!: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private medicoService: MedicoService) { }

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
 // Verificar si estamos editando
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.getMedico(params['id']);
      }
    });
  }
  getMedico(id: string) {
    this.medicoService.get(id).subscribe(res => {
      this.medicoData = res;
      this.medicoForm.patchValue(this.medicoData);
    });
  }

  onSubmit(): void {
    if (this.medicoForm.valid) {
      const medico = this.medicoForm.value;
      if (this.isEditMode) {
        // Lógica de actualización
        this.medicoService.update(this.medicoData._id, medico).subscribe(res => {
          this.router.navigate(['/medicos']);
        });
      } else {
        // Lógica de creación
        this.medicoService.create(medico).subscribe(res => {
          this.router.navigate(['/medicos']);
        });
      }
    }
  }
}
