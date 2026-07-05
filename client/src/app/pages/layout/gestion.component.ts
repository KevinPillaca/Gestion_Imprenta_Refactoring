import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-gestion',
  imports: [RouterOutlet,SidebarComponent],
  templateUrl: './gestion.component.html',
  styleUrl: './gestion.component.scss'
})
export class GestionComponent {

  titulo: string = 'Bienvenido'; 

  constructor(private router: Router) {
    // Detectar cambios en la ruta
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const url = this.router.url;

        if (url.includes('/gestion/productos')) {
          this.titulo = 'Productos';
        } else if (url.includes('/gestion/cotizacion')) {
          this.titulo = 'Cotización';
        } else if (url.includes('/gestion/clientes')) {
          this.titulo = 'Clientes';
        } else if (url.includes('/gestion/cobranzas')) {
          this.titulo = 'Cobranzas';
        } else if (url.includes('/gestion/contabilidad')) {
          this.titulo = 'Contabilidad';
        } else {
          this.titulo = 'Bienvenido';
        }
      });
  }
  
}
