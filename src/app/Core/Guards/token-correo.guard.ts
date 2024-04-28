import { CanActivateFn } from '@angular/router';
import { AuthUsuarioService } from '../Services/usuario/auth-usuario.service';
import { inject } from '@angular/core';

export const tokenCorreoGuard: CanActivateFn = (route, state) => {

  const servicio = inject(AuthUsuarioService);

  servicio

  return true;
};
