/* La clase `CorreoCambioContrasenaComponent` es un componente Angular que maneja el envío de un correo
para cambiar contraseña con manejo de errores y funcionalidad de navegación. */
import { Component } from '@angular/core';
import { AuthUsuarioService } from '../../Services/usuario/auth-usuario.service';
import { Router } from '@angular/router';
import { rutas } from '../../../../environments/environment';

@Component({
  selector: 'app-correo-cambio-contrasena',
  templateUrl: './correo-cambio-contrasena.component.html',
  styleUrl: './correo-cambio-contrasena.component.css'
})
export class CorreoCambioContrasenaComponent {

  correo: string = "";
  correoCorrecto: boolean = true;
  loading: boolean = false;
  correoEnviadoCorrectamente: boolean = false;
  rutas = rutas;
  constructor(private usuarioAuth: AuthUsuarioService, private router: Router) {

  }

  /**
* La función `enviarCorreo` comprueba si una dirección de correo electrónico es válida y envía un correo electrónico de restablecimiento de contraseña
* si la dirección es válida.
*/
  enviarCorreo() {
    this.correoCorrecto = true;
    this.loading = true;
    if (this.correo.indexOf('@') == -1 || this.correo == "" || this.correo.indexOf('.') == -1) this.correoCorrecto = false;
    else {

      this.usuarioAuth.enviarCorreoCambioContrasena(this.correo).subscribe(
        (response) => {
          if (response == 'No existe el correo') {
            this.correoCorrecto = false;
          }
          else {
            this.correoEnviadoCorrectamente = true;

          }
          this.loading = false;

        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  volver() {
    this.router.navigate([this.rutas.login]);
  }
}
