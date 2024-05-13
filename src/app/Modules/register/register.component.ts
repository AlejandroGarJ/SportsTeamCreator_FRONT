import { Component } from '@angular/core';
import { AuthUsuarioService } from '../../Core/Services/usuario/auth-usuario.service';
import { DateAdapter } from '@angular/material/core';
import { environment, rutas } from '../../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { File } from 'buffer';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  dni: string = "";
  email: string = "";
  nombre: string = "";
  apellidos: string = "";
  fechaNacimiento: Date = new Date();
  genero: string = "";
  contrasena2: string = "";
  contrasena: string = "";
  contrasenaMal: boolean = false;
  emailMal: boolean = false;
  mensajeErrorEmail: string = "";
  mensajeErrorContrasena: string = "";
  formatoCorrecto: boolean = true;
  rutas = rutas;
  imagen: any = null;
  comprobandoRegister: boolean = false;
  archivoSeleccionado: File | null = null;
  //Form
  form: FormGroup;
  constructor(private authUsuario: AuthUsuarioService,
              private dateAdapter: DateAdapter<Date>,
              private router: Router, 
              private http: HttpClient,
              private formBuilder: FormBuilder,
              private toastr: ToastrService) {
    this.dateAdapter.setLocale('es');
    //Form initialize
    this.form = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      fecha: ['', [Validators.required, this.validarFormatoFecha()]],
      genero: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(7)]]


    });
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

validarFormatoFecha(): Validators {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/; // Expresión regular para el formato YYYY-MM-DD

    if (control.value && !fechaRegex.test(control.value)) {
      return { 'formatoFechaInvalido': true };
    }

    return null;
  };
}

reordenarFecha(){
  this.form.value.fecha = this.form
}



onSubmit(){
  console.log("hola");
  if(this.form.valid){
    this.form.value.imagen = this.imagen;
    this.http.post<any>(environment.url + "/api/crear-usuario", this.form.value).subscribe(
      () => {
        this.toastr.success("Te registraste con éxito");
        this.irALogin();
      },
      () => {
        this.toastr.error("Asegurate de que el correo o el dni sean correctos");
      }
    );
  }
  else{
    console.log(this.form.value);
  }
}

  irALogin(){
    this.router.navigate([this.rutas.login]);
  }
  
}
