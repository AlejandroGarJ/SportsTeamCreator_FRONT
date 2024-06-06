/**
* La función `authGuard` en TypeScript se utiliza para verificar si un usuario está autenticado en base a un token
* y la información de la sesión, redireccionando a la página de inicio de sesión si no está autenticado.
* @returns La función `authGuard` está devolviendo un Observable que verifica si el usuario está
* autenticado llamando al método `comprobarToken` desde `AuthUsuarioService`. Si el usuario está
* autenticado, devuelve `true`, de lo contrario redirecciona a la página de inicio de sesión y devuelve `false`.
*/
import { AuthUsuarioService } from '../Services/usuario/auth-usuario.service';
import { inject } from '@angular/core';
import { obtenerSessionUsuario } from '../../shared/guardarSessionUsuario/guardarSessionUsuario';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export const authGuard = () => {
  const router = inject(Router);
  const authUsuarioService = inject(AuthUsuarioService);
  const usuarioSession = obtenerSessionUsuario();

  return authUsuarioService.comprobarToken(usuarioSession.dni, usuarioSession.token_session).pipe(
    map(response => !!response), // Transforma la respuesta en un booleano
    map(isAuthenticated => {
      if (!isAuthenticated) {
        router.navigate(['/login']); // Redirige a la página de inicio de sesión si no está autenticado
      }
      return isAuthenticated; // Devuelve true si está autenticado, false de lo contrario
    })
  );
}
