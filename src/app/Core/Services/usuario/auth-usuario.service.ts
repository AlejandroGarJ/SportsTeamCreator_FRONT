import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class AuthUsuarioService {

  constructor(private http: HttpClient) { }


  iniciarSesion(email: string, contrasena: string): Observable<any> {

    const body = { correo: email, contrasena: contrasena };

    return this.http.post<any>(environment.url + "/api/iniciarSesion", body);

  }
  
  registrarUsuario(usuario: any): Observable<any> {

    return this.http.post<any>(environment.url + "/api/crear-usuario", usuario);

  }
}
