/* La clase EquipoComponent en TypeScript es responsable de administrar las funcionalidades relacionadas con el equipo
como mostrar eventos en un calendario, manejar información de los jugadores y permitir que los administradores del equipo
realicen ajustes. */
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
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

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
  admin: boolean = true;
  tipoEventoSeleccionado: string = "todos";
  showLoaderCalendario: boolean = true;
  showLoaderJugadores: boolean = true;
  showLoaderAjustes: boolean = true;
  constructor(private route: ActivatedRoute, private compartido: CompartidoService, private dialog: MatDialog, private clubService: ClubControllerService, private toastr: ToastrService, private http: HttpClient) {
    this.usuarioLogeado = obtenerSessionUsuario();

  }

  /**
 * La función `ngOnInit` en TypeScript inicializa las propiedades de los componentes en función de los parámetros de consulta
 * y se suscribe a los observables para actualizar la información del equipo.
 */
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

  /**
 * La función `eventosDeEquipo` recupera los eventos del equipo según el ID del equipo y el tipo de evento, y llena un
 * calendario con los datos recuperados.
 */
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
        this.showLoaderCalendario = false;
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

  /**
* La función `handleEventClick` abre una ventana de diálogo con detalles de un evento en el que se hizo clic y
* actualiza la lista de eventos del equipo después de cerrar el diálogo.
* @param {any} info - El parámetro `info` en la función `handleEventClick` parece contener
* información sobre el evento en el que se hizo clic. Probablemente incluya detalles como el ID del evento,
* título, fechas de inicio y finalización, descripción, ubicación, tipo y si el usuario es administrador. Esta
* información es entonces
*/
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

  /**
* La función "crearEvento" abre una ventana de diálogo para crear un nuevo evento y actualiza la lista de
* eventos de un equipo después de cerrar el diálogo.
*/
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

  /**
* La función "obtenerJugadores" obtiene jugadores para un equipo, prepara su estructura de datos, verifica
* si el usuario es administrador del equipo, recupera el nombre del jugador y oculta el cargador una vez que la
* operación se completa.
*/
  obtenerJugadores(): void {
    this.compartido.jugadoresEquipo({ id_equipo: this.idEquipo }).subscribe({
      next: (jugadores: any[]) => {
        this.jugadores = jugadores.map(jugador => ({
          ...jugador,
          nombre: null, // Preparar para almacenar el nombre
          apellidos: null, // Preparar para almacenar los apellidos
          imagen: null // Preparar para almacenar la imagen
        }));
        this.esAdminEquipo();
        this.jugadores.forEach(jugador => this.nombreJugador(jugador));
        this.showLoaderJugadores = false;
      },

      error: (err) => {
        console.error('Error fetching clubs:', err);
      }
    });
  }

  /**
 * La función `nombreJugador` obtiene el nombre, apellido e imagen de un jugador de un servicio basado en
 * el ID del jugador y los asigna al objeto jugador.
 * @param {any} jugador - El parámetro `jugador` en la función `nombreJugador` representa
 * un objeto jugador. Contiene información sobre un jugador, como su ID (`dni_usuario`),
 * nombre, apellidos e imagen.
 */
  nombreJugador(jugador: any): void {
    this.clubService.nombreJugador({ dni: jugador.dni_usuario }).subscribe({
      next: (res: any) => {
        jugador.nombre = res.nombre; // Guardar nombre directamente en el jugador
        jugador.apellidos = res.apellidos;
        jugador.imagen = res.imagen;
      },
      error: (err) => {
        console.error('Error fetching player name:', err);
      }
    });
  }

  /**
* La función ExpulsarJugador verifica si el ID del jugador proporcionado coincide con el ID del usuario conectado,
* y si no, procede a expulsar al jugador del equipo y muestra los mensajes correspondientes.
* @param {any} dni - El parámetro `dni` en la función `ExpulsarJugador`significa
* "Documento Nacional de Identidad", que es un número de identificación único utilizado en algunos países.
* Se utiliza para identificar a un jugador específico en este contexto.
*/
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

  /**
* La función `esAdminEquipo` verifica si el usuario conectado es un administrador o un usuario regular de un equipo
* según su rol y establece las propiedades `admin` y `comprobacionAdmin` según corresponda.
*/
  esAdminEquipo() {
    for (let i = 0; i < this.jugadores.length; i++) {
      if (this.jugadores[i].dni_usuario === this.usuarioLogeado.dni && this.jugadores[i].rol === "Admin") {
        this.admin = true;
        break;
      } else if (this.jugadores[i].dni_usuario === this.usuarioLogeado.dni && this.jugadores[i].rol === "Usuario") {
        this.admin = false;
        break;
      }
    }
  }

  /**
* La función `cambiarRolEquipo` cambia el rol de un usuario en un equipo mediante una petición HTTP POST.
* @param {any} dni_usuario - El parámetro `dni_usuario` en la función `cambiarRolEquipo` 
* representa el número de identificación del usuario. Este parámetro se utiliza para identificar al usuario cuyo
* rol en un equipo se está cambiando.
* @param {Event} event - El parámetro `event` en la función `cambiarRolEquipo` es de tipo
* `Event`. Se utiliza para capturar el evento que dispara la función, como un evento de cambio en un
* elemento select. En esta función, se utiliza para acceder al elemento de destino (elemento select
*/
  cambiarRolEquipo(dni_usuario: any, event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    const body = { dni_usuario: dni_usuario, rol: selectedValue, id_equipo: this.idEquipo };
    this.http.post<any>(environment.url + "/api/cambiarRolEquipo", body).subscribe(
      () => this.toastr.success("Rol cambiado con éxito")
    );
  }

  /**
* La función `cambiarFuncionEquipo` toma el ID de un usuario, un evento y cambia la función de un
* jugador en un equipo según el valor seleccionado en un menú desplegable.
* @param {string} dni_usuario - El parámetro `dni_usuario` en la función `cambiarFuncionEquipo`
* representa el número de identificación del usuario. Es probable que sea un identificador único para el usuario
* dentro del sistema. Este parámetro se utiliza para identificar al usuario cuya función de equipo se está
* cambiando en la función.
* @param {Event} event - El parámetro `event` en la función `cambiarFuncionEquipo` es de tipo
* `Event`. Es un objeto de evento que representa un evento que ocurre en el DOM, como un clic,
* una pulsación de tecla o un evento de cambio. En esta función, se utiliza para obtener el
*/
  cambiarFuncionEquipo(dni_usuario: string, event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    const body2 = { dni_usuario: dni_usuario, funcion: selectedValue, id_equipo: this.idEquipo };
    this.http.post<any>(environment.url + "/api/cambiarFuncionEquipo", body2).subscribe(
      (response) => {
        if (response = "Ok") { this.toastr.success("Funcion cambiada con éxito") } else { this.toastr.error("Error al cambiar la función del jugador") }
      }
    );
  }

  /**
* La función `cambiarDorsalEquipo` toma el ID de un usuario y el evento de entrada, recupera el valor dorsal
* del elemento de entrada, envía una solicitud POST para cambiar el dorsal de un miembro del equipo y muestra un
* mensaje de éxito usando Toastr.
* @param {any} dni_usuario - El parámetro `dni_usuario` es el número de identificación del usuario
* al que se le va a cambiar el dorsal en un equipo.
* @param {Event} event - El parámetro `event` en la función `cambiarDorsalEquipo` es de tipo
* `Event`. Normalmente es un objeto de evento que representa un evento que ocurre en el DOM, como
* un evento de clic o un evento de entrada. En esta función, se utiliza para acceder al
*/
  cambiarDorsalEquipo(dni_usuario: any, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const dorsal = inputElement.value;
    const body3 = { dni_usuario: dni_usuario, dorsal: dorsal, id_equipo: this.idEquipo };
    this.http.post<any>(environment.url + "/api/cambiarDorsalEquipo", body3).subscribe(
      () => this.toastr.success("Dorsal cambiado con éxito")
    );
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
    this.compartido.setIdEquipo(0);
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
