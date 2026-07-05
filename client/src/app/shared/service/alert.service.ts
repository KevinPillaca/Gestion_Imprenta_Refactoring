import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class AlertService {

    // ALERTA DE CONFIRMACIÓN GENÉRICA
  async confirm(title: string, text: string, confirmText: string = 'Aceptar', icon: 'warning' | 'question' | 'info' = 'question') {

    return await Swal.fire({

      title,
      text,
      icon,
      
      background: '#bffbffff',
      
      showCancelButton: true,

      confirmButtonColor: '#45B653',
      cancelButtonColor: '#DC2626',

      confirmButtonText: confirmText,
      cancelButtonText: 'Cancelar'
    });
  }

  // ALERTA ÉXITO
  success(mensaje: string, titulo: string = 'Correcto') {

    Swal.fire({

      title: titulo,
      text: mensaje,
      icon: 'success',
    
      background: '#bffbffff',
        
      timer: 2300,
      showConfirmButton: false
    });
  }

  // ALERTA ERROR
  error(mensaje: string) {

    Swal.fire({

      title: 'Error',
      text: mensaje,
      icon: 'error'
    });
  }
}