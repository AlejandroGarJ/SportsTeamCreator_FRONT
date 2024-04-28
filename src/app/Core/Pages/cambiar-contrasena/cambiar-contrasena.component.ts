import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthUsuarioService } from '../../Services/usuario/auth-usuario.service';
import { Router } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private authUsuario: AuthUsuarioService,private router: Router){
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
            console.log("Respuesta = "+response);
          }
        } ,      
        (error) =>  console.log(error)
      );

    }else{
      this.tokenOk = false;
      this.router.navigate(['/notFound']);
    }
   
    console.log(this.tokenOk);
  
    
  }

  ngOnInit(){

    

  }

  cambiarContrasena(){
    this.mensajeError = "";
    this.contrasenasCorrectas = true;
    this.comprobarContrasenas();

    if(this.contrasenasCorrectas){
     
    }
    console.log(this.tokenOk);
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

 
}
