import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AlertService } from '../../shared/service/alert.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  constructor(private router: Router, private alertService: AlertService, private authService: AuthService) {}

//Funcion Cerrar Sesion 
  async cerrarSesion() {

    const result = await this.alertService.confirm('¿Cerrar sesión?','Tu sesión actual se cerrará.','Sí, cerrar','warning');

    if (result.isConfirmed) {

      //Limpiar sesión
      this.authService.logout();

      // Mensaje éxito
      this.alertService.success('Has cerrado sesión correctamente.','Sesión cerrada');

      //Redirección
      setTimeout(() => { this.router.navigate(['/login']);}, 1800);
    }
  }

}
