import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Router } from "@angular/router";
import { DashboardService } from "./dashboard.service";
import { Club } from '../../Core/Models/club.model';
import { ClubControllerService } from '../../Core/Services/club/club-controller.service';
import { SessionUsuario } from '../../Core/Models/session.model';
import { obtenerSessionUsuario } from '../../shared/guardarSessionUsuario/guardarSessionUsuario';
import { co } from '@fullcalendar/core/internal-common';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { InfoUsuarioService } from '../../Core/Services/usuario/info-usuario.service';

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

  ngOnInit() {
    console.log(this.usuarioLogeado.token_session);
    this.eventosUsuario();
    this.clubesUsuario();
   
    

  }

  constructor(private router: Router,
              private dashboardService: DashboardService,
              private clubService: ClubControllerService, 
              private toastr: ToastrService, 
              private http: HttpClient,
              private usuarioInfo: InfoUsuarioService
            
    ) {

    this.usuarioLogeado = obtenerSessionUsuario();

    this.usuarioInfo.info(this.usuarioLogeado.token_session, this.usuarioLogeado.dni).subscribe(
    (infoUsuario) => {
      this.imagenUsuario = infoUsuario.imagen;
    }
    );

  }

  irPerfil() { this.router.navigate(['/perfil']) }

  seeName() {

    console.log(this.usuarioLogeado.nombre);
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.reajustarClubWrapper();
  }

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

  changeNameClub() {
    this.pagina = 1;
    this.searchClub(true);
  }

  infiniteScroll(scroll: Event) {
    const target = scroll.target as HTMLElement;
    if (target.scrollTop == (target.scrollHeight - target.clientHeight)) {

      if (this.pagina != 1000) {
        this.pagina++;
        this.searchClub();
      }

    }
  }



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


  eventosUsuario() {
    this.clubService.obtenerEventosUsuario({ dni: this.usuarioLogeado.dni }).subscribe(
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


  unirseAClub() {
    this.clubService.unirseClub({ nombre: this.nombreClub, codigoAcceso: this.claveClub, dni: this.usuarioLogeado.dni, token_session: this.usuarioLogeado.token_session }).subscribe(
      (response) => {
        console.log(response);
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

  crearClub() {
    this.clubService.crearClub({ nombre: this.nombreClubCrear, codigoAcceso: this.codigoAccesoCrear, localizacion: (this.ciudadCrear + ", " + this.paisCrear), dni: this.usuarioLogeado.dni }).subscribe(
      (response: any) => {
        console.log(response);
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



  showWrapperClub() {
    const searchInput = document.getElementById("searchInput");
    if (searchInput != null) searchInput.style.borderBottomRightRadius = 0 + "px";
    this.mostrarClubes = true;
    setTimeout(() => {
      this.reajustarClubWrapper();
    }, 100); // 100 milisegundos de retraso


    ;
  }

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
        console.log(response);
        console.log(this.pagina);
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
  clubesUsuario() {
    console.log(this.usuarioLogeado.dni);
    this.clubService.obtenerClubes({ dni: this.usuarioLogeado.dni }).subscribe(
      (response) => {
        console.log(response);
        this.clubes = response;
        console.log(this.clubes);
      },
      (error) => {
        console.error("Hubo un error al intentar obtener los clubes del usuario:", error);
      }
    );
  }

}


