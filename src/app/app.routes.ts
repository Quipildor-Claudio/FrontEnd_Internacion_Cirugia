import { Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CamasComponent } from './components/camas/camas.component';
import { PacienteComponent } from './components/paciente/paciente.component';
import { AddMedicoComponent } from './components/medico/add-medico/add-medico.component';
import { ListMedicoComponent } from './components/medico/list-medico/list-medico.component';
import { ListUsuarioComponent } from './components/usuario/list-usuario/list-usuario.component';
import { AddUsuarioComponent } from './components/usuario/add-usuario/add-usuario.component';
export const routes: Routes = [

    { path: 'auth', component: LoginComponent },

    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: 'camas/:id', component: CamasComponent, canActivate: [authGuard] },
    { path: 'paciente/:id', component: PacienteComponent, canActivate: [authGuard] },
    // Ruta para agregar o editar un médico
    { path: 'medicos', component: ListMedicoComponent, canActivate: [authGuard] },
    { path: 'medico', component: AddMedicoComponent, canActivate: [authGuard] },
    { path: 'medico/:id', component: AddMedicoComponent, canActivate: [authGuard] },

    // Ruta para agregar o editar un usuario
    { path: 'usuarios', component: ListUsuarioComponent, canActivate: [authGuard] },
    { path: 'usuario', component: AddUsuarioComponent, canActivate: [authGuard] },
    { path: 'usuario/:id', component: AddUsuarioComponent, canActivate: [authGuard] },
    // Ruta para manejo de errores, cuando la ruta no se encuentra
    { path: '**', component: HomeComponent, canActivate: [authGuard] }, // Redirige a una página de error si la ruta no es válida

    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige al login si la ruta está vacía

];
