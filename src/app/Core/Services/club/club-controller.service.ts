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
}
