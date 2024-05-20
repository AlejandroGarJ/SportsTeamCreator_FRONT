import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompartidoService } from '../compartido.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pop-up-editar-equipo',
  templateUrl: './pop-up-editar-equipo.component.html',
  styleUrl: './pop-up-editar-equipo.component.css'
})
export class PopUpEditarEquipoComponent {
  genero: string = "";
  nombreEquipo: string = "";
  categoria: string = "";
  id_eqipo: number | null = null;
  constructor(public dialogRef: MatDialogRef<PopUpEditarEquipoComponent>, @Inject(MAT_DIALOG_DATA) public datos: any, private compartido: CompartidoService, private toastr: ToastrService) {
    this.id_eqipo = datos.id_eqipo;
  }
  ngOnInit(): void {
    this.compartido.equipoPorId({ id_equipo: this.id_eqipo }).subscribe({
      next: (res: any) => {
        this.genero = res.genero;
        this.nombreEquipo = res.nombre;
        this.categoria = res.categoria;
      },
      error: (err) => {
        console.error('Error fetching clubs:', err);
      }
    });
  }
  guardarEquipo() {
    this.compartido.editarEquipo({ id_equipo: this.id_eqipo, nombre: this.nombreEquipo, categoria: this.categoria, genero: this.genero }).subscribe({
      next: (res: any) => {
        this.toastr.success('Equipo editado correctamente', 'Correcto');
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
