import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Modules/dashboard/dashboard.component';
import { RegisterComponent } from './Modules/register/register.component';
import { PasswordForgetComponent } from './Modules/password-forget/password-forget.component';
import { LoginComponent } from './Modules/login/login.component';
import { authGuard } from './Core/Guards/auth.guard';
import { DashboardClubUsuarioComponent } from './Modules/dashboard-club-usuario/dashboard-club-usuario.component';


const routes: Routes = [

  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/club', component: DashboardClubUsuarioComponent },
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'changePassword', component: PasswordForgetComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
