/* Esta clase TypeScript es un componente en una aplicación Angular que maneja 
la obtención de datos de usuarios y clubes, la visualización de información de
usuarios y la navegación entre diferentes vistas. */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router'; // Import ActivatedRoute
import { ClubControllerService } from '../../../Core/Services/club/club-controller.service';
import { obtenerSessionUsuario } from '../../../shared/guardarSessionUsuario/guardarSessionUsuario';
import { SessionUsuario } from '../../../Core/Models/session.model';
import { CompartidoService } from '../compartido.service';
import { InfoUsuarioService } from '../../../Core/Services/usuario/info-usuario.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-baner-lateral',
  templateUrl: './baner-lateral.component.html',
  styleUrls: ['./baner-lateral.component.css']
})
export class BanerLateralComponent implements OnInit {
  id_club: number | null = null; // Initially set to null
  nombreClub: string = "";
  usuarioLogeado: SessionUsuario;
  equipos: any;
  fotoPerfil: any;
  apellidos: string = "";
  loadingUsuarioInfo: boolean = false;
  loadingEquipos: boolean = false;
  idEquipo: number | null = null;

  /**
 * El constructor inicializa varios servicios y propiedades necesarios para el componente.
 * @param {ClubControllerService} clubService - El parámetro `clubService` es del tipo
 * `ClubControllerService` y se usa para interactuar con las funcionalidades relacionadas con el club en la
 * aplicación.
 * @param {ActivatedRoute} route - El parámetro `route` es del tipo `ActivatedRoute`, que es un
 * servicio proporcionado por Angular que le brinda acceso a información sobre una ruta asociada con un
 * componente que se carga en una salida. Le permite acceder a parámetros de ruta, parámetros de consulta,
 * y otra información relacionada con la ruta actual.
 * @param {CompartidoService} compartido - El parámetro `compartido` es una instancia de la
 * clase `CompartidoService`, que es un servicio utilizado para compartir datos y funcionalidades en
 * diferentes partes de la aplicación. Es probable que se use para almacenar y administrar datos o estados compartidos
 * a los que deben acceder varios componentes o servicios.
 * @param {InfoUsuarioService} infoUsuario - El parámetro `infoUsuario` es de tipo
 * `InfoUsuarioService` y se utiliza para proporcionar información sobre el usuario actual. Es probable que se utilice
 * para recuperar y administrar datos y configuraciones específicos del usuario dentro de la aplicación.
 * @param {Router} router - El parámetro `router` es una instancia del servicio Angular Router,
 * que proporciona capacidades de navegación y manipulación de URL para su aplicación Angular. Le
 * permite navegar entre diferentes componentes y activar eventos de navegación
 * programáticamente.
 */
  constructor(
    private clubService: ClubControllerService,
    private route: ActivatedRoute,
    public compartido: CompartidoService,
    private infoUsuario: InfoUsuarioService,
    private router: Router
  ) {
    this.usuarioLogeado = obtenerSessionUsuario();
  }

  /**
* La función `ngOnInit` inicializa las propiedades del componente, extrae el clubId de los parámetros de consulta,
* recupera los datos del club, se suscribe a los cambios en idEquipo y recupera información del usuario.
*/
  ngOnInit(): void {
    this.loadingUsuarioInfo = true;
    this.loadingEquipos = true;
    // Extrae el clubId de los parámetros de consulta
    this.route.queryParams.subscribe(params => {
      const clubId = params['clubId'];
      const clubName = params['nombreClub'];
      if (clubId) {
        this.id_club = Number(clubId); // Convertir a un número y asignar
        this.nombreClub = clubName;
        this.obtenerEquiposUsuario(); // Obtener datos del club después de obtener el clubId
      }
    });
    this.compartido.idEquipo$.subscribe(value => {
      this.idEquipo = value;
    });

    this.infoUsuario.info(this.usuarioLogeado.token_session, this.usuarioLogeado.dni).subscribe(
      (info) => {
        this.fotoPerfil = info.imagen;
        this.apellidos = info.apellidos;
        this.loadingUsuarioInfo = false;
      }
    );
  }

  /**
  * La función `obtenerEquiposUsuario` obtiene los equipos asociados a un usuario de un club si el
  * ID del club no es nulo, en caso contrario navega al panel de control.
  */
  obtenerEquiposUsuario(): void {
    if (this.id_club !== null) {
      const payload = { dni: this.usuarioLogeado, id_club: this.id_club };

      this.clubService.obtenerEquiposUsuario(payload).subscribe({
        next: (res: any) => {
          this.equipos = res;
          this.loadingEquipos = false;
        },
        error: (err) => {
          console.error('Error fetching clubs:', err);
        }
      });
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  irPerfil() {
    this.router.navigate(['/perfil']);
  }

  /**
* La función `irDashbordPrincipal` establece el ID del equipo en 0, recupera los equipos de los usuarios, navega a la
* ruta del panel, oculta los equipos y recupera los equipos de los usuarios nuevamente.
*/
  irDashbordPrincipal() {
    this.router.navigate(['/dashboard']);
    this.compartido.setIdEquipo(0);
    this.obtenerEquiposUsuario();

    this.obtenerEquiposUsuario();
    this.compartido.setMostrarEquipos(false);
  }

  /**
* La función `cambiarMostrarEquipos` establece varias propiedades de un objeto `compartido` para mostrar
* información sobre un equipo específico.
* @param {any} idEquipo - El parámetro `idEquipo` representa el ID de un equipo o grupo. Es
* probable que se use para identificar de forma única un equipo específico dentro del sistema o la aplicación.
* @param {any} nombreEquipo - El parámetro "nombreEquipo" en la función "cambiarMostrarEquipos"
* representa el nombre de un equipo. Cuando se llama a esta función, establece la
* información del equipo, como ID, nombre, género y categoría en el objeto "compartido" y activa
* @param {any} genero - El parámetro "genero" en la función "cambiarMostrarEquipos"
* representa el género de un equipo. Es probable que se use para especificar si el equipo es masculino, femenino u
* otra categoría de género.
* @param {any} categoria - El parámetro "categoria" en la función "cambiarMostrarEquipos" representa la categoría
*  del equipo. Se utiliza para establecer la categoría del equipo en el
* objeto "compartido".
*/
  cambiarMostrarEquipos(idEquipo: any, nombreEquipo: any, genero: any, categoria: any) {
    this.compartido.setMostrarEquipos(true);
    this.compartido.setIdEquipo(idEquipo);
    this.compartido.setNombreEquipo(nombreEquipo);
    this.compartido.setGenero(genero);
    this.compartido.setCategoria(categoria);
    this.compartido.setRecargarFrontEquipos(true);

  }
}
