import { Component } from '@angular/core';

@Component({
  selector: 'app-fundacion',
  templateUrl: './fundacion.component.html',
  styleUrls: ['./fundacion.component.css']
})
export class FundacionComponent {
  activeTab: string = 'introduccion';
  private audioContext: AudioContext | null = null;

  constructor() {
    // Inicializar Web Audio API
    this.initAudio();
  }

  // Inicializar el sistema de audio
  private initAudio() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.log('Web Audio API no disponible');
    }
  }

  // Método para reproducir sonido de gota elegante
  playElegantSound() {
    if (!this.audioContext) {
      this.initAudio();
      return;
    }

    try {
      // Crear oscilador principal para el sonido de gota
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      // Crear filtro para simular gota de agua
      const filter = this.audioContext.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.audioContext.currentTime);
      filter.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + 0.3);
      filter.Q.setValueAtTime(0.8, this.audioContext.currentTime);
      
      // Configurar el sonido de gota elegante
      oscillator.type = 'sine'; // Sonido puro como gota
      oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime); // Frecuencia inicial
      oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1); // Caída de la gota
      oscillator.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + 0.2); // Impacto
      oscillator.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.3); // Resonancia
      
      // Configurar el volumen como gota de agua
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.15, this.audioContext.currentTime + 0.02); // Impacto inicial
      gainNode.gain.exponentialRampToValueAtTime(0.08, this.audioContext.currentTime + 0.08); // Decay rápido
      gainNode.gain.exponentialRampToValueAtTime(0.02, this.audioContext.currentTime + 0.15); // Sustain suave
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.4); // Fade out largo
      
      // Conectar los nodos para simular gota
      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      // Reproducir el sonido de gota elegante
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.4);
      
    } catch (error) {
      console.log('Error reproduciendo audio de gota');
    }
  }

  // Método para cambiar de tab y hacer scroll suave
  changeTab(tabName: string) {
    this.activeTab = tabName;
    
    // Reproducir sonido elegante
    this.playElegantSound();
    
    // Agregar feedback visual al botón clickeado
    const clickedButton = event?.target as HTMLElement;
    if (clickedButton) {
      clickedButton.classList.add('clicked');
      setTimeout(() => {
        clickedButton.classList.remove('clicked');
      }, 300);
    }
    
    // Hacer scroll suave a la sección correspondiente
    setTimeout(() => {
      const element = document.getElementById(tabName);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
        
        // Agregar efecto visual de resaltado temporal
        this.highlightSection(element);
      }
    }, 150);
  }

  // Método para resaltar temporalmente la sección seleccionada
  private highlightSection(element: HTMLElement) {
    // Agregar clase de resaltado
    element.classList.add('section-highlight');
    
    // Remover clase después de 2 segundos
    setTimeout(() => {
      element.classList.remove('section-highlight');
    }, 2000);
  }

  // Método para obtener la clase del botón según si está activo
  getTabClass(tabName: string): string {
    return this.activeTab === tabName ? 'btn-boost tab-btn-selected' : 'btn-boost tab-btn';
  }
}
