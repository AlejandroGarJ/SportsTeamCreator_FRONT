import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { SessionUsuario } from '../../../Core/Models/session.model';
import { obtenerSessionUsuario } from '../../../shared/guardarSessionUsuario/guardarSessionUsuario';
import { InfoUsuarioService } from '../../../Core/Services/usuario/info-usuario.service';
import { Usuario, UsuarioInit } from '../../../Core/Models/usuario.model';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  usuarioLogeado: SessionUsuario;
  usuario: Usuario = UsuarioInit;
  modificando: boolean = false;

  constructor(private router:Router, private infoUsuario:InfoUsuarioService, private http: HttpClient){
    this.usuarioLogeado = obtenerSessionUsuario();

    this.obtenerInfoUsuario();
  }

  ngOnInit(){
   
  }


  irCambioContrasena(){
    this.router.navigate(['correo-cambio-contrasena']);
  }
  irAtras(){
    this.router.navigate(['dashboard']);
  }


  obtenerInfoUsuario(){
    this.infoUsuario.info(this.usuarioLogeado.token_session, this.usuarioLogeado.dni).subscribe(
      (response) => {
        this.usuario.nombre = response.nombre;
        this.usuario.apellidos = response.apellidos;
        this.usuario.correo = response.correo;
      }
    );
  }
 
  guardar(){
    this.modificando = true;
    if(this.usuario.nombre != "" && this.usuario.apellidos != "" && this.usuario.correo != ""){
      if(this.usuario.correo.indexOf('@') != -1){
        this.http.post<any>(environment.url+"/api/modificarUsuario", { token_session: this.usuarioLogeado.token_session, nombre: this.usuario.nombre, apellidos: this.usuario.apellidos, correo: this.usuario.correo}).subscribe(
        (response) => {
          console.log(response);
          this.modificando = false;
        },
        (error) => {
          console.log(error);
          this.modificando = false;
        }
        );
      }
    }
  }
}
