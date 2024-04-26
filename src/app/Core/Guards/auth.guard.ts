import { CanActivateFn } from '@angular/router';
import { AuthUsuarioService } from '../Services/usuario/auth-usuario.service';
import { inject } from '@angular/core';
import {  obtenerSessionUsuario } from '../../shared/guardarSessionUsuario/guardarSessionUsuario';
import { Router } from '@angular/router';

export const authGuard = () => {

  const router = inject(Router);
  const authUsuarioService = inject(AuthUsuarioService);
  let usuarioSession = obtenerSessionUsuario();
  let respuesta = false;

authUsuarioService.comprobarToken(usuarioSession.dni, usuarioSession.token_session).subscribe(
  (response) => {
    if(response)respuesta = true;
    else{
      respuesta = false;
      router.navigate(['/login']);
    }
  }
  
);
  return respuesta;
}
