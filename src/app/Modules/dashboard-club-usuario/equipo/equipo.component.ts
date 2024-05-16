import { Component } from '@angular/core';
import { obtenerSessionUsuario } from '../../../shared/guardarSessionUsuario/guardarSessionUsuario';
import { SessionUsuario } from '../../../Core/Models/session.model';
import { CompartidoService } from '../compartido.service';
import { ActivatedRoute } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { PopUpDetallesEventoComponent } from '../pop-up-detalles-evento/pop-up-detalles-evento.component';
import { MatDialog } from '@angular/material/dialog';
import { PopUpCrearEventoComponent } from '../pop-up-crear-evento/pop-up-crear-evento.component';
import { ClubControllerService } from '../../../Core/Services/club/club-controller.service';
import { ToastrService } from 'ngx-toastr';
import { co } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrl: './equipo.component.css'
})
export class EquipoComponent {
  usuarioLogeado: SessionUsuario;
  idEquipo: number | null = null;
  nombreEquipo: string = "";
  categoria: string = "";
  genero: string = "";
  id_club: number | null = null;
  nombreClub: string = "";
  jugadores: any[] = [];
  calendario: boolean = true;
  jugadoresEquipo: boolean = false;
  ajustesEquipo: boolean = false;
  admin: boolean = false;
  tipoEventoSeleccionado: string = "todos";

  constructor(private route: ActivatedRoute, private compartido: CompartidoService, private dialog: MatDialog, private clubService: ClubControllerService, private toastr: ToastrService) {
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
    this.compartido.generoEquipo$.subscribe(value => {
      this.genero = value;
    });
    this.compartido.categoriaEquipo$.subscribe(value => {
      this.categoria = value;
    });
    this.compartido.RecargarFrontEquipos$.subscribe(value => {
      if (value) {
        this.obtenerJugadores();
        this.eventosDeEquipo();
        this.compartido.setRecargarFrontEquipos(false);
      }
    });
  }
  mostrarEquipos() {
    this.compartido.setMostrarEquipos(false);
  }

  eventosDeEquipo() {
    this.compartido.obtenerEventosDeEquipo({ id_equipo: this.idEquipo, tipo: this.tipoEventoSeleccionado }).subscribe(
      (response) => {
        this.calendarOptions.events = response.map((evento: { titulo: any; fechaInicio: any; fechaFin: any; id: any; descripcion: any; ubicacion: any; tipo: any; }) => ({
          id: evento.id,
          title: evento.titulo,
          start: evento.fechaInicio,
          end: evento.fechaFin,
          description: evento.descripcion,
          location: evento.ubicacion,
          type: evento.tipo
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
    firstDay: 1,
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
    },

    eventClick: this.handleEventClick.bind(this),
    eventBackgroundColor: '#3788d8',
    eventBorderColor: '#3788d8',
    eventTextColor: '#ffffff',
    eventDisplay: 'block',
    eventTimeFormat: { hour: 'numeric', minute: '2-digit', omitZeroMinute: false, meridiem: 'short' },
    eventDidMount: function (info) {
      if (info.event.extendedProps['type'] === 'entrenamiento') {
        info.el.style.backgroundColor = '#3788d8';
        info.el.style.borderColor = '#3788d8';
      } else if (info.event.extendedProps['type'] === 'partido') {
        info.el.style.backgroundColor = '#d83737';
        info.el.style.borderColor = '#d83737';
      } else if (info.event.extendedProps['type'] === 'reunion') {
        info.el.style.backgroundColor = '#37d84b';
        info.el.style.borderColor = '#37d84b';
      } else {
        info.el.style.backgroundColor = '#d8b837';
        info.el.style.borderColor = '#d8b837';
      }
    }

  };
  handleEventClick(info: any) {
    const dialogRef = this.dialog.open(PopUpDetallesEventoComponent, {
      width: '50%',
      height: '50%',
      data: { idEvento: info.event.id, nombreEvento: info.event.title, fechaInicio: info.event.start, fechaFin: info.event.end, descripcionEvento: info.event.extendedProps.description, lugarEvento: info.event.extendedProps.location, tipoEventoSeleccionado: info.event.extendedProps.type, esAdmin: this.admin }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.eventosDeEquipo();
    });
  }
  crearEvento(): void {
    const dialogRef = this.dialog.open(PopUpCrearEventoComponent, {
      width: '50%',
      height: '50%',
      data: { id_equipo: this.idEquipo }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.eventosDeEquipo();
    });
  }
  obtenerEquipo() {
    this.compartido.equipoPorId({ id_equipo: this.idEquipo }).subscribe(
      (response) => {

      },
      (error) => {
        console.error("Hubo un error al intentar obtener los eventos del usuario:", error);
      }
    );
  }

  obtenerJugadores(): void {
    this.compartido.jugadoresEquipo({ id_equipo: this.idEquipo }).subscribe({
      next: (jugadores: any[]) => {
        console.log(jugadores);
        this.jugadores = jugadores.map(jugador => ({
          ...jugador,
          nombre: null, // Preparar para almacenar el nombre
          apellidos: null // Preparar para almacenar los apellidos
        }));
        this.esAdminEquipo();
        this.jugadores.forEach(jugador => this.nombreJugador(jugador));
      },

      error: (err) => {
        console.error('Error fetching clubs:', err);
      }
    });

    console.log(this.admin);
  }

  nombreJugador(jugador: any): void {
    console.log("entro");
    this.clubService.nombreJugador({ dni: jugador.dni_usuario }).subscribe({
      next: (res: any) => {
        jugador.nombre = res.nombre; // Guardar nombre directamente en el jugador
        jugador.apellidos = res.apellidos;
      },
      error: (err) => {
        console.error('Error fetching player name:', err);
      }
    });
  }
  ExpulsarJugador(dni: any) {
    if (dni === this.usuarioLogeado.dni) {
      this.toastr.error('No puedes expulsarte a ti mismo');
    } else {
      this.compartido.expulsarJugadorEquipo({ dni_usuario: dni, id_equipo: this.idEquipo }).subscribe({
        next: (res: any) => {
          this.toastr.success('Jugador expulsado correctamente');
          this.obtenerJugadores();
        },
        error: (err) => {
          console.error('Error al expulsar jugador:', err);
        }
      });
    }
  }
  esAdminEquipo() {
    for (let i = 0; i < this.jugadores.length; i++) {
      console.log(this.jugadores[i].rol);
      if (this.jugadores[i].dni_usuario === this.usuarioLogeado.dni && this.jugadores[i].rol === "Admin") {
        this.admin = true;
        break;
      }
    }
  }
  modificarEquipo() {
  }
  mostrarCalendario() {
    this.calendario = true;
    this.jugadoresEquipo = false;
    this.ajustesEquipo = false;
  }
  mostrarJugadores() {
    this.calendario = false;
    this.jugadoresEquipo = true;
    this.ajustesEquipo = false;
  }
  volverClub() {
    this.compartido.setMostrarEquipos(false);
    this.calendario = true;
    this.jugadoresEquipo = false;
    this.ajustesEquipo = false;
  }
  mostrarAjustes() {
    this.calendario = false;
    this.jugadoresEquipo = false;
    this.ajustesEquipo = true;
  }
}
