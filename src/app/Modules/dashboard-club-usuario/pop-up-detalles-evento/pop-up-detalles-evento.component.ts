import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-detalles-evento',
  templateUrl: './pop-up-detalles-evento.component.html',
  styleUrl: './pop-up-detalles-evento.component.css'
})
export class PopUpDetallesEventoComponent {
  nombreEvento: string = "";
  fechaInicio: string = "";
  fechaFin: string = "";
  descripcionEvento: string = "";
  lugarEvento: string = "";
  tipoEventoSeleccionado: string = "";
  constructor(public dialogRef: MatDialogRef<PopUpDetallesEventoComponent>, @Inject(MAT_DIALOG_DATA) public datos: any) {
    this.nombreEvento = datos.nombreEvento;
    this.fechaInicio = datos.fechaInicio;
    this.fechaFin = datos.fechaFin;
    this.descripcionEvento = datos.descripcionEvento;
    this.lugarEvento = datos.lugarEvento;
    this.tipoEventoSeleccionado = datos.tipoEventoSeleccionado;
  }


  goBack() {
    this.dialogRef.close();
  }
}
