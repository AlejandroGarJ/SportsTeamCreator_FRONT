import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { obtenerSessionUsuario } from '../../shared/guardarSessionUsuario/guardarSessionUsuario';
import { SessionUsuario } from '../../Core/Models/session.model';

@Component({
  selector: 'app-dashboard-club-usuario',
  templateUrl: './dashboard-club-usuario.component.html',
  styleUrl: './dashboard-club-usuario.component.css'
})
export class DashboardClubUsuarioComponent {
  usuarioLogeado: SessionUsuario;
  id_club: number | null = null;
  nombreClub: string = "";
  constructor(private route: ActivatedRoute) {
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
      }
    });
  }

}
