import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articulo1',
  templateUrl: './articulo1.component.html',
  styleUrls: ['./articulo1.component.css']
})
export class Articulo1Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Scroll to top when component loads
    window.scrollTo(0, 0);
  }

  // Método para compartir en redes sociales
  compartirEnRedes(red: string): void {
    const url = window.location.href;
    const titulo = 'Marketing Estratégico Digital e IA - BOOST AGENCY';
    const texto = 'Descubre cómo las medianas empresas pueden escalar integrando datos, IA y estrategia en su marketing digital.';
    
    let shareUrl = '';
    
    switch(red) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  }

  // Método para descargar PDF
  descargarPDF(): void {
    const link = document.createElement('a');
    link.href = 'assets/documents/Articulo 1.pdf';
    link.download = 'Marketing_Estrategico_Digital_IA_BOOST_AGENCY.pdf';
    link.click();
  }
} 