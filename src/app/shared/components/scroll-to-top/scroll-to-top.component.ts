import { Component, OnInit, HostListener } from '@angular/core';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html'
  // styleUrls: ['./scroll-to-top.component.css'] // Temporarily removed to fix compilation
})
export class ScrollToTopComponent implements OnInit {
  showButton = false;

  constructor(private scrollService: ScrollService) {}

  ngOnInit(): void {
    this.checkScrollPosition();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.checkScrollPosition();
  }

  private checkScrollPosition(): void {
    const scrollPosition = this.scrollService.getScrollPosition();
    this.showButton = scrollPosition > 300;
  }

  scrollToTop(): void {
    this.scrollService.scrollToTop();
  }
}
