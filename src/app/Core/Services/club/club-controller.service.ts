import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClubControllerService {

  constructor(private http: HttpClient) { }

  unirseClub(data: any): Observable<any> {
    return this.http.post<any>(environment.url + "/api/unirseAClub", data);
  }

  crearClub(data: any): Observable<any> {
    return this.http.post<any>(environment.url + "/api/crearClub", data);
  }

  obtenerClubes(data: any): Observable<any> {
    return this.http.post<any>(environment.url + "/api/clubesUsuario", data);
  }

  obtenerEventosUsuario(data: any): Observable<any> {
    return this.http.post<any>(environment.url + "/api/obtenerEventosDeUsuario", data);
  }

  obtenerEquiposUsuario(data: any): Observable<any> {
    return this.http.post<any>(environment.url + "/api/equiposUsuario", data);
  }
  obtenerRolesUsuario(data: any): Observable<any> {
    return this.http.post<any>(environment.url + "/api/getRoles", data);
  }
  obtenerDatosClub(data: any): Observable<any> {
    return this.http.post<any>(environment.url + "/api/datosClub", data);
  }
  modificarClub(data: any): Observable<any> {
    return this.http.post<any>(environment.url + "/api/modificarClub", data);
  }

  obtenerJugadores(data: any): Observable<any> {
    return this.http.post<any>(environment.url + "/api/jugadoresClub", data);
  }
  nombreJugador(data: any): Observable<any> {
    return this.http.post<any>(environment.url + "/api/nombreJugador", data);
  }
  obtenerDatosEquipo(data: any): Observable<any> {
    return this.http.post<any>(environment.url + "/api/obtenerDatosEquipo", data);
  }
  modificarEquipo(data: any): Observable<any> {
    return this.http.post<any>(environment.url + "/api/modificarEquipo", data);
  }
}
