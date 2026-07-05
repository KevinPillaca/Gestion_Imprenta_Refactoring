import { Component,inject,signal} from '@angular/core';
import { ProductosService } from '../../../core/services/productos.service';
import { Producto } from '../../../core/models/producto.interface';
import { rxResource } from '@angular/core/rxjs-interop';

import { AgregarProductoComponent } from './modal-agregar-producto/agregar-producto.component';
import { DetallesProductosComponent } from './modal-detalles-productos/detalles-productos.component';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [AgregarProductoComponent,DetallesProductosComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})

export class ProductosComponent{
  
  private productoService = inject(ProductosService);
  
  // 1. Declaramos el recurso para cargar los productos automáticamente
  productos = rxResource({
    loader: () => this.productoService.getProducto()
  });
  
  //modal agregar productos(botton)
  modalAgregar = signal<boolean>(false);

  

  //metodo abrir modal (botton)
  abrirModal() : void {
    this.modalAgregar.set(true);
  }

  //actializar card

  // 2. Para actualizar las cards llamamos al método nativo reload()
  recargarProductos(): void {
    this.productos.reload();
  }


//LOGICA PARA EL BOTON EDITAR

  modalDetalles = signal<boolean>(false); 
  productoSeleccionado = signal<Producto | null>(null);

  abrirDetalles(producto: Producto): void {
    this.productoSeleccionado.set(producto);
    this.modalDetalles.set(true);
  }
  
}
