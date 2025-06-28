import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-add-usuario',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-usuario.component.html',
  styleUrl: './add-usuario.component.css'
})
export class AddUsuarioComponent implements OnInit {
  @Input() isEditMode = false;
  @Input() usuarioData: any; // objeto con los datos para edición
  usuarioForm!: FormGroup;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private userService:UserService) { }

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nombreUsuario: ['', Validators.required],
      contraseña: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', Validators.email],
      isActive: [true],
      rol: ['', Validators.required]
    });
    // Verificar si estamos editando
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.getUsuario(params['id']);
      }
    });
  }


  getUsuario(id:string) {
    this.userService.get(id).subscribe(res => {
      this.usuarioData = res;
      this.usuarioForm.patchValue(this.usuarioData);
    });
  }

  onSubmit(): void {
    if (this.usuarioForm.valid) {
      const usuario = this.usuarioForm.value;
      if (this.isEditMode) {
        // Lógica para actualizar usuario
        this.userService.update(this.usuarioData._id, usuario).subscribe(res => {
          this.router.navigate(['/usuarios']);
        });
      } else {
        // Lógica para crear usuario
     
        this.userService.create(usuario).subscribe(res=>{
          this.router.navigate(['/usuarios']);
        });
      }
    }
  }
  cancel(): void {
    this.usuarioForm.reset();
  }
}
