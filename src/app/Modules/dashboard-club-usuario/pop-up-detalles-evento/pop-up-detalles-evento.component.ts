import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompartidoService } from '../compartido.service';

@Component({
  selector: 'app-pop-up-detalles-evento',
  templateUrl: './pop-up-detalles-evento.component.html',
  styleUrl: './pop-up-detalles-evento.component.css'
})
export class PopUpDetallesEventoComponent {
  esAdmin: boolean = false;
  idEvento: number = 0;
  nombreEvento: string = "";
  fechaInicio: string = "";
  fechaFin: string = "";
  descripcionEvento: string = "";
  lugarEvento: string = "";
  tipoEventoSeleccionado: string = "";
  constructor(public dialogRef: MatDialogRef<PopUpDetallesEventoComponent>, @Inject(MAT_DIALOG_DATA) public datos: any, private compartido: CompartidoService) {
    this.idEvento = datos.idEvento;
    this.nombreEvento = datos.nombreEvento;
    this.fechaInicio = datos.fechaInicio;
    this.fechaFin = datos.fechaFin;
    this.descripcionEvento = datos.descripcionEvento;
    this.lugarEvento = datos.lugarEvento;
    this.tipoEventoSeleccionado = datos.tipoEventoSeleccionado;
    this.esAdmin = datos.esAdmin;
  }
  borrarEvento() {
    this.compartido.borrarEvento({ idEvento: this.datos.idEvento }).subscribe({
      next: (res: any) => {
        this.dialogRef.close();
      },
      error: (err) => {
        console.error('Error borrando evento:', err);
      }
    });

  }

  goBack() {
    this.dialogRef.close();
  }
}
