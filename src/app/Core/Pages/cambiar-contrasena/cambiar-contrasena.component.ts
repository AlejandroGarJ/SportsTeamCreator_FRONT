import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthUsuarioService } from '../../Services/usuario/auth-usuario.service';
import { Router } from '@angular/router';
import { rutas } from '../../../../environments/environment';
import { SessionUsuario } from '../../Models/session.model';
import { obtenerSessionUsuario } from '../../../shared/guardarSessionUsuario/guardarSessionUsuario';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrl: './cambiar-contrasena.component.css'
})
export class CambiarContrasenaComponent {

  token: string = "";
  correo: string = "";
  contrasena1: string = "";
  contrasena2: string = "";
  contrasenasCorrectas: boolean = false;
  mensajeError = "";
  tokenOk: boolean = false;
  rutas = rutas;
  loading = false;
  contrasenaCambiada = false;

  constructor(private route: ActivatedRoute, private authUsuario: AuthUsuarioService,private router: Router, private toastr: ToastrService){
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.correo = params['correo'];
      // Aquí puedes realizar cualquier acción necesaria con los datos recibidos
    });

    if(this.token != null && this.correo != null){
      this.authUsuario.comprobarTokenContrasena(this.token, this.correo).subscribe(
        (response) =>{
          this.tokenOk = response;
          if(response == false){
            this.router.navigate(['/notFound']);
           
          }
        } ,      
        (error) =>  console.log(error)
      );

    }else{
      this.tokenOk = false;
      this.router.navigate(['/notFound']);
    }
   
  
 
  }

  ngOnInit(){
  }
  
  cambiarContrasena(){
    this.loading = true;
    this.mensajeError = "";
    this.contrasenasCorrectas = true;
    this.comprobarContrasenas();

    if(this.contrasenasCorrectas){
      this.authUsuario.cambiarContrasena(this.token, this.correo, this.contrasena1).subscribe(
        (response) => {
          this.contrasenaCambiada = true;
          this.loading = false;
          this.toastr.success("Contraseña cambiada con éxito");
          
        },
        (error) => {
          this.loading = false;
          this.toastr.error(error);
        }
      );
    }else this.loading = false;
    
  }
  comprobarContrasenas(){
    if(this.contrasena1 != this.contrasena2){
      this.contrasenasCorrectas = false;
      this.mensajeError = "Las contraseñas no conciden"
    } 
    else if(this.contrasena1.length < 7 || this.contrasena2.length < 7) {
      this.contrasenasCorrectas = false;
      this.mensajeError = "La contraseña tiene que tener más de 6 carácteres"
    }
  }

  irLogin(){
    this.router.navigate([this.rutas.login]);
  }
}
