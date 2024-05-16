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
  private EquiposUsuario = new BehaviorSubject<boolean>(false);
  private RecargarEquipos = new BehaviorSubject<boolean>(false);
  private RecargarUsuarios = new BehaviorSubject<boolean>(false);
  private EsAdminEquipo = new BehaviorSubject<boolean>(false);

  // Observable que los componentes pueden suscribirse
  public mostrarEquipos$ = this.mostrarEquipos.asObservable();
  public idEquipo$ = this.idEquipo.asObservable();
  public nombreEquipo$ = this.nombreEquipo.asObservable();
  public EquiposUsuario$ = this.EquiposUsuario.asObservable();
  public RecargarEquipos$ = this.RecargarEquipos.asObservable();
  public RecargarUsuarios$ = this.RecargarUsuarios.asObservable();
  public EsAdminEquipo$ = this.EsAdminEquipo.asObservable();

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

  crearEquipo(data: any): Observable<any> {
    return this.http.post<any>(environment.url + "/api/crearEquipo", data);
  }
  borrarEquipo(data: any): Observable<any> {
    return this.http.post<any>(environment.url + "/api/borrarEquipo", data);
  }
  unirseEquipo(data: any): Observable<any> {
    return this.http.post<any>(environment.url + "/api/unirseEquipo", data);
  }
  equiposClub(data: any): Observable<any> {
    return this.http.post<any>(environment.url + "/api/equiposClub", data);
  }
  equipoPorId(data: any): Observable<any> {
    return this.http.post<any>(environment.url + "/api/equipoPorId", data);
  }
  editarEquipo(data: any): Observable<any> {
    return this.http.post<any>(environment.url + "/api/editarEquipo", data);
  }
  borrarEvento(data: any): Observable<any> {
    return this.http.post<any>(environment.url + "/api/borrarEvento", data);
  }
  jugadoresEquipo(data: any): Observable<any> {
    return this.http.post<any>(environment.url + "/api/jugadoresEquipo", data);
  }
  expulsarJugadorEquipo(data: any): Observable<any> {
    return this.http.post<any>(environment.url + "/api/expulsarJugadorEquipo", data);
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
  setEquiposUsuario(valor: boolean): void {
    this.EquiposUsuario.next(valor);
  }
  setRecargarEquipos(valor: boolean): void {
    this.RecargarEquipos.next(valor);
  }
  setRecargarUsuarios(valor: boolean): void {
    this.RecargarUsuarios.next(valor);
  }
  setEsAdminEquipo(valor: boolean): void {
    this.EsAdminEquipo.next(valor);
  }
}

