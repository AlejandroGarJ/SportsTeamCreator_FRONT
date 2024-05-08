import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { obtenerSessionUsuario } from '../../shared/guardarSessionUsuario/guardarSessionUsuario';
import { SessionUsuario } from '../../Core/Models/session.model';
import { ClubControllerService } from '../../Core/Services/club/club-controller.service';
import { co } from '@fullcalendar/core/internal-common';


@Component({
  selector: 'app-dashboard-club-usuario',
  templateUrl: './dashboard-club-usuario.component.html',
  styleUrl: './dashboard-club-usuario.component.css'
})
export class DashboardClubUsuarioComponent {
  mostarEquipos: boolean = false;
  usuarioLogeado: SessionUsuario;
  id_club: number | null = null;
  nombreClub: string = "";
  rol: string = "";
  constructor(private route: ActivatedRoute, private clubService: ClubControllerService,) {
    this.usuarioLogeado = obtenerSessionUsuario();
  }

  ngOnInit(): void {
    // Extract the clubId from the query parameters
    this.route.queryParams.subscribe(params => {
      const clubId = params['clubId'];
      const clubName = params['nombreClub'];
      if (clubId) {
        this.id_club = Number(clubId);
        this.nombreClub = clubName;
      }
    });
    this.sacarRoles();
  }
  sacarRoles() {
    this.clubService.obtenerRolesUsuario({ dni: this.usuarioLogeado, id_club: this.id_club }).subscribe({
      next: (res: any) => {
        this.rol = res;
      },
      error: (err) => {
        console.error('Error fetching clubs:', err);
      }
    });
  }
}
