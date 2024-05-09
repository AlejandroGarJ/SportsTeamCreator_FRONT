import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompartidoService {

  private mostrarEquipos = new BehaviorSubject<boolean>(false);
  private idEquipo = new BehaviorSubject<number>(0);
  private nombreEquipo = new BehaviorSubject<string>('');

  // Observable que los componentes pueden suscribirse
  public mostrarEquipos$ = this.mostrarEquipos.asObservable();
  public idEquipo$ = this.idEquipo.asObservable();
  public nombreEquipo$ = this.nombreEquipo.asObservable();

  constructor(private http: HttpClient) { }

  obtenerEventosDeEquipo(data: any): Observable<any> {
    return this.http.post<any>(environment.url + "/api/obtenerEventosDeEquipo", data);
  }

  obtenerEventosDeClub(data: any): Observable<any> {
    return this.http.post<any>(environment.url + "/api/obtenerEventosDeClub", data);
  }

  crearEvento(data: any): Observable<any> {
    return this.http.post<any>(environment.url + "/api/crearEvento", data);
  }

  // Método para cambiar el estado
  setMostrarEquipos(valor: boolean): void {
    this.mostrarEquipos.next(valor);
  }
  setIdEquipo(valor: number): void {
    this.idEquipo.next(valor);
  }
  setNombreEquipo(valor: string): void {
    this.nombreEquipo.next(valor);
  }
}

