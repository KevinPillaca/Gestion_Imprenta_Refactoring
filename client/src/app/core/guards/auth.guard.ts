import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    return true; // Hay token, el admin de la imprenta puede pasar
  } else {
    // No hay token, lo mandamos directo al login
    router.navigate(['/login']);
    return false;
  }
};
