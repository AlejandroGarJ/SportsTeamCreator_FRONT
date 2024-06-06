/* La clase `DashboardComponent` en TypeScript es responsable de administrar la funcionalidad del 
panel de usuario, incluida la visualización de eventos, clubes, la creación y adhesión a clubes y
 el manejo de las interacciones del usuario. */
import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Router } from "@angular/router";
import { DashboardService } from "./dashboard.service";
import { Club } from '../../Core/Models/club.model';
import { ClubControllerService } from '../../Core/Services/club/club-controller.service';
import { SessionUsuario } from '../../Core/Models/session.model';
import { obtenerSessionUsuario } from '../../shared/guardarSessionUsuario/guardarSessionUsuario';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { InfoUsuarioService } from '../../Core/Services/usuario/info-usuario.service';
import { PopUpCrearEventoComponent } from '../dashboard-club-usuario/pop-up-crear-evento/pop-up-crear-evento.component';
import { MatDialog } from '@angular/material/dialog';
import { PopUpDetallesEventoComponent } from '../dashboard-club-usuario/pop-up-detalles-evento/pop-up-detalles-evento.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  clubName: string = "";
  clubs: Club[] = [];
  clubes: Club[] = [];
  mostrarClubes: boolean = false;
  pagina: number = 1;
  noHayClubes: boolean = false;
  showLoader: boolean = true;
  nombreClub: string = "";
  claveClub: string = "";
  nombreClubCrear: string = "";
  codigoAccesoCrear: string = "";
  paisCrear: string = "";
  ciudadCrear: string = "";
  usuarioLogeado: SessionUsuario;
  imagenUsuario: any;
  loadingClubs: boolean = false;
  loadingInfoUsuario: boolean = false;
  tipoEventoSeleccionado: string = "todos";
  mostrarCrearClub: boolean = false;

  ngOnInit() {
    this.eventosDeUsuario();
    this.clubesUsuario();
  }

  constructor(private router: Router,
    private dashboardService: DashboardService,
    private clubService: ClubControllerService,
    private toastr: ToastrService,
    private http: HttpClient,
    private usuarioInfo: InfoUsuarioService,
    public dialog: MatDialog

  ) {

    this.usuarioLogeado = obtenerSessionUsuario();
    this.loadingInfoUsuario = true;
    this.usuarioInfo.info(this.usuarioLogeado.token_session, this.usuarioLogeado.dni).subscribe(
      (infoUsuario) => {
        this.imagenUsuario = infoUsuario.imagen;
        this.loadingInfoUsuario = false;
      }
    );

  }

  irPerfil() {
    this.router.navigate(['/perfil'])
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.reajustarClubWrapper();
  }

  /* El código TypeScript anterior utiliza un decorador HostListener para escuchar un evento de clic en el
documento. Cuando se produce un evento de clic, se activa el método onClick. Dentro del método, verifica
si el objetivo del evento de clic no está dentro del elemento searchInput o del elemento clubWrapper. Si se cumplen las
condiciones, establece la propiedad mostrarClubes en falso, actualiza el radio del borde del
elemento searchInput, borra la matriz clubs y restablece la propiedad pagina a 1. Este código
se utiliza para controlar eventos de clic fuera de elementos específicos y realizar ciertas acciones en consecuencia. */
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {

    const clickedElement = event.target as HTMLElement;
    const searchInputElement = document.getElementById('searchInput');
    const clubWrapper = document.getElementById('clubWrapper');
    // Verificar si el clic ocurrió fuera del elemento searchInput
    if (searchInputElement && !searchInputElement.contains(clickedElement) && clubWrapper && !clubWrapper.contains(clickedElement)) {

      this.mostrarClubes = false;
      searchInputElement.style.borderBottomLeftRadius = 30 + "px";
      searchInputElement.style.borderBottomRightRadius = 30 + "px";

      this.clubs = [];
      this.pagina = 1;

    }
  }


  showCrearClub() {
    this.mostrarCrearClub = !this.mostrarCrearClub;
  }

  /**
* La función `changeNameClub` restablece la variable `pagina` a 1 y llama a la función `searchClub`
* con un parámetro `true`.
*/
  changeNameClub() {
    this.pagina = 1;
    this.searchClub(true);
  }
  /**
 * La función "cerrarSesion" elimina el elemento 'sessionUsuario' de localStorage y navega a
 * la ruta '/login'.
 */
  cerrarSesion() {
    localStorage.removeItem('sessionUsuario');
    this.router.navigate(['/login']);
  }
  /**
* La función `infiniteScroll` verifica si el usuario se ha desplazado hasta el final de la página y activa
* una búsqueda de más contenido si el número de página actual es menor que 1000.
* @param {Event} scroll - El parámetro `scroll` es un objeto Event que se pasa a la
* función `infiniteScroll`. Representa el evento de desplazamiento que se activa cuando el usuario se desplaza
* dentro de un elemento especificado. El evento `scroll` proporciona información sobre el desplazamiento
*/
  infiniteScroll(scroll: Event) {
    const target = scroll.target as HTMLElement;
    if (target.scrollTop == (target.scrollHeight - target.clientHeight)) {

      if (this.pagina != 1000) {
        this.pagina++;
        this.searchClub();
      }

    }
  }



  /**
* La función reajustarClubWrapper posiciona un elemento contenedor del club debajo de un elemento de entrada de búsqueda.
*/
  reajustarClubWrapper(): void {
    const searchInput = document.getElementById("searchInput");
    const clubWrapper = document.getElementById("clubWrapper");

    if (searchInput && clubWrapper) {
      const inputRect = searchInput.getBoundingClientRect();

      const topPosition = inputRect.top + window.scrollY + inputRect.height;
      const leftPosition = inputRect.left + window.scrollX; // Utilizamos solo la posición izquierda de searchInput

      clubWrapper.style.left = leftPosition + "px";
      clubWrapper.style.top = topPosition + "px";
      clubWrapper.style.width = inputRect.width + "px";
      searchInput.style.borderBottomLeftRadius = 0 + "px";

      clubWrapper.style.display = "block";
    }
  }

  /**
  * La función "eventosDeUsuario" recupera eventos de un usuario de un servicio y mapea los datos de respuesta
  * para actualizar las opciones del calendario.
  */
  eventosDeUsuario() {
    this.clubService.obtenerEventosUsuario({ dni: this.usuarioLogeado.dni, tipo: this.tipoEventoSeleccionado }).subscribe(
      (response) => {
        this.calendarOptions.events = response.map((evento: { titulo: any; fechaInicio: any; fechaFin: any; descripcion: any; ubicacion: any; tipo: any; id: any }) => ({
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
  /**
 * La función "crearEvento" abre una ventana de diálogo para crear un nuevo evento y actualiza la
 * lista de eventos del usuario después de cerrar el diálogo.
 */
  crearEvento() {
    const dialogRef = this.dialog.open(PopUpCrearEventoComponent, {
      width: '50%',
      height: '50%',
      data: { dni: this.usuarioLogeado.dni }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.eventosDeUsuario();
    });
  }

  /* El código anterior configura las opciones de configuración para un calendario usando la biblioteca FullCalendar
en TypeScript. Define varias propiedades como la vista inicial, los complementos, los eventos, el diseño de la barra
 de herramientas del encabezado, la configuración regional, el texto de los botones y las funciones de manejo de eventos. */
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

    //Gestionar estilos en funcion de la opcion
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

  }

  handleEventClick(info: any) {
    const dialogRef = this.dialog.open(PopUpDetallesEventoComponent, {
      width: '50%',
      height: '50%',
      data: { idEvento: info.event.id, nombreEvento: info.event.title, fechaInicio: info.event.start, fechaFin: info.event.end, descripcionEvento: info.event.extendedProps.description, lugarEvento: info.event.extendedProps.location, tipoEventoSeleccionado: info.event.extendedProps.type, esAdmin: true }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.eventosDeUsuario();
    });

  }

  /**
  * La función `unirseAClub` envía una solicitud para unirse a un club y maneja la respuesta en consecuencia.
  */
  unirseAClub() {
    this.clubService.unirseClub({ nombre: this.nombreClub, codigoAcceso: this.claveClub, dni: this.usuarioLogeado.dni, token_session: this.usuarioLogeado.token_session }).subscribe(
      (response) => {
        if (response["unirseExito"] === true) {
          this.toastr.success('Se ha unido al club exitosamente');
          this.nombreClub = "";
          this.claveClub = "";
          this.clubesUsuario();
        } else {
          this.toastr.error('Error al unirse al club');
        }
      },
      (error) => {
        console.error("Hubo un error al intentar unirse al club:", error);
      }
    );
  }

  /**
* La función `crearClub` crea un nuevo club enviando una solicitud al servicio del club con
* parámetros específicos y maneja la respuesta en consecuencia.
*/
  crearClub() {
    this.clubService.crearClub({ nombre: this.nombreClubCrear, codigoAcceso: this.codigoAccesoCrear, localizacion: (this.ciudadCrear + ", " + this.paisCrear), dni: this.usuarioLogeado.dni }).subscribe(
      (response: any) => {
        if (response === true) {
          this.toastr.success('Club creado exitosamente');
          this.nombreClubCrear = "";
          this.codigoAccesoCrear = "";
          this.paisCrear = "";
          this.ciudadCrear = "";
          this.clubesUsuario();
        } else {
          this.toastr.error('Error al crear el club');
        }
      },
      (error) => {
        console.error("Hubo un error al intentar unirse al club:", error);
      }
    );
  }

  /**
 * La función `showWrapperClub` ajusta el estilo de un elemento de entrada de búsqueda y establece un indicador booleano
 * en verdadero antes de llamar a otra función después de una breve demora.
 */
  showWrapperClub() {
    const searchInput = document.getElementById("searchInput");
    if (searchInput != null) searchInput.style.borderBottomRightRadius = 0 + "px";
    this.mostrarClubes = true;
    setTimeout(() => {
      this.reajustarClubWrapper();
    }, 100); // 100 milisegundos de retraso


    ;
  }

  /**
  * La función `searchClub` en TypeScript busca clubes y maneja la paginación y carga de
  * indicadores.
  * @param {boolean} [overrideClub=false] - El parámetro `overrideClub` en la función `searchClub`
  * es un parámetro booleano que determina si se debe reemplazar la lista existente de clubes con los nuevos
  * datos o concatenar los nuevos datos con la lista existente. Si `overrideClub` está configurado como `true`, la
  * propiedad `clubs` será
  */
  searchClub(overrideClub: boolean = false) {

    this.dashboardService.searchClub(this.clubName, this.pagina).subscribe(
      (response) => {

        if (this.pagina <= response.last_page) {
          if (this.pagina != 1000) {

            if (overrideClub == true) {
              this.clubs = response.data;
            } else this.clubs = this.clubs.concat(response.data);

            this.showWrapperClub();
          }
        } else {
          this.pagina = 1000;
        }
        if (this.pagina >= response.last_page) {
          this.showLoader = false;

          const loadingContainer = document.getElementById("loaderContainer");

          if (loadingContainer != null) {
            loadingContainer.style.display = 'none';
          }

        }
        else {
          const loadingContainer = document.getElementById("loaderContainer");

          if (loadingContainer != null) {
            loadingContainer.style.display = 'flex';
          } this.showLoader = true;

        }

      })
  }
  /**
 * La función `clubesUsuario` recupera los clubes asociados a un usuario y gestiona la carga y los
 * estados de error.
 */
  clubesUsuario() {
    this.loadingClubs = true;
    this.clubService.obtenerClubes({ dni: this.usuarioLogeado.dni }).subscribe(
      (response) => {
        this.clubes = response;
        this.loadingClubs = false;
      },
      (error) => {
        console.error("Hubo un error al intentar obtener los clubes del usuario:", error);
      }
    );
  }

}


