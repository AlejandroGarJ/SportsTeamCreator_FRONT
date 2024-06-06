/* La clase InfoUsuarioService en TypeScript es un servicio Angular que realiza una solicitud POST para
recuperar información del usuario usando HttpClient. */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InfoUsuarioService {

  constructor(private http: HttpClient) { }

  /**
  * La función `info` envía una solicitud POST a una URL especificada con un token de sesión y DNI como
  * parámetros.
  * @param {string} token_session - Una cadena que representa el token de sesión para fines de
  * autenticación.
  * @param {string} dni - El parámetro "dni" significa "Documento Nacional de Identidad". 
  * Es un número o documento de identificación que se usa para identificar
  * de manera única a las personas, similar al número de la seguridad social en algunos países.
  * @returns La función `info` está devolviendo una solicitud POST a la URL especificada `/api/infoUsuario`
  * con los parámetros `token_session` y `dni` en el cuerpo de la solicitud. El tipo de respuesta es `any`,
  * lo que significa que puede ser de cualquier tipo de datos.
  */
  info(token_session: string, dni: string) {
    const body = { token_session, dni };
    return this.http.post<any>(environment.url + "/api/infoUsuario", body);
  }

}
