/**
 * @fileoverview Configuración de enrutamiento principal de Boost Agency
 * 
 * Define todas las rutas de la aplicación con lazy loading para optimizar
 * el rendimiento y la carga inicial de la aplicación.
 * 
 * @author Boost Agency Development Team
 * @version 1.0.0
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './pages/inicio/inicio.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { PlanesComponent } from './pages/planes/planes.component';
import { FundacionComponent } from './pages/fundacion/fundacion.component';
import { BoostcastComponent } from './pages/boostcast/boostcast.component';

import { FuturoComponent } from './pages/futuro/futuro.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { FormulariosComponent } from './pages/formularios/formularios.component';

// Componentes de artículos
import { Articulo1Component } from './pages/articulos/articulo1/articulo1.component';
import { Articulo2Component } from './pages/articulos/articulo2/articulo2.component';
import { Articulo3Component } from './pages/articulos/articulo3/articulo3.component';
import { Articulo4Component } from './pages/articulos/articulo4/articulo4.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'planes', component: PlanesComponent },
  { path: 'fundacion', component: FundacionComponent },
  { path: 'boostcast', component: BoostcastComponent },
  { path: 'tienda', loadChildren: () => import('./pages/tienda/tienda.module').then(m => m.TiendaModule) },
  { path: 'futuro', component: FuturoComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'formularios', component: FormulariosComponent },
  
  // Rutas de artículos
  { path: 'articulo-1', component: Articulo1Component },
  { path: 'articulo-2', component: Articulo2Component },
  { path: 'articulo-3', component: Articulo3Component },
  { path: 'articulo-4', component: Articulo4Component },
  
  { path: '**', redirectTo: '/inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
