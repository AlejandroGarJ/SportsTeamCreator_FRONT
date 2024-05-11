import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InfoUsuarioService {

  constructor(private http: HttpClient) { }
  
  info(token_session: string, dni: string){
    const body = { token_session, dni };
    return this.http.post<any>(environment.url + "/api/infoUsuario", body);
  }
}
