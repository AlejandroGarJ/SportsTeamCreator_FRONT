import { Component } from '@angular/core';
import { AuthUsuarioService } from '../../Core/Services/usuario/auth-usuario.service';
import { DateAdapter } from '@angular/material/core';
import { rutas } from '../../../environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  dni: string = "";
  email: string = "";
  nombre: string = "";
  apellidos: string = "";
  fechaNacimiento: Date = new Date();
  genero: string = "";
  contrasena2: string = "";
  contrasena: string = "";
  contrasenaMal: boolean = false;
  emailMal: boolean = false;
  mensajeErrorEmail: string = "";
  mensajeErrorContrasena: string = "";
  formatoCorrecto: boolean = true;
  rutas = rutas;
  comprobandoRegister: boolean = false;
  constructor(private authUsuario: AuthUsuarioService, private dateAdapter: DateAdapter<Date>, private router: Router) {
    this.dateAdapter.setLocale('es');  // Configura el localizador a español si es necesario
  }

  registrarUsuario() {
    this.resetearEstilos();
    this.comprobarFormatoRegistro();
    if (this.formatoCorrecto) {
      this.comprobandoRegister = true;
      this.authUsuario.registrarUsuario({
        dni: this.dni,
        email: this.email,
        nombre: this.nombre,
        apellidos: this.apellidos,
        fechaNacimiento: this.fechaNacimiento,
        genero: this.genero,
        contrasena: this.contrasena
      }).subscribe(
        (response) => {
          if (response['ok'] === 'ok') {
            alert("Registro completado con éxito");
          } else {
            this.procesarErrores(response);
          }
          this.comprobandoRegister = false;
        },
        (error) => {
          alert('Hubo un problema al registrar el usuario.');
          console.error(error);
          this.comprobandoRegister = false;
        }
      );
    }
  }
  emailIncorrecto() {
    let inputEmail = document.getElementById("email");
    if (inputEmail != null) inputEmail.style.border = "1px solid red";
    this.emailMal = true;
  }
  contrasenaIncorrecta() {
    let inputContrasena = document.getElementById("password");
    let inputContrasena2 = document.getElementById("password2");
    if (inputContrasena != null) inputContrasena.style.border = "1px solid red";
    if (inputContrasena2 != null) inputContrasena2.style.border = "1px solid red";
    this.contrasenaMal = true;
  }
  dniIncorrecto() {
    let inputDni = document.getElementById("dni");
    if (inputDni != null) inputDni.style.border = "1px solid red";
  }
  procesarErrores(response: any) {
    if (response['email'] === 'emailUsado') {
      this.emailIncorrecto();
      this.mensajeErrorEmail = 'El correo ya está en uso';
    }
    if (response['dni'] === 'dniYaExiste') {
      this.dniIncorrecto();
      this.mensajeErrorContrasena = 'Contraseña demasiado débil';
    }
  }

  resetearEstilos() {
    let inputContrasena = document.getElementById("password");
    let inputEmail = document.getElementById("email");
    if (inputContrasena != null) inputContrasena.style.border = "1px solid grey";
    if (inputEmail != null) inputEmail.style.border = "1px solid grey";
    this.emailMal = false;
    this.contrasenaMal = false;
    this.formatoCorrecto = true;
  }

  comprobarFormatoRegistro() {
    if (this.contrasena == "" || this.contrasena.length < 7) {
      this.contrasenaIncorrecta();
      this.formatoCorrecto = false;
      this.mensajeErrorContrasena = "Introduzca una contraseña válida";
    }
    if (this.email == "" || this.email.indexOf('@') == -1) {
      this.emailIncorrecto();
      this.formatoCorrecto = false;
      this.mensajeErrorEmail = "Introduzca un email correcto";
    }
  }

  irALogin(){
    this.router.navigate([this.rutas.login]);
  }
  
}
