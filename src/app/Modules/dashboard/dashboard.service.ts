import { Injectable } from '@angular/core';
import { environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { AuthUsuarioService } from '../../Core/Services/usuario/auth-usuario.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }


  searchClub(name: string, page: number): Observable<any> {

    const body = { nombre: name, page: page };
    
    return this.http.post<any>(environment.url+"/api/searchClub", body);
  }
}
