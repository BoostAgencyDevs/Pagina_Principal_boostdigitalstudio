/**
 * @fileoverview Componente raíz de la aplicación Boost Agency
 * 
 * Este componente actúa como punto de entrada de la aplicación,
 * configurando el layout principal y el router outlet para la navegación.
 * 
 * @author Boost Agency Development Team
 * @version 1.0.0
 */

import { Component, OnInit } from '@angular/core';
import { ScrollService } from './shared/services/scroll.service';

/**
 * Componente raíz de la aplicación
 * 
 * Funcionalidad:
 * - Proporciona el layout principal de la aplicación
 * - Configura el router outlet para la navegación entre páginas
 * - Define el título de la aplicación
 * - Inicializa servicios de scroll y animaciones
 */
@Component({
  selector: 'app-root',  // Selector CSS para usar en el DOM
  template: `
    <app-layout>
      <router-outlet></router-outlet>
    </app-layout>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  /** Título de la aplicación */
  title = 'BOOST AGENCY';

  constructor(private scrollService: ScrollService) {}

  ngOnInit(): void {
    // Inicializar efectos de scroll después de que la aplicación esté lista
    setTimeout(() => {
      this.scrollService.init();
    }, 100);
  }
}
