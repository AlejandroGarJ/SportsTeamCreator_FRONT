/* La clase AuthUsuarioService en TypeScript proporciona métodos para la autenticación de usuarios, registro,
verificación de tokens, restablecimiento de contraseñas y cambio de contraseñas. */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { SessionUsuario } from '../../Models/session.model';
@Injectable({
  providedIn: 'root'
})
export class AuthUsuarioService {

  constructor(private http: HttpClient) { }

  /**
* La función iniciarSesion toma un correo electrónico y una contraseña como parámetros, crea un objeto de cuerpo con
* estos valores y realiza una solicitud POST a una URL específica para el inicio de sesión del usuario.
* @param {string} email - El parámetro `email` es una cadena que representa la dirección de correo electrónico del
* usuario que intenta iniciar sesión.
* @param {string} contrasena - El parámetro `contrasena` es una cadena que representa la contraseña
* ingresada por el usuario durante el proceso de inicio de sesión.
* @returns La función `iniciarSesion` está devolviendo un Observable de tipo `any`. Envía una solicitud POST
* a la URL especificada con el correo electrónico y la contraseña proporcionados en el cuerpo de la solicitud.
*/
  iniciarSesion(email: string, contrasena: string): Observable<any> {

    const body = { correo: email, contrasena: contrasena };

    return this.http.post<any>(environment.url + "/api/iniciarSesion", body);
  }

  /**
 * La función "registrarUsuario" envía una solicitud POST para crear un nuevo usuario utilizando los datos proporcionados.
 * @param {any} usuario - El parámetro `usuario` en la función `registrarUsuario` es de tipo
 * `any`, lo que significa que puede aceptar cualquier tipo de dato. Se utiliza para pasar la información del usuario que necesita
 * registrarse o crearse en el sistema. 
 * @returns La función `registrarUsuario` está devolviendo un Observable de tipo `any`.
 */
  /**
 * La función `registrarUsuario` envía una solicitud POST para crear un nuevo usuario utilizando los
 * datos de usuario proporcionados.
 * @param {any} usuario - El parámetro `usuario` en la función `registrarUsuario` es de tipo
 * `any`, lo que significa que puede aceptar cualquier tipo de valor. En este caso, se utiliza para pasar los datos del usuario
 * que se necesita registrar o crear en el sistema. Estos datos pueden incluir información como
 * nombre de usuario
 * @returns La función `registrarUsuario` está devolviendo un Observable de tipo `any`. Está realizando una
 * solicitud POST a la URL especificada con los datos de `usuario` como cuerpo de la solicitud.
 */
  registrarUsuario(usuario: any): Observable<any> {

    return this.http.post<any>(environment.url + "/api/crear-usuario", usuario);

  }

  /**
 * La función `comprobarToken` envía una petición POST a un servidor para comprobar si un token determinado es válido
 * para un DNI específico.
 * @param {string} dni - El parámetro `dni` es una cadena que representa el
 * número de identificación nacional o el número de documento de una persona. Se utiliza para identificar de forma única a las personas en
 * varios sistemas o procesos.
 * @param {string} token_session - El parámetro `token_session` es una cadena que representa el
 * token de sesión asociado a la sesión de un usuario. Se utiliza para fines de autenticación y
 * autorización para validar la identidad y los permisos del usuario durante su sesión.
 * @returns Se está devolviendo un Observable<boolean>.
 */
  comprobarToken(dni: string, token_session: string): Observable<boolean> {

    const body = { dni: dni, token_session: token_session };

    return this.http.post<any>(environment.url + "/api/comprobarToken", body);
  }

  /**
  * La función `comprobarTokenContrasena` envía una solicitud POST a una URL específica con un token y
  * un correo electrónico como cuerpo de la solicitud.
  * @param {string} token: un token es una cadena única de caracteres que se utiliza para fines de autenticación y
  * autorización. A menudo, lo genera un servidor y luego lo envía a un cliente para su validación.
  * @param {string} correo: el parámetro `correo` en la función `comprobarTokenContrasena`
  * representa la dirección de correo electrónico asociada con el token que necesita ser verificado.
  * @returns La función `comprobarTokenContrasena` está devolviendo una solicitud POST a la URL especificada
  * `/api/comprobarTokenCorreo` con los valores `token` y `correo` en el cuerpo de la solicitud. El tipo de respuesta
  * es `any`, lo que significa que puede ser de cualquier tipo.
  */
  comprobarTokenContrasena(token: string, correo: string) {
    const body = { token, correo };

    return this.http.post<any>(environment.url + "/api/comprobarTokenCorreo", body);
  }

  /**
 * La función `enviarCorreoCambioContrasena` envía un correo electrónico a la dirección de correo electrónico especificada para
 * cambiar la contraseña.
 * @param {string} correo - La función `enviarCorreoCambioContrasena` toma un parámetro `correo`,
 * que es una cadena que representa la dirección de correo electrónico a la que se enviará el correo electrónico de restablecimiento de contraseña.
 * Luego, la función construye un objeto de cuerpo de solicitud con la dirección de correo electrónico y envía una solicitud POST
 * al punto final de URL especificado `/
 * @returns La función `enviarCorreoCambioContrasena` está devolviendo una solicitud POST utilizando el Angular
 * `HttpClient` para enviar un correo electrónico a la dirección de correo electrónico especificada para cambiar la contraseña.
 * La función está enviando una solicitud POST a la URL especificada `/api/enviarCorreoCambioContrasena`
 * con la dirección de correo electrónico en el cuerpo de la solicitud.
 */
  enviarCorreoCambioContrasena(correo: string) {
    const body = { correo };

    return this.http.post<any>(environment.url + "/api/enviarCorreoCambioContrasena", body);
  }

  /**
  * La función cambiarContrasena envía una solicitud POST para cambiar la contraseña de un usuario utilizando el token, el
  * correo electrónico y la nueva contraseña proporcionados.
  * @param {string} token: una cadena de token que representa el token de autenticación del usuario.
  * @param {string} correo: el parámetro `correo` en la función `cambiarContrasena` se refiere a la
  * dirección de correo electrónico del usuario para el que se está cambiando la contraseña. Se utiliza para identificar la
  * cuenta de usuario asociada con la solicitud de cambio de contraseña.
  * @param {string} contrasena: el parámetro `contrasena` en la función `cambiarContrasena` se refiere
  * a la nueva contraseña que el usuario desea establecer para su cuenta. Es un valor de cadena que
  * representa la nueva contraseña que reemplazará la contraseña actual asociada con la
  * cuenta del usuario.
  * @returns La función `cambiarContrasena` está devolviendo una solicitud POST a la URL especificada con
  * el `token`, `correo` y `contrasena` proporcionados en el cuerpo de la solicitud. La función espera una
  * respuesta de tipo `any` de la solicitud HTTP POST.
  */
  cambiarContrasena(token: string, correo: string, contrasena: string) {
    const body = { token, correo, contrasena };
    return this.http.post<any>(environment.url + "/api/cambiarContrasena", body);
  }


}
