import { SessionUsuario } from "../../Core/Models/session.model";

export function obtenerSessionUsuario(){

    const sessionUsuarioString = localStorage.getItem('sessionUsuario');


if (sessionUsuarioString !== null) {
    
    return JSON.parse(sessionUsuarioString);

  
} else {
    
    return false;
}

}