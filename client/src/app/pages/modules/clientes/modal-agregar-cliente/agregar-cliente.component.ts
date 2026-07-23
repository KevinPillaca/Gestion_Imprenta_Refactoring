import { Component,model,signal,inject,output } from '@angular/core';
import { FormBuilder,ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateCliente } from '../../../../core/models/clientes.interface';
import { ClientesService } from '../../../../core/services/clientes.service';
import { AlertService } from '../../../../shared/service/alert.service';


@Component({
  selector: 'app-agregar-cliente',
  imports: [ReactiveFormsModule],
  templateUrl: './agregar-cliente.component.html',
  styleUrl: './agregar-cliente.component.scss'
})
export class AgregarClienteComponent {

  private clienteService = inject(ClientesService);
  private fb = inject(FormBuilder);
  private alertServicio = inject(AlertService);

  // Recibe la sincronización del padre. 
  modalAgregar = model.required<boolean>();

  clienteForm = this.fb.nonNullable.group({
    nombre_razon_social: ['', Validators.required],
    ruc_dni: ['', Validators.required],
    telefono: ['', Validators.required],
    correo: ['', Validators.required],
    direccion: ['', Validators.required],
    departamento: ['', Validators.required],
  });

  //metodo guardar producto

  clienteCreado = output<void>();
  errores = signal<Record<string, string>>({});
  errorGeneral = signal<string>('');
  
  public guardarCliente():void{
    
    if (this.clienteForm.invalid) {
      this.clienteForm.markAllAsTouched();
      return;
    }

    const cliente: CreateCliente = this.clienteForm.getRawValue();
    
    //comunicar al service para guardar(post)
    this.clienteService.createClientes(cliente)
    .subscribe({

      next: (response) => {

        this.alertServicio.success(response.message);

        // Limpiar formulario
        this.clienteForm.reset();

        // Cerrar modal
        this.modalAgregar.set(false);

        // Avisar al componente padre
        this.clienteCreado.emit();

      },

      error: (err) => {

        // 1. Mensaje general
        this.errorGeneral.set(err.error?.message || '');
        
        // 2. Errores de validación de Zod
        const backendErrors = err.error?.errors;

        if (Array.isArray(backendErrors)) {

          const mapped: Record<string, string> = {};

          backendErrors.forEach((e: any) => {
            mapped[e.campo] = e.mensaje;
          });

          this.errores.set(mapped);

          return;
        }

        // 3. Error del sistema
        this.alertServicio.error(
          err.error?.message || 'Error inesperado'
        );
      }

    });
  };


}
