import { Component } from '@angular/core';
import { ClubControllerService } from '../../../Core/Services/club/club-controller.service';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { ToastrService } from 'ngx-toastr';
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
  constructor(private route: ActivatedRoute, private clubService: ClubControllerService, private toastr: ToastrService) {

  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const clubId = params['id_club'];
      if (clubId) {
        this.id_club = Number(clubId);
        this.obtenerDatosClub();
      }
      console.log('Club ID:', this.id_club);

    }
    );
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
        if (res = true) {
          this.toastr.success('Club modificado correctamente');
        } else {
          this.toastr.error('Error al modificar el club');
        }
      },
      error: (err) => {
        console.error('Error fetching clubs:', err);
      }
    });
  }
}
