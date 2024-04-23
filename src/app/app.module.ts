import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Modules/dashboard/dashboard.component';
import { RegisterComponent } from './Modules/register/register.component';
import { PasswordForgetComponent } from './Modules/password-forget/password-forget.component';
import {FormsModule} from "@angular/forms";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Loader1Component } from './shared/components/loader1/loader1.component';
import { LoginComponent } from './Modules/login/login.component';
import { SwitcherComponent } from './shared/components/switcher/switcher.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RegisterComponent,
    PasswordForgetComponent,
    Loader1Component,
    LoginComponent,
    SwitcherComponent,
  
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FullCalendarModule,
        FormsModule,
        HttpClientModule
    ],
  providers: [
    provideClientHydration(),
    
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
