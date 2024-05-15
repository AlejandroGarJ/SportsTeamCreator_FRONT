import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompartidoService } from '../compartido.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pop-up-crear-equipo',
  templateUrl: './pop-up-crear-equipo.component.html',
  styleUrl: './pop-up-crear-equipo.component.css'
})
export class PopUpCrearEquipoComponent {
  genero: string = "";
  nombreEquipo: string = "";
  categoria: string = "";
  id_club: number | null = null;

  constructor(public dialogRef: MatDialogRef<PopUpCrearEquipoComponent>, @Inject(MAT_DIALOG_DATA) public datos: any, private compartido: CompartidoService, private toastr: ToastrService) {
    this.id_club = datos.id_club;
  }
  crearEquipo() {
    this.compartido.crearEquipo({ id_club: this.id_club, nombre: this.nombreEquipo, categoria: this.categoria, genero: this.genero }).subscribe({
      next: (res: any) => {
        this.toastr.success('Equipo creado correctamente', 'Correcto');
        this.dialogRef.close();
      },
      error: (err) => {
        console.error('Error fetching clubs:', err);
      }
    });
  }
  goBack() {
    this.dialogRef.close();
  }
}
