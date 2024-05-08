import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { obtenerSessionUsuario } from '../../shared/guardarSessionUsuario/guardarSessionUsuario';
import { SessionUsuario } from '../../Core/Models/session.model';
import { ClubControllerService } from '../../Core/Services/club/club-controller.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CompartidoService } from './compartido.service';
import { co } from '@fullcalendar/core/internal-common';


@Component({
  selector: 'app-dashboard-club-usuario',
  templateUrl: './dashboard-club-usuario.component.html',
  styleUrl: './dashboard-club-usuario.component.css'
})
export class DashboardClubUsuarioComponent {
  mostrarEquipos: boolean = false;
  usuarioLogeado: SessionUsuario;
  id_club: number | null = null;
  nombreClub: string = "";
  rol: string = "";
  constructor(private route: ActivatedRoute, private clubService: ClubControllerService, private compartido: CompartidoService) {
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
    this.compartido.mostrarEquipos$.subscribe(value => {
      this.mostrarEquipos = value;
    });
    this.eventosDeClub();
  }
  sacarRoles() {
    this.clubService.obtenerRolesUsuario({ dni: this.usuarioLogeado, id_club: this.id_club }).subscribe({
      next: (res: any) => {
        this.rol = res;
        console.log(this.rol);
      },
      error: (err) => {
        console.error('Error fetching clubs:', err);
      }
    });
  }


  eventosDeClub() {
    this.compartido.obtenerEventosDeClub({ id_club: this.id_club }).subscribe(
      (response) => {
        this.calendarOptions.events = response.map((evento: { titulo: any; fechaInicio: any; fechaFin: any; }) => ({
          title: evento.titulo,
          start: evento.fechaInicio,
          end: evento.fechaFin
        }));

      },
      (error) => {
        console.error("Hubo un error al intentar obtener los eventos del usuario:", error);
      }
    );
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: [
      { title: 'Cumple Ruben', date: '2024-04-14' }
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    },
    locale: 'es',
    buttonText: { today: "Hoy", dayGridMonth: 'Mes', dayGridWeek: 'Semana', dayGridDay: "Dia" }, // Establece el texto del botón "Hoy" en español

    windowResize: function (arg) {
      const windowWidth = window.innerWidth;
      if (windowWidth < 1000) {
        arg.view.calendar.changeView('dayGridDay');
      } else if (windowWidth < 1445) {
        arg.view.calendar.changeView('dayGridWeek');
      } else {
        arg.view.calendar.changeView('dayGridMonth');
      }
    }
  };

  esAdmin() {
    if (this.rol === 'administrador' || this.rol === 'gestor') {
      return true;
    } else {
      return false;
    }
  }
}
