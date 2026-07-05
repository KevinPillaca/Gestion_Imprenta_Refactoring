import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  // 1. Obtenemos el token desde el localStorage
  const token = localStorage.getItem('token');
  
  // 2. Si el token existe, clonamos la petición y le añadimos la cabecera de autorización
  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    // Pasamos la petición clonada con el token integrado
    return next(clonedReq);
  }

  // 3. Si no hay token (como en el endpoint de /login), la petición sigue su curso normal
  return next(req);
  
};
