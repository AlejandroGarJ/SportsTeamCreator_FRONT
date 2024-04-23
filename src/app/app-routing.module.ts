import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Modules/dashboard/dashboard.component';
import { RegisterComponent } from './Modules/register/register.component';
import { PasswordForgetComponent } from './Modules/password-forget/password-forget.component';
import { LoginComponent } from './Modules/login/login.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'password-forget', component: PasswordForgetComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
