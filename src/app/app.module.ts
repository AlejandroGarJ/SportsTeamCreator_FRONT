import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Modules/dashboard/dashboard.component';
import { RegisterComponent } from './Modules/register/register.component';
import { PasswordForgetComponent } from './Modules/password-forget/password-forget.component';
import { FormsModule } from "@angular/forms";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Loader1Component } from './shared/components/loader1/loader1.component';
import { LoginComponent } from './Modules/login/login.component';
import { SwitcherComponent } from './shared/components/switcher/switcher.component';
import { MatNativeDateModule } from '@angular/material/core';
import { DashboardClubUsuarioComponent } from './Modules/dashboard-club-usuario/dashboard-club-usuario.component';
import { BanerLateralComponent } from './Modules/dashboard-club-usuario/baner-lateral/baner-lateral.component';
import { CambiarContrasenaComponent } from './Core/Pages/cambiar-contrasena/cambiar-contrasena.component';
import { NotFoundComponent } from './Core/Pages/not-found/not-found.component';
import { CorreoCambioContrasenaComponent } from './Core/Pages/correo-cambio-contrasena/correo-cambio-contrasena.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RegisterComponent,
    PasswordForgetComponent,
    Loader1Component,
    LoginComponent,
    SwitcherComponent,
    DashboardClubUsuarioComponent,
    BanerLateralComponent,
    CambiarContrasenaComponent,
    NotFoundComponent,
    CorreoCambioContrasenaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    provideClientHydration(),
    
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
