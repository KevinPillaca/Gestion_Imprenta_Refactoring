import { Component,model,input,inject,OnInit, output,signal} from '@angular/core';
import { Producto } from '../../../../core/models/producto.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductosService } from '../../../../core/services/productos.service';
import { AlertService } from '../../../../shared/service/alert.service';

@Component({
  selector: 'app-detalles-productos',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './detalles-productos.component.html',
  styleUrl: './detalles-productos.component.scss'
})
export class DetallesProductosComponent implements OnInit{
  
  private fb = inject(FormBuilder);
  private productosService = inject(ProductosService);
  private alertService = inject(AlertService);

  modalDetalles = model.required<boolean>();
  producto = input.required<Producto>();

  productoEditado = output<void>();

  errores = signal<Record<string, string>>({});
  errorGeneral = signal<string>('');


  //formulario (solo campos editables)
  productoForm = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    tipo_material: ['', Validators.required],
    medida: [''],
    precio: [0, Validators.required],
    categoria_id: [0, [Validators.required, Validators.min(1)]]
  });


  ngOnInit(): void {
    const datos = this.producto(); // Extraemos el producto actual
    
    //Rellenamos el formulario reactivo
    this.productoForm.patchValue({
      nombre: datos.nombre,
      tipo_material: datos.tipo_material,
      medida: datos.medida || '',
      precio: datos.precio,
      categoria_id: datos.categoria_id || 0
    });

    //congelamos los input para "Solo lectura"
    this.productoForm.disable();
  }
  
  // método es el que pide la confirmación
  async activarEdicion(): Promise<void> {
    // Lanzamos la alerta de SweetAlert2 usando tu servicio
    const confirmacion = await this.alertService.confirm(
      '¿Deseas modificar este producto?',
      'Se habilitarán los campos para que puedas editar la información.',
      'Sí, modificar',
      'question'
    );

    // Si el usuario cancela, no hacemos nada y los inputs se quedan congelados
    if (!confirmacion.isConfirmed) return;

    // Si confirma, recién habilitamos el formulario
    this.productoForm.enable();
    this.productoForm.get('categoria_id')?.disable(); // Mantenemos la categoría bloqueada
  }
  
  //método actualizar vuelve a ser directo y limpio
  actualizar(): void {

    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    const idProducto = this.producto().producto_id; 
    const datosEditados = this.productoForm.getRawValue(); 

    this.productosService.editProducto(idProducto, datosEditados).subscribe({
      next: (response) => {
        // Alerta de éxito directa cuando el backend responde
        this.alertService.success(response.message);

        this.errores.set({});
        this.errorGeneral.set('');

        this.productoEditado.emit();     // Avisamos al padre
        this.modalDetalles.set(false);   // Cerramos el modal
      },
      error: (err) => {
        console.error('Error al actualizar el producto', err);

        // A) Guardar mensaje general
        this.errorGeneral.set(err.error?.message || '');

        // B) Errores por input (Zod) provenientes del backend
        const backendErrors = err.error?.errors;

        if (Array.isArray(backendErrors)) {
          const mapped: Record<string, string> = {};
          
          backendErrors.forEach((e: any) => {
            mapped[e.campo] = e.mensaje;
          });

          this.errores.set(mapped);
          return;
        }

        // C) Error de sistema (no validación)
        this.alertService.error(
          err.error?.message || 'Error inesperado'
        );
      }
    });
  }

  //metodos para ELIMINAR (DELETE)
  async eliminar(): Promise<void> {
    // 1. Pedimos confirmación estricta antes de borrar
    const confirmacion = await this.alertService.confirm(
      '¿Estás seguro de eliminar este producto?',
      'Esta acción es permanente y no se podrá deshacer.',
      'Sí, eliminar',
      'warning' // <-- Usamos el ícono de advertencia
    );

    if (!confirmacion.isConfirmed) return;

    const idProducto = this.producto().producto_id;

    // 2. Consumimos el método del servicio para eliminar
    this.productosService.deleteProducto(idProducto).subscribe({
      next: (response) => {
        // Alerta de éxito con el mensaje del backend
        this.alertService.success(response.message || 'Producto eliminado correctamente');
        
        this.productoEditado.emit();     // Avisamos al padre para que recargue con rxResource
        this.modalDetalles.set(false);   // Cerramos el modal
      },
      error: (err) => {
        console.error('Error al eliminar el producto', err);
        this.alertService.error(
          err.error?.message || 'No se pudo eliminar el producto en este momento.'
        );
      }
    });
  }


}
