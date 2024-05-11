import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { ClubControllerService } from '../../../Core/Services/club/club-controller.service';
import { obtenerSessionUsuario } from '../../../shared/guardarSessionUsuario/guardarSessionUsuario';
import { SessionUsuario } from '../../../Core/Models/session.model';
import { CompartidoService } from '../compartido.service';
import { co } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-baner-lateral',
  templateUrl: './baner-lateral.component.html',
  styleUrls: ['./baner-lateral.component.css']
})
export class BanerLateralComponent implements OnInit {
  id_club: number | null = null; // Initially set to null
  nombreClub: string = "";
  usuarioLogeado: SessionUsuario;
  equipos: any;

  constructor(
    private clubService: ClubControllerService,
    private route: ActivatedRoute, private compartido: CompartidoService
  ) {
    this.usuarioLogeado = obtenerSessionUsuario();
  }

  ngOnInit(): void {
    // Extract the clubId from the query parameters
    this.route.queryParams.subscribe(params => {
      const clubId = params['clubId'];
      const clubName = params['nombreClub'];
      if (clubId) {
        this.id_club = Number(clubId); // Convert to a number and assign
        this.nombreClub = clubName;
        this.obtenerClubesUsuario(); // Fetch club data after getting clubId
      }
    });
  }

  obtenerClubesUsuario(): void {
    if (this.id_club !== null) {
      const payload = { dni: this.usuarioLogeado, id_club: this.id_club };

      this.clubService.obtenerEquiposUsuario(payload).subscribe({
        next: (res: any) => {
          this.equipos = res;
          console.log(res);
        },
        error: (err) => {
          console.error('Error fetching clubs:', err);
        }
      });
    } else {
      console.error('Club ID is not available');
    }
  }

  cambiarMostrarEquipos(idEquipo: any, nombreEquipo: any) {
    this.compartido.setMostrarEquipos(true);
    this.compartido.setIdEquipo(idEquipo);
    this.compartido.setNombreEquipo(nombreEquipo);
  }
}
