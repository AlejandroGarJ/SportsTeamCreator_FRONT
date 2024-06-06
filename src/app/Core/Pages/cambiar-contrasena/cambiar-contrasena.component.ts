/* La clase `CambiarContrasenaComponent` en TypeScript es responsable de manejar la funcionalidad 
de cambio de contraseña, incluida la verificación de token, el cambio de contraseña y la
 visualización de mensajes de error usando Angular y ToastrService. */
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthUsuarioService } from '../../Services/usuario/auth-usuario.service';
import { Router } from '@angular/router';
import { rutas } from '../../../../environments/environment';
import { SessionUsuario } from '../../Models/session.model';
import { obtenerSessionUsuario } from '../../../shared/guardarSessionUsuario/guardarSessionUsuario';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrl: './cambiar-contrasena.component.css'
})

export class CambiarContrasenaComponent {

  token: string = "";
  correo: string = "";
  contrasena1: string = "";
  contrasena2: string = "";
  contrasenasCorrectas: boolean = false;
  mensajeError = "";
  tokenOk: boolean = false;
  rutas = rutas;
  loading = false;
  contrasenaCambiada = false;

  /**
 * La función constructora inicializa las variables en función de los parámetros de consulta y realiza la validación de tokens
 * utilizando un servicio, redireccionando a una ruta 'notFound' si es necesario.
 * @param {ActivatedRoute} route - El parámetro `route` es una instancia de la clase `ActivatedRoute`
 * que se utiliza para acceder a información sobre una ruta asociada con un componente cargado en una
 * salida. Proporciona acceso a parámetros de ruta, parámetros de consulta y otra información relacionada con
 * la ruta actual. En el constructor proporcionado, `
 * @param {AuthUsuarioService} authUsuario - El parámetro `authUsuario` en el constructor es una
 * instancia de `AuthUsuarioService`, que es un servicio utilizado para manejar la autenticación de usuarios y
 * funcionalidades relacionadas en la aplicación. En este fragmento de código, se utiliza para comprobar la
 * validez de un token y una dirección de correo electrónico recibidos como parámetros de consulta en la URL
 * @param {Router} router: el parámetro `router` en el constructor es una instancia del servicio Angular
 * Router. Angular Router se utiliza para la navegación en aplicaciones Angular, lo que le permite
 * navegar entre diferentes componentes y rutas dentro de su aplicación.
 * @param {ToastrService} toastr: el parámetro `toastr` en el constructor es del tipo
 * `ToastrService`. Este es un servicio que proporciona métodos para mostrar notificaciones de avisos en
 * su aplicación Angular. Las notificaciones de avisos son pequeños mensajes que aparecen brevemente en la pantalla
 * para proporcionar comentarios o información al usuario.
 */
  constructor(private route: ActivatedRoute, private authUsuario: AuthUsuarioService, private router: Router, private toastr: ToastrService) {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.correo = params['correo'];
      // Aquí puedes realizar cualquier acción necesaria con los datos recibidos
    });

    if (this.token != null && this.correo != null) {
      this.authUsuario.comprobarTokenContrasena(this.token, this.correo).subscribe(
        (response) => {
          this.tokenOk = response;
          if (response == false) {
            this.router.navigate(['/notFound']);

          }
        },
        (error) => console.log(error)
      );

    } else {
      this.tokenOk = false;
      this.router.navigate(['/notFound']);
    }



  }

  /**
 * La función `cambiarContrasena` cambia la contraseña del usuario después de verificar que las nuevas
 * contraseñas coinciden.
 */
  cambiarContrasena() {
    this.loading = true;
    this.mensajeError = "";
    this.contrasenasCorrectas = true;
    this.comprobarContrasenas();

    if (this.contrasenasCorrectas) {
      this.authUsuario.cambiarContrasena(this.token, this.correo, this.contrasena1).subscribe(
        (response) => {
          this.contrasenaCambiada = true;
          this.loading = false;
          this.toastr.success("Contraseña cambiada con éxito");

        },
        (error) => {
          this.loading = false;
          this.toastr.error(error);
        }
      );
    } else this.loading = false;

  }

  /**
 * La función comprueba si dos contraseñas coinciden y tienen al menos 7 caracteres.
 */
  comprobarContrasenas() {
    if (this.contrasena1 != this.contrasena2) {
      this.contrasenasCorrectas = false;
      this.mensajeError = "Las contraseñas no conciden"
    }
    else if (this.contrasena1.length < 7 || this.contrasena2.length < 7) {
      this.contrasenasCorrectas = false;
      this.mensajeError = "La contraseña tiene que tener más de 6 carácteres"
    }
  }

  irLogin() {
    this.router.navigate([this.rutas.login]);
  }
}
