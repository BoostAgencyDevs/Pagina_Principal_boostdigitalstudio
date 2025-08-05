import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articulo2',
  templateUrl: './articulo2.component.html',
  styleUrls: ['./articulo2.component.css']
})
export class Articulo2Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  compartirEnRedes(red: string): void {
    const url = window.location.href;
    const texto = 'Jóvenes profesionales están transformando industrias. Apoyarlos es clave para la innovación empresarial.';
    
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
    link.href = 'assets/documents/Articulo 2.pdf';
    link.download = 'El_Poder_de_las_Mentes_Jovenes_BOOST_AGENCY.pdf';
    link.click();
  }
} 