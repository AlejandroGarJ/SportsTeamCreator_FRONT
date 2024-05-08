import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Modules/dashboard/dashboard.component';
import { RegisterComponent } from './Modules/register/register.component';
import { PasswordForgetComponent } from './Modules/password-forget/password-forget.component';
import { LoginComponent } from './Modules/login/login.component';
import { authGuard } from './Core/Guards/auth.guard';
import { CambiarContrasenaComponent } from './Core/Pages/cambiar-contrasena/cambiar-contrasena.component';
import { NotFoundComponent } from './Core/Pages/not-found/not-found.component';
import { CorreoCambioContrasenaComponent } from './Core/Pages/correo-cambio-contrasena/correo-cambio-contrasena.component';
import { PerfilComponent } from './Modules/Usuario/perfil/perfil.component';
import { MenuAdminComponent } from './Modules/club/menu-admin/menu-admin.component';
import { DashboardClubUsuarioComponent } from './Modules/dashboard-club-usuario/dashboard-club-usuario.component';
import { MenuJugadoresComponent } from './Modules/club/menu-jugadores/menu-jugadores.component';


const routes: Routes = [

  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'dashboard/club', component: DashboardClubUsuarioComponent, canActivate: [authGuard] },
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'changePassword', component: PasswordForgetComponent },
  { path: 'cambiarContrasena', component: CambiarContrasenaComponent },
  { path: 'notFound', component: NotFoundComponent },
  { path: 'correo-cambio-contrasena', component: CorreoCambioContrasenaComponent },
  { path: 'perfil', component: PerfilComponent, canActivate: [authGuard] },
  { path: 'menuadmin', component: MenuAdminComponent },
  { path: 'menujugadores', component: MenuJugadoresComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
