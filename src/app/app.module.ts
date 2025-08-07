/**
 * @fileoverview Módulo principal de la aplicación Boost Agency
 * 
 * Este módulo configura la aplicación Angular con todos los componentes,
 * servicios y dependencias necesarias para el funcionamiento del sitio web.
 * 
 * @author Boost Agency Development Team
 * @version 1.0.0
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { LoaderComponent } from './layout/loader/loader.component';

// Componentes de páginas
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { FormulariosComponent } from './pages/formularios/formularios.component';

// Componentes de artículos
import { Articulo1Component } from './pages/articulos/articulo1/articulo1.component';
import { Articulo2Component } from './pages/articulos/articulo2/articulo2.component';
import { Articulo3Component } from './pages/articulos/articulo3/articulo3.component';
import { Articulo4Component } from './pages/articulos/articulo4/articulo4.component';

// Componentes legales
import { PoliticaPrivacidadComponent } from './pages/legal/politica-privacidad/politica-privacidad.component';
import { TerminosServicioComponent } from './pages/legal/terminos-servicio/terminos-servicio.component';
import { PoliticaCookiesComponent } from './pages/legal/politica-cookies/politica-cookies.component';

// Componentes compartidos
import { ScrollToTopComponent } from './shared/components/scroll-to-top/scroll-to-top.component';

/**
 * Módulo raíz de la aplicación
 * 
 * Configura:
 * - Componentes principales (App, Layout, Inicio)
 * - Módulos de Angular necesarios (Browser, HttpClient, Router)
 * - Enrutamiento de la aplicación
 */
@NgModule({
  declarations: [
    AppComponent,        // Componente raíz de la aplicación
    LayoutComponent,     // Componente de layout principal
    LoaderComponent,     // Loader para pantalla de carga
    
    // Componentes de páginas
    NosotrosComponent,
    ServiciosComponent,
    ContactoComponent,
    FormulariosComponent,
    
    // Componentes de artículos
    Articulo1Component,
    Articulo2Component,
    Articulo3Component,
    Articulo4Component,
    
    // Componentes legales
    PoliticaPrivacidadComponent,
    TerminosServicioComponent,
    PoliticaCookiesComponent,
    
    // Componentes compartidos
    ScrollToTopComponent
  ],
  imports: [
    BrowserModule,       // Módulo para aplicaciones web
    AppRoutingModule,    // Configuración de rutas
    HttpClientModule,    // Para peticiones HTTP
    RouterModule,        // Funcionalidad de enrutamiento
    FormsModule,         // Para formularios template-driven
    ReactiveFormsModule, // Para formularios reactive
    CommonModule         // Para directivas comunes (ngIf, ngClass, etc.)
  ],
  providers: [],
  bootstrap: [AppComponent]  // Componente que inicia la aplicación
})
export class AppModule { }
