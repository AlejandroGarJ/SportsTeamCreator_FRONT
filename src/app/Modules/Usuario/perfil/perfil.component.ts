
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { SessionUsuario } from '../../../Core/Models/session.model';
import { obtenerSessionUsuario } from '../../../shared/guardarSessionUsuario/guardarSessionUsuario';
import { InfoUsuarioService } from '../../../Core/Services/usuario/info-usuario.service';
import { Usuario, UsuarioInit } from '../../../Core/Models/usuario.model';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  usuarioLogeado: SessionUsuario;
  usuario: Usuario = UsuarioInit;
  modificando: boolean = false;
  imagen: any = "";
  constructor(private router: Router, private infoUsuario: InfoUsuarioService, private http: HttpClient, private toastr: ToastrService, private location: Location) {
    this.usuarioLogeado = obtenerSessionUsuario();

    this.obtenerInfoUsuario();
  }

  ngOnInit() {

  }
  irCambioContrasena() {
    this.router.navigate(['correo-cambio-contrasena']);
  }
  irAtras() {
    this.location.back();
  }

  /* Obtiene la informacion que se ha guardado en local storage mediante una funcion compartida */
  obtenerInfoUsuario() {
    this.infoUsuario.info(this.usuarioLogeado.token_session, this.usuarioLogeado.dni).subscribe(
      (response) => {
        this.usuario.nombre = response.nombre;
        this.usuario.apellidos = response.apellidos;
        this.usuario.correo = response.correo;
      }
    );
  }

  /* Confirmar los cambios y los guarda en la base de datos, si no se ha modificado nada salta toaster de error */
  guardar() {
    this.modificando = true;
    if (this.usuario.nombre != "" && this.usuario.apellidos != "" && this.usuario.correo != "") {
      if (this.usuario.correo.indexOf('@') != -1) {
        console.log(this.imagen);
        this.http.post<any>(environment.url + "/api/modificarUsuario", {
          token_session: this.usuarioLogeado.token_session,
          nombre: this.usuario.nombre,
          apellidos: this.usuario.apellidos,
          correo: this.usuario.correo,
          dni: this.usuarioLogeado.dni,
          imagen: this.imagen
        }).subscribe(
          (response) => {
            console.log(response);
            if (response === "ok") {
              this.toastr.success("Usuario modificado correctamente");
              this.usuarioLogeado.nombre = this.usuario.nombre;
              localStorage.setItem('sessionUsuario', JSON.stringify(this.usuarioLogeado));
            } else {
              this.toastr.error("Error al modificar el usuario");
              this.obtenerInfoUsuario();
            }
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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        this.imagen = base64String;

      };

      reader.readAsDataURL(file);
    }

  }

}
