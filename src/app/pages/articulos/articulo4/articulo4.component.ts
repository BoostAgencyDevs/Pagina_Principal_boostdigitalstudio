import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articulo4',
  templateUrl: './articulo4.component.html',
  styleUrls: ['./articulo4.component.css']
})
export class Articulo4Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  compartirEnRedes(red: string): void {
    const url = window.location.href;
    const texto = 'Descubre cómo la inteligencia artificial está revolucionando los negocios y creando nuevas oportunidades.';
    
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
    link.href = 'assets/documents/Articulo 4.pdf';
    link.download = 'Transformacion_Digital_con_IA_BOOST_AGENCY.pdf';
    link.click();
  }
} 