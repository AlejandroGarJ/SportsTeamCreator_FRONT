import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompartidoService {

  private mostrarEquipos = new BehaviorSubject<boolean>(false);
  public idEquipo = new BehaviorSubject<number>(0);
  private nombreEquipo = new BehaviorSubject<string>('');
  private generoEquipo = new BehaviorSubject<string>('');
  private categoriaEquipo = new BehaviorSubject<string>('');
  private RecargarFrontEquipos = new BehaviorSubject<boolean>(false);

  // Observable que los componentes pueden suscribirse
  public mostrarEquipos$ = this.mostrarEquipos.asObservable();
  public idEquipo$ = this.idEquipo.asObservable();
  public nombreEquipo$ = this.nombreEquipo.asObservable();
  public generoEquipo$ = this.generoEquipo.asObservable();
  public categoriaEquipo$ = this.categoriaEquipo.asObservable();
  public RecargarFrontEquipos$ = this.RecargarFrontEquipos.asObservable();

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
  infoEquipo(data: any): Observable<any> {
    return this.http.post<any>(environment.url + "/api/infoEquipo", data);
  }
  expulsarUsuario(data: any): Observable<any> {
    return this.http.post<any>(environment.url + "/api/expulsarUsuario", data);
  }
  borrarClub(data: any): Observable<any> {
    return this.http.post<any>(environment.url + "/api/borrarClub", data);
  }
  setMostrarEquipos(valor: boolean): void {
    this.mostrarEquipos.next(valor);
  }
  setIdEquipo(valor: number): void {
    this.idEquipo.next(valor);
  }
  setNombreEquipo(valor: string): void {
    this.nombreEquipo.next(valor);
  }
  setGenero(valor: string): void {
    this.generoEquipo.next(valor);
  }
  setCategoria(valor: string): void {
    this.categoriaEquipo.next(valor);
  }
  setRecargarFrontEquipos(valor: boolean): void {
    this.RecargarFrontEquipos.next(valor);
  }
}

