import { Component } from '@angular/core';
import { ClubControllerService } from '../../../Core/Services/club/club-controller.service';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { info } from 'console';
import { co } from '@fullcalendar/core/internal-common';


@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrl: './menu-admin.component.css'
})
export class MenuAdminComponent {
  id_club: Number | null = null;
  nombreClub: string = "";
  codigoAcceso: string = "";
  localizacion: string = "";
  constructor(private route: ActivatedRoute, private clubService: ClubControllerService,) {

  }
  ngOnInit(): void {
    this.id_club = 40;
    console.log('Club ID:', this.id_club);

    this.obtenerDatosClub();
  }

  obtenerDatosClub(): void {
    if (this.id_club !== null) {
      const payload = { id_club: this.id_club };

      this.clubService.obtenerDatosClub(payload).subscribe({
        next: (res: any) => {
          console.log(res);
          this.nombreClub = res.nombre;
          this.codigoAcceso = res.codigoAcceso;
          this.localizacion = res.localizacion;
        },
        error: (err) => {
          console.error('Error fetching clubs:', err);
        }
      });
    } else {
      console.error('Club ID is not available');
    }
  }
  modificarClub(): void {
    const payload = {
      id_club: this.id_club,
      nombre: this.nombreClub,
      codigoAcceso: this.codigoAcceso,
      localizacion: this.localizacion
    };
    this.clubService.modificarClub(payload).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err) => {
        console.error('Error fetching clubs:', err);
      }
    });
  }
}
