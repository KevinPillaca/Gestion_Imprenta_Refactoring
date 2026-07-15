import { Component, inject, signal,computed } from '@angular/core';
import { ClientesService } from '../../../core/services/clientes.service';
import { toObservable } from '@angular/core/rxjs-interop';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs';
import { cliente } from '../../../core/models/clientes.interface'

@Component({
  selector: 'app-clientes',
  imports: [],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent {

  private clientesService = inject(ClientesService);
  
  buscar = signal('');
  page = signal(1);
  limit = 8;

  // 1. Declaramos el recurso para cargar los productos automáticamente
  clientes = signal<cliente[]>([]);
  totalClientes = signal(0);
  totalPages = signal(0);
  totalResultados = signal(0);

  //(CONSTRUCTOR) para que se ejecute cuando inicie el componente
  constructor() {
    //Observable para pintar los reegistro
    toObservable(this.buscar)
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(buscar => this.clientesService.getClientes(buscar, this.page(), this.limit))
      )
      .subscribe(response => {
        this.clientes.set(response.data);
        this.totalPages.set(response.totalPages);
        this.totalResultados.set(response.total);
      });
    
    //Observable para pintar el total de cliente
    this.clientesService.getTotalCliente()
      .subscribe(response => {
        this.totalClientes.set(response.total);
      });
  }

  //evento actualizar el buscador
  onBuscar(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.page.set(1);
    this.buscar.set(input.value);
  }

  //Paginacion
  inicio = computed(() => {
    if (this.totalResultados() === 0) {
    return 0;
    }

    return (this.page() - 1) * this.limit + 1;
  });

  fin = computed(() => {
    return Math.min(this.page() * this.limit, this.totalResultados());
  });

  paginas = computed(() => {
    return Array.from(
      { length: this.totalPages() },
      (_, i) => i + 1
    );
  });

  cambiarPagina(page: number): void {

    if (page < 1 || page > this.totalPages()) {
      return;
    }

    this.page.set(page);

    this.clientesService
      .getClientes(this.buscar(), this.page(), this.limit)
      .subscribe(response => {

        this.clientes.set(response.data);

        this.totalPages.set(response.totalPages);

        this.totalResultados.set(response.total);

      });

  }
}
