import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClubControllerService } from '../../../Core/Services/club/club-controller.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { CompartidoService } from '../../dashboard-club-usuario/compartido.service';



@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrl: './menu-admin.component.css'
})
export class MenuAdminComponent2 {
  idEquipo: number | null = null;
  nombreEquipo: string = "";
  categoria: string = "";
  genero: string = "";

  constructor(private route: ActivatedRoute, private clubService: ClubControllerService, private toastr: ToastrService, private location: Location, private compartido: CompartidoService) {

  }
  ngOnInit(): void {
    this.compartido.idEquipo$.subscribe(value => {
      this.idEquipo = value;
    });
    this.obtenerDatosEquipo();
  }

  obtenerDatosEquipo(): void {
    if (this.idEquipo !== null) {
      const payload = { id_equipo: this.idEquipo };

      this.clubService.obtenerDatosEquipo(payload).subscribe({
        next: (res: any) => {
          console.log(res);
          this.nombreEquipo = res.nombre;
          this.categoria = res.categoria;
          this.genero = res.genero;
        },
        error: (err) => {
          console.error('Error fetching Equipos:', err);
        }
      });
    } else {
      console.error('Club ID is not available');
    }
  }
  modificarEquipo(): void {
    const payload = {
      id_equipo: this.idEquipo,
      nombre: this.nombreEquipo,
      categoria: this.categoria,
      genero: this.genero
    };
    this.clubService.modificarEquipo(payload).subscribe({
      next: (res: any) => {
        if (res = true) {
          this.toastr.success('Equipo modificado correctamente');
        } else {
          this.toastr.error('Error al modificar el equipo');
        }
      },
      error: (err) => {
        console.error('Error fetching Equipos:', err);
      }
    });
  }
  goBack(): void {
    this.location.back();
  }
}
