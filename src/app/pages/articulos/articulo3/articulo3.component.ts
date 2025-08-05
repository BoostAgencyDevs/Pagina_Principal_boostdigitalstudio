import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articulo3',
  templateUrl: './articulo3.component.html',
  styleUrls: ['./articulo3.component.css']
})
export class Articulo3Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  compartirEnRedes(red: string): void {
    const url = window.location.href;
    const texto = 'Lograr $1 millón en ventas es posible con datos, automatización e IA aplicados con estrategia.';
    
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

  descargarPDF(): void {
    const link = document.createElement('a');
    link.href = 'assets/documents/Articulo 3.pdf';
    link.download = 'Como_Generar_1M_en_Ventas_BOOST_AGENCY.pdf';
    link.click();
  }
} 