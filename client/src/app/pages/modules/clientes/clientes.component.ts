import { Component, inject, signal,effect } from '@angular/core';
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
  totalClientes = signal(0);

  // 1. Declaramos el recurso para cargar los productos automáticamente
  clientes = signal<cliente[]>([]);
  
  //(CONSTRUCTOR) para que se ejecute cuando inicie el componente
  constructor() {
    //Observable para pintar los reegistro
    toObservable(this.buscar)
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(buscar => this.clientesService.getClientes(buscar))
      )
      .subscribe(clientes => {
        this.clientes.set(clientes);
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
    this.buscar.set(input.value);
  }


}
