import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-crear-evento',
  templateUrl: './pop-up-crear-evento.component.html',
  styleUrl: './pop-up-crear-evento.component.css'
})
export class PopUpCrearEventoComponent {
  nombreEvento: string = "";
  fechaInicio: string = "";
  fechaFin: string = "";
  descripcionEvento: string = "";
  lugarEvento: string = "";
  constructor(public dialogRef: MatDialogRef<PopUpCrearEventoComponent>) { }

  goBack() {
    this.dialogRef.close();
  }
}
