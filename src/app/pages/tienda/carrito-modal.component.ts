import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyService } from '../../shared/services/currency.service';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  categoria: string;
  descripcion: string;
  stripePriceId?: string;
}

interface CarritoItem {
  producto: Producto;
  cantidad: number;
}

@Component({
  selector: 'app-carrito-modal',
  templateUrl: './carrito-modal.component.html',
  styleUrls: ['./carrito-modal.component.css']
})
export class CarritoModalComponent {
  @Input() mostrar: boolean = false;
  @Input() carrito: CarritoItem[] = [];
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() actualizarCarrito = new EventEmitter<CarritoItem[]>();
  @Output() comprarStripe = new EventEmitter<CarritoItem[]>();

  constructor(private currencyService: CurrencyService) {}

  incrementarCantidad(index: number) {
    this.carrito[index].cantidad++;
    this.actualizarCarrito.emit(this.carrito);
  }

  decrementarCantidad(index: number) {
    if (this.carrito[index].cantidad > 1) {
      this.carrito[index].cantidad--;
    } else {
      this.eliminarItem(index);
    }
    this.actualizarCarrito.emit(this.carrito);
  }

  eliminarItem(index: number) {
    this.carrito.splice(index, 1);
    this.actualizarCarrito.emit(this.carrito);
  }

  obtenerSubtotal(): number {
    return this.carrito.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0);
  }

  obtenerImpuestos(): number {
    return this.obtenerSubtotal() * 0.19; // 19% IVA
  }

  obtenerTotal(): number {
    return this.obtenerSubtotal() + this.obtenerImpuestos();
  }

  cerrar() {
    this.cerrarModal.emit();
  }

  continuarComprando() {
    this.cerrarModal.emit();
  }

  comprarConStripe() {
    this.comprarStripe.emit(this.carrito);
  }

  formatPrice(priceUSD: number): string {
    return this.currencyService.formatPrice(priceUSD);
  }
} 