import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Modules/dashboard/dashboard.component';
import { RegisterComponent } from './Modules/register/register.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
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
import { PerfilComponent } from './Modules/Usuario/perfil/perfil.component';
import { EquipoComponent } from './Modules/dashboard-club-usuario/equipo/equipo.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PopUpCrearEventoComponent } from './Modules/dashboard-club-usuario/pop-up-crear-evento/pop-up-crear-evento.component';
import { PopUpDetallesEventoComponent } from './Modules/dashboard-club-usuario/pop-up-detalles-evento/pop-up-detalles-evento.component';
import { PopUpCrearEquipoComponent } from './Modules/dashboard-club-usuario/pop-up-crear-equipo/pop-up-crear-equipo.component';
import { PopUpEditarEquipoComponent } from './Modules/dashboard-club-usuario/pop-up-editar-equipo/pop-up-editar-equipo.component';
import { LoaderMinimalistaComponent } from './shared/loader-minimalista/loader-minimalista.component';
import { LandingPageComponent } from './Modules/landing-page/landing-page.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RegisterComponent,
    Loader1Component,
    LoginComponent,
    SwitcherComponent,
    DashboardClubUsuarioComponent,
    BanerLateralComponent,
    CambiarContrasenaComponent,
    NotFoundComponent,
    CorreoCambioContrasenaComponent,
    PerfilComponent,
    EquipoComponent,
    PopUpCrearEventoComponent,
    PopUpDetallesEventoComponent,
    PopUpCrearEquipoComponent,
    PopUpEditarEquipoComponent,
    LoaderMinimalistaComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
