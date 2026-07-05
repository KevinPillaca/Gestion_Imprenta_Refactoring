import { Component,model,signal, inject,output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule,Validators } from '@angular/forms';
import { ProductosService } from '../../../../core/services/productos.service';
import { AlertService } from '../../../../shared/service/alert.service';
import { Categoria } from '../../../../core/models/producto.interface';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-agregar-producto',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agregar-producto.component.html',
  styleUrl: './agregar-producto.component.scss'
})
export class AgregarProductoComponent {

  private productoService = inject(ProductosService);
  private fb = inject(FormBuilder);
  private alertService = inject(AlertService);
  
  // Recibe la sincronización del padre. 
  modalAgregar = model.required<boolean>();

  // cargar la categorias
  categorias = rxResource({
    loader: () => this.productoService.getCategoria()
  });

  cerrarModal(): void{
    this.modalAgregar.set(false);
  }


  //creamos el formulario 
  productoForm = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    tipo_material: ['', Validators.required],
    medida: [''],
    precio: [0, Validators.required],
    categoria_id: [0, Validators.required]
  });


  //guardar la imagen selecionada en el backend 

  imagenSeleccionada = signal<File | null>(null);

  seleccionarImagen(event: Event): void {
  const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.imagenSeleccionada.set(input.files[0]);
       //console.log(this.imagenSeleccionada());
    }
  }
  
  //signal (para guardar producto)
  errores = signal<Record<string, string>>({});
  errorGeneral = signal<string>('');

  productoCreado = output<void>();
  
 //metodo guardar producto
  public guardarProducto(): void {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    //Crear el objeto FormData y unir producto con imagen.
    const producto = this.productoForm.getRawValue();
    const imagen = this.imagenSeleccionada();

    const formData = new FormData();

    formData.append('nombre', producto.nombre);
    formData.append('tipo_material', producto.tipo_material);
    formData.append('medida', producto.medida);
    formData.append('precio', producto.precio.toString());
    formData.append('categoria_id', producto.categoria_id.toString());

    if (imagen) {
      formData.append('imagen', imagen);
    }

    //comunicar al service para guardar(post)
   this.productoService.createProducto(formData)
    .subscribe({

      next: (response) => {

        this.alertService.success(response.message);
        this.productoForm.reset();
        this.errores.set({});
        this.errorGeneral.set('');
        this.modalAgregar.set(false);
        this.productoCreado.emit();
      },

      error: (err) => {

       // 1. guardar mensaje general
        this.errorGeneral.set(err.error?.message || '');

       // 2. errores por input (Zod)
        const backendErrors = err.error?.errors;

        if (Array.isArray(backendErrors)) {

          const mapped: Record<string, string> = {};

          backendErrors.forEach((e: any) => {
            mapped[e.campo] = e.mensaje;
          });

          this.errores.set(mapped);
          return;
        }

       // 3. error sistema (no validación)
        this.alertService.error(
          err.error?.message || 'Error inesperado'
        );

      }

    });

  }
}