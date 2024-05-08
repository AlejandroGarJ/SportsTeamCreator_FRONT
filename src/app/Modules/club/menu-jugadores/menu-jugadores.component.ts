import { Component } from '@angular/core';
import { ClubControllerService } from '../../../Core/Services/club/club-controller.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-jugadores',
  templateUrl: './menu-jugadores.component.html',
  styleUrls: ['./menu-jugadores.component.css']
})
export class MenuJugadoresComponent {
  id_club: Number | null = null;
  nombreClub: string = "";
  jugadores: any[] = [];
  nombre: string = "";

  constructor(private clubService: ClubControllerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const clubId = params['clubId'];
      const clubName = params['nombreClub'];
      if (clubId) {
        this.id_club = Number(clubId);
        this.nombreClub = clubName;
      }
    });
    this.obtenerJugadores();
  }

  obtenerJugadores(): void {
    this.clubService.obtenerJugadores({ id_club: this.id_club }).subscribe({
      next: (jugadores: any[]) => {
        this.jugadores = jugadores.map(jugador => ({
          ...jugador,
          nombre: null // Preparar para almacenar el nombre
        }));
        this.jugadores.forEach(jugador => this.nombreJugador(jugador));
      },
      error: (err) => {
        console.error('Error fetching clubs:', err);
      }
    });
  }

  nombreJugador(jugador: any): void {
    this.clubService.nombreJugador({ dni: jugador.dni }).subscribe({
      next: (res: any) => {
        jugador.nombre = res.nombre; // Guardar nombre directamente en el jugador
      },
      error: (err) => {
        console.error('Error fetching player name:', err);
      }
    });
  }
}
