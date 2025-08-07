import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor() { }

  /**
   * Scroll suave a un elemento específico
   * @param elementId - ID del elemento al que hacer scroll
   * @param offset - Offset adicional (opcional)
   */
  smoothScrollTo(elementId: string, offset: number = 0): void {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }

  /**
   * Scroll suave a la parte superior de la página
   */
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  /**
   * Scroll suave a una sección específica
   * @param sectionId - ID de la sección
   */
  scrollToSection(sectionId: string): void {
    this.smoothScrollTo(sectionId, 80); // Offset para el header
  }

  /**
   * Obtener la posición actual del scroll
   */
  getScrollPosition(): number {
    return window.pageYOffset || document.documentElement.scrollTop;
  }

  /**
   * Verificar si un elemento está visible en el viewport
   * @param element - Elemento a verificar
   * @param threshold - Umbral de visibilidad (0-1)
   */
  isElementInViewport(element: HTMLElement, threshold: number = 0.1): boolean {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    return (
      rect.top <= windowHeight * (1 - threshold) &&
      rect.bottom >= windowHeight * threshold
    );
  }

  /**
   * Añadir animaciones de scroll a elementos
   * @param selector - Selector CSS de los elementos
   * @param className - Clase CSS para la animación
   */
  addScrollAnimations(selector: string, className: string = 'scroll-fade-in'): void {
    const elements = document.querySelectorAll(selector);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
      element.classList.add(className);
      observer.observe(element);
    });
  }

  /**
   * Inicializar todas las animaciones de scroll
   */
  initScrollAnimations(): void {
    // Animaciones para secciones principales
    this.addScrollAnimations('.animate-on-scroll', 'scroll-fade-in');
    
    // Animaciones para cards y elementos
    this.addScrollAnimations('.card, .service-card, .testimonial-card');
    
    // Animaciones para textos
    this.addScrollAnimations('h1, h2, h3', 'scroll-fade-in');
  }

  /**
   * Añadir efecto parallax a elementos
   * @param selector - Selector CSS de los elementos
   * @param speed - Velocidad del efecto parallax
   */
  addParallaxEffect(selector: string, speed: number = 0.5): void {
    window.addEventListener('scroll', () => {
      const elements = document.querySelectorAll(selector);
      const scrolled = window.pageYOffset;
      
      elements.forEach(element => {
        const elementTop = (element as HTMLElement).offsetTop;
        const elementHeight = (element as HTMLElement).offsetHeight;
        
        if (scrolled + window.innerHeight > elementTop && scrolled < elementTop + elementHeight) {
          const yPos = -(scrolled - elementTop) * speed;
          (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
        }
      });
    });
  }

  /**
   * Crear un botón de "Volver arriba" dinámico
   */
  createScrollToTopButton(): void {
    // Verificar si ya existe el botón
    if (document.getElementById('scroll-to-top-btn')) {
      return;
    }

    const button = document.createElement('button');
    button.id = 'scroll-to-top-btn';
    button.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    `;
    button.className = 'fixed bottom-6 right-6 z-50 bg-[#f05f02] text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:bg-[#d04e01] hover:scale-110 opacity-0 pointer-events-none';
    
    document.body.appendChild(button);

    // Mostrar/ocultar botón según el scroll
    window.addEventListener('scroll', () => {
      const scrollPosition = this.getScrollPosition();
      
      if (scrollPosition > 300) {
        button.classList.remove('opacity-0', 'pointer-events-none');
        button.classList.add('opacity-100');
      } else {
        button.classList.add('opacity-0', 'pointer-events-none');
        button.classList.remove('opacity-100');
      }
    });

    // Evento click para volver arriba
    button.addEventListener('click', () => {
      this.scrollToTop();
    });
  }

  /**
   * Inicializar todos los efectos de scroll
   */
  init(): void {
    this.initScrollAnimations();
    this.createScrollToTopButton();
    
    // Añadir efecto parallax a elementos específicos (opcional)
    // this.addParallaxEffect('.parallax-element', 0.3);
  }
}
