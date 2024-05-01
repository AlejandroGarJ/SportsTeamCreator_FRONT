import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {Router} from "@angular/router";
import {DashboardService} from "./dashboard.service";
import { Club } from '../../Core/Models/club.model';
import { ClubControllerService } from '../../Core/Services/club/club-controller.service';
import { response } from 'express';
import { SessionUsuario } from '../../Core/Models/session.model';
import { obtenerSessionUsuario } from '../../shared/guardarSessionUsuario/guardarSessionUsuario';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  clubName:string = "";
  clubs: Club[]=[];
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
  ngOnInit(){
   
    console.log(this.usuarioLogeado.token_session);

  }
  constructor(private router: Router, private dashboardService: DashboardService, private clubService: ClubControllerService) {


   this.usuarioLogeado = obtenerSessionUsuario();
   

  
   
   }

   seeName(){

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
    if (searchInputElement && !searchInputElement.contains(clickedElement) && clubWrapper && !clubWrapper.contains(clickedElement) ) {
   
      this.mostrarClubes = false;
      searchInputElement.style.borderBottomLeftRadius = 30 + "px";
      searchInputElement.style.borderBottomRightRadius = 30 + "px";
      
      this.clubs = [];
      this.pagina = 1;
      
    }
  }

  changeNameClub(){
    this.pagina = 1;
    this.searchClub(true);
  }

  infiniteScroll(scroll: Event){
    const target = scroll.target as HTMLElement;
    if(target.scrollTop == (target.scrollHeight - target.clientHeight)){

      if(this.pagina != 1000){
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


  unirseAClub(){
    this.clubService.unirseClub({ nombre: this.nombreClub, codigoAcceso: this.claveClub, dni: this.usuarioLogeado.dni, token_session: this.usuarioLogeado.token_session }).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error("Hubo un error al intentar unirse al club:", error);
      }
    );
  }

  crearClub(){
    this.clubService.crearClub({nombre: this.nombreClubCrear, codigoAcceso: this.codigoAccesoCrear, localizacion: (this.ciudadCrear+", "+this.paisCrear), dni: this.usuarioLogeado.dni }).subscribe(
      (response: any) => {
        if (response === false) {
          console.log("Club creado exitosamente.");
        } else {
          console.log("No se pudo crear el club.");
        }
      },
      (error) => {
        console.error("Hubo un error al intentar unirse al club:", error);
      }
    );
  }
  


  showWrapperClub() {
    const searchInput = document.getElementById("searchInput");
    if(searchInput != null) searchInput.style.borderBottomRightRadius = 0 + "px";
    this.mostrarClubes = true;
    setTimeout(() => {
      this.reajustarClubWrapper();
    }, 100); // 100 milisegundos de retraso


;   
  }

  searchClub(overrideClub: boolean = false){

    this.dashboardService.searchClub(this.clubName, this.pagina).subscribe(
      (response) => {

        if(this.pagina <= response.last_page){
          if(this.pagina != 1000){
           
          if(overrideClub == true){
            this.clubs = response.data;
          }else this.clubs = this.clubs.concat(response.data);
        
          this.showWrapperClub();
          }
        }else{
          this.pagina = 1000;
        }
        console.log(response);
        console.log(this.pagina);
        if(this.pagina >= response.last_page){
          this.showLoader = false;
          
          const loadingContainer = document.getElementById("loaderContainer");

          if(loadingContainer != null){
            loadingContainer.style.display = 'none';
          }
          
        } 
        else{
          const loadingContainer = document.getElementById("loaderContainer");

          if(loadingContainer != null){
            loadingContainer.style.display = 'flex';
        } this.showLoader = true;

      }
       
      })
  }

  
}


