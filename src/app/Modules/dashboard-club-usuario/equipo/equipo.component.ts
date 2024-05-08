import { Component } from '@angular/core';
import { obtenerSessionUsuario } from '../../../shared/guardarSessionUsuario/guardarSessionUsuario';
import { SessionUsuario } from '../../../Core/Models/session.model';
import { CompartidoService } from '../compartido.service';
import { co } from '@fullcalendar/core/internal-common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrl: './equipo.component.css'
})
export class EquipoComponent {
  usuarioLogeado: SessionUsuario;
  idEquipo: number | null = null;
  nombreEquipo: string = "";
  id_club: number | null = null;
  nombreClub: string = "";

  constructor(private route: ActivatedRoute, private compartido: CompartidoService) {
    this.usuarioLogeado = obtenerSessionUsuario();

  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const clubId = params['clubId'];
      const clubName = params['nombreClub'];
      if (clubId) {
        this.id_club = Number(clubId);
        this.nombreClub = clubName;
      }
    });
    this.compartido.idEquipo$.subscribe(value => {
      this.idEquipo = value;
    });
    this.compartido.nombreEquipo$.subscribe(value => {
      this.nombreEquipo = value;
    });
    console.log(this.idEquipo);
  }
  mostrarEquipos() {
    this.compartido.setMostrarEquipos(false);
  }

}
