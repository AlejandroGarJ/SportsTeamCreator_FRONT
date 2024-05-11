import { Component } from '@angular/core';
import { obtenerSessionUsuario } from '../../../shared/guardarSessionUsuario/guardarSessionUsuario';
import { SessionUsuario } from '../../../Core/Models/session.model';
import { CompartidoService } from '../compartido.service';
import { ActivatedRoute } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

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
    this.eventosDeEquipo();
  }
  mostrarEquipos() {
    this.compartido.setMostrarEquipos(false);
  }

  eventosDeEquipo() {
    this.compartido.obtenerEventosDeEquipo({ id_equipo: this.idEquipo }).subscribe(
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

}
