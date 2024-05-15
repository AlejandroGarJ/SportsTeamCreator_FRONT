import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompartidoService } from '../compartido.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-pop-up-crear-evento',
  templateUrl: './pop-up-crear-evento.component.html',
  styleUrl: './pop-up-crear-evento.component.css'
})
export class PopUpCrearEventoComponent {
  nombreEvento: string = "";
  fechaInicio: string = "";
  horaInicio: string = "";
  fechaFin: string = "";
  horaFin: string = "";
  descripcionEvento: string = "";
  lugarEvento: string = "";
  id_club: number | null = null;
  tipoEventoSeleccionado: string = "";
  constructor(public dialogRef: MatDialogRef<PopUpCrearEventoComponent>, @Inject(MAT_DIALOG_DATA) public datos: any, private compartido: CompartidoService, private toastr: ToastrService) {
    this.id_club = datos.id_club;
  }

  ngOnInit(): void {
    console.log(this.id_club);
  }

  crearEvento() {
    const payload = {
      id_club: this.id_club,
      titulo: this.nombreEvento,
      fechaInicio: this.fechaInicio + ' ' + this.horaInicio + ':00',
      fechaFin: this.fechaFin + ' ' + this.horaFin + ':00',
      descripcion: this.descripcionEvento,
      ubicacion: this.lugarEvento,
      tipo: this.tipoEventoSeleccionado
    };
    this.compartido.crearEvento(payload).subscribe({
      next: (res: any) => {
        this.toastr.success('Evento creado correctamente');
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
