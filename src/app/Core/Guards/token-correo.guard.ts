/**
* La función tokenCorreoGuard es un fragmento de código TypeScript que define un guardián para la navegación
* del enrutador Angular, que inyecta el AuthUsuarioService y retorna verdadero.
* @param route - El parámetro `route` en la función `CanActivateFn` representa la ruta activada
* instantánea. Contiene información sobre la ruta, como los segmentos de URL, parámetros de consulta y
* otros datos relacionados con la ruta actual que se está activando.
* @param state - El parámetro `state` en la función `CanActivateFn` representa el estado
* actual de la ruta de la aplicación Angular. Contiene información sobre la ruta actual, como la URL,
* parámetros de ruta, parámetros de consulta y otros datos relevantes relacionados con la ruta.
* @returns El código retorna `true` al final de la función `tokenCorreoGuard`.
*/
import { CanActivateFn } from '@angular/router';
import { AuthUsuarioService } from '../Services/usuario/auth-usuario.service';
import { inject } from '@angular/core';

export const tokenCorreoGuard: CanActivateFn = (route, state) => {

  const servicio = inject(AuthUsuarioService);

  servicio

  return true;
};
