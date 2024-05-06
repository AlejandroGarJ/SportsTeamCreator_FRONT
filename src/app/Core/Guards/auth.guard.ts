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

<<<<<<< HEAD
  authUsuarioService.comprobarToken(usuarioSession.dni, usuarioSession.token_session).subscribe(
    (response) => {
      if (response) respuesta = true;
      else {
        respuesta = false;
        router.navigate(['/']);
      }
    }

  );
  return respuesta;
=======
  return authUsuarioService.comprobarToken(usuarioSession.dni, usuarioSession.token_session).pipe(
    map(response => !!response), // Transforma la respuesta en un booleano
    map(isAuthenticated => {
      if (!isAuthenticated) {
        router.navigate(['/login']); // Redirige a la página de inicio de sesión si no está autenticado
      }
      return isAuthenticated; // Devuelve true si está autenticado, false de lo contrario
    })
  );
>>>>>>> alejandro
}
