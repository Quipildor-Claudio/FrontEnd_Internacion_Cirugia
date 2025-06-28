import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-usuario',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-usuario.component.html',
  styleUrl: './add-usuario.component.css'
})
export class AddUsuarioComponent implements OnInit {
  @Input() isEditMode = false;
  @Input() usuarioData: any; // objeto con los datos para edición
  usuarioForm!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nombreUsuario: ['', Validators.required],
      contraseña: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', Validators.email],
      isActive: [true],
      rol: ['', Validators.required]
    });
     if (this.isEditMode && this.usuarioData) {
      this.usuarioForm.patchValue(this.usuarioData);
    }
  }

   onSubmit(): void {
    if (this.usuarioForm.valid) {
      const usuario = this.usuarioForm.value;
      if (this.isEditMode) {
        // Lógica para actualizar usuario
        console.log('Actualizar usuario:', usuario);
      } else {
        // Lógica para crear usuario
        console.log('Crear nuevo usuario:', usuario);
      }
    }
  }
}
