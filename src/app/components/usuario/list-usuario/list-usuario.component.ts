import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-usuario',
  imports: [CommonModule],
  templateUrl: './list-usuario.component.html',
  styleUrl: './list-usuario.component.css'
})
export class ListUsuarioComponent {
  title = 'List Usuario';
    usuarios: any[] = [];

  constructor(private usuarioService: UserService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.getAll().subscribe({
      next: (res) => this.usuarios = res,
      error: (err) => console.error('Error cargando usuarios', err)
    });
  }

  nuevoUsuario(): void {
    // Navegar o mostrar formulario de creación
    console.log('Crear nuevo usuario');
  }

  editarUsuario(usuario: any): void {
    // Navegar o mostrar formulario de edición con usuario
    console.log('Editar usuario:', usuario);
  }

  eliminarUsuario(usuario: any): void {
    if (confirm(`¿Está seguro que desea eliminar al usuario ${usuario.nombreUsuario}?`)) {
     
    }
  }

}