import { Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CamasComponent } from './components/camas/camas.component';
export const routes: Routes = [

    { path: 'auth', component: LoginComponent },

    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: 'camas/:id', component: CamasComponent, canActivate: [authGuard] },
    { path: 'paciente/:id', component: CamasComponent, canActivate: [authGuard] },

    // Ruta para manejo de errores, cuando la ruta no se encuentra
    { path: '**', component: HomeComponent, canActivate: [authGuard] }, // Redirige a una página de error si la ruta no es válida

    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige al login si la ruta está vacía

];
