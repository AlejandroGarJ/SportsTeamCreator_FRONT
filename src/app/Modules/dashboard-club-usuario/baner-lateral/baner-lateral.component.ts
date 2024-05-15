import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router'; // Import ActivatedRoute
import { ClubControllerService } from '../../../Core/Services/club/club-controller.service';
import { obtenerSessionUsuario } from '../../../shared/guardarSessionUsuario/guardarSessionUsuario';
import { SessionUsuario } from '../../../Core/Models/session.model';
import { CompartidoService } from '../compartido.service';
import { co } from '@fullcalendar/core/internal-common';
import { InfoUsuarioService } from '../../../Core/Services/usuario/info-usuario.service';
import { Router } from "@angular/router";

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
  fotoPerfil: any;
  apellidos: string = "";
  loadingUsuarioInfo: boolean = false;
  loadingEquipos: boolean = false;

  constructor(
    private clubService: ClubControllerService,
    private route: ActivatedRoute, private compartido: CompartidoService,
    private infoUsuario: InfoUsuarioService,
    private router: Router
  ) {
    this.usuarioLogeado = obtenerSessionUsuario();
  }

  ngOnInit(): void {
    this.loadingUsuarioInfo = true;
    this.loadingEquipos = true;
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

    this.infoUsuario.info(this.usuarioLogeado.token_session, this.usuarioLogeado.dni).subscribe(
      (info) => {
         this.fotoPerfil = info.imagen;
          this.apellidos = info.apellidos;
          this.loadingUsuarioInfo = false;
        }
    );
  }

  obtenerClubesUsuario(): void {
    if (this.id_club !== null) {
      const payload = { dni: this.usuarioLogeado, id_club: this.id_club };

      this.clubService.obtenerEquiposUsuario(payload).subscribe({
        next: (res: any) => {
          this.equipos = res;
          this.loadingEquipos = false;
        },
        error: (err) => {
          console.error('Error fetching clubs:', err);
        }
      });
    } else {
      console.error('Club ID is not available');
    }
  }

  irPerfil(){
    this.router.navigate(['/perfil']);
  }
  irDashbordPrincipal(){
    this.router.navigate(['/dashboard']);
  }

  cambiarMostrarEquipos(idEquipo: any, nombreEquipo: any) {
    this.compartido.setMostrarEquipos(true);
    this.compartido.setIdEquipo(idEquipo);
    this.compartido.setNombreEquipo(nombreEquipo);
  }
}
