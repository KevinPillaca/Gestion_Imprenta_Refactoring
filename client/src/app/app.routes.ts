import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { GestionComponent } from './pages/layout/gestion.component';
import { authGuard } from './core/guards/auth.guard';
import { ClientesComponent } from './pages/modules/clientes/clientes.component';
import { ProductosComponent } from './pages/modules/productos/productos.component';
import { CotizacionComponent } from './pages/modules/cotizacion/cotizacion.component';
import { CobranzasComponent } from './pages/modules/cobranzas/cobranzas.component';
import { ContabilidadComponent } from './pages/modules/contabilidad/contabilidad.component';


export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { 
    path: 'gestion', component:GestionComponent,
    canActivate: [authGuard],
    children: [
      { path: 'productos', component: ProductosComponent },
      { path: 'cotizacion', component: CotizacionComponent },
      { path: 'clientes', component: ClientesComponent },
      { path: 'cobranzas', component: CobranzasComponent },
      { path: 'contabilidad', component: ContabilidadComponent },
    ]
  },


  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirección inicial
  { path: '**', redirectTo: 'login' }, // Comodín por si escribes mal la URL
  
];
