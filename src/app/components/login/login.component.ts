import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
 /**
   * Método para manejar el login
   */
 onSubmit() {
  if (this.loginForm.invalid) {
    return;
  }
  const credentials = this.loginForm.value;
  this.authService.signIn(credentials).subscribe({
    next: (response: any) => {
      localStorage.setItem('tokenInter', response.token);
      this.router.navigate(['/home']); // Navegar al dashboard
    },
    error: (error) => {
      this.errorMessage = error.error.message || 'Usuario o contrasena Incorrecta';
    }
  }
  );
  
}
}
