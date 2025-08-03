import { Component, OnInit } from '@angular/core';
import { MockDataService } from '../../shared/services/mock-data.service';
import { CurrencyService } from '../../shared/services/currency.service';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  categoria: string;
  descripcion: string;
  stripePriceId?: string; // ID del precio en Stripe
}

interface CarritoItem {
  producto: Producto;
  cantidad: number;
}

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {
  categorias: string[] = ['Todos', 'Gorras', 'Camisetas', 'Hoodies', 'Libros', 'Accesorios', 'E-books'];
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  categoriaSeleccionada: string = 'Todos';
  busqueda: string = '';
  productoSeleccionado: Producto | null = null;
  carrito: CarritoItem[] = [];
  mostrarCarritoCompleto: boolean = false;
  private audioContext: AudioContext | null = null;

  constructor(
    private mockDataService: MockDataService,
    private currencyService: CurrencyService
  ) {
    this.cargarCarrito();
  }

  ngOnInit() {
    this.mockDataService.getContenido().subscribe(data => {
      this.productos = data.productos || [];
      this.filtrarProductos();
    });
    this.cargarCarrito();
  }

  seleccionarCategoria(cat: string) {
    this.categoriaSeleccionada = cat;
    this.playCategorySound();
    this.filtrarProductos();
  }

  private playCategorySound() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(600, this.audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.2);
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.2);
    } catch (error) {
      console.log('Error reproduciendo sonido de categoría');
    }
  }

  filtrarProductos() {
    let filtrados = this.productos;
    if (this.categoriaSeleccionada !== 'Todos') {
      filtrados = filtrados.filter(p => p.categoria === this.categoriaSeleccionada);
    }
    if (this.busqueda.trim()) {
      const b = this.busqueda.trim().toLowerCase();
      filtrados = filtrados.filter(p =>
        p.nombre.toLowerCase().includes(b) ||
        p.descripcion.toLowerCase().includes(b)
      );
    }
    this.productosFiltrados = filtrados;
  }

  onBuscar(e: Event) {
    this.filtrarProductos();
  }

  // Funciones del Modal de Producto
  abrirModalProducto(producto: Producto) {
    this.productoSeleccionado = producto;
    this.playModalSound();
    document.body.style.overflow = 'hidden';
  }

  cerrarModal() {
    this.productoSeleccionado = null;
    document.body.style.overflow = 'auto';
  }

  private playModalSound() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.1);
      oscillator.frequency.exponentialRampToValueAtTime(600, this.audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.15, this.audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.3);
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.3);
    } catch (error) {
      console.log('Error reproduciendo sonido del modal');
    }
  }

  // Funciones del Carrito
  async agregarAlCarrito() {
    if (!this.productoSeleccionado) return;
    
    this.playCartSound();
    
    const itemExistente = this.carrito.find(item => item.producto.id === this.productoSeleccionado!.id);
    
    if (itemExistente) {
      itemExistente.cantidad += 1;
    } else {
      this.carrito.push({
        producto: this.productoSeleccionado,
        cantidad: 1
      });
    }
    
    this.guardarCarrito();
    alert(`¡Producto añadido al carrito! ${this.productoSeleccionado.nombre}`);
    this.cerrarModal();
  }

  private cargarCarrito() {
    const carritoGuardado = localStorage.getItem('boost_shop_carrito');
    if (carritoGuardado) {
      try {
        this.carrito = JSON.parse(carritoGuardado);
      } catch (error) {
        console.error('Error cargando carrito:', error);
        this.carrito = [];
      }
    }
  }

  private guardarCarrito() {
    localStorage.setItem('boost_shop_carrito', JSON.stringify(this.carrito));
  }

  obtenerTotalCarrito(): number {
    return this.carrito.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0);
  }

  obtenerCantidadCarrito(): number {
    return this.carrito.reduce((total, item) => total + item.cantidad, 0);
  }

  // Funciones del Modal del Carrito
  abrirCarritoCompleto() {
    this.mostrarCarritoCompleto = true;
    document.body.style.overflow = 'hidden';
  }

  cerrarCarritoCompleto() {
    this.mostrarCarritoCompleto = false;
    document.body.style.overflow = 'auto';
  }

  actualizarCarrito(nuevoCarrito: CarritoItem[]) {
    this.carrito = nuevoCarrito;
    this.guardarCarrito();
  }

  // Funciones de Compra con Stripe
  async comprarAhora() {
    if (!this.productoSeleccionado) return;
    
    this.playPurchaseSound();
    
    try {
      const response = await this.crearSesionStripe([{
        producto: this.productoSeleccionado,
        cantidad: 1
      }]);
      
      if (response.success && response.sessionId) {
        this.redirigirAStripeCheckout(response.sessionId);
      } else {
        console.error('Error creando sesión de Stripe:', response.error);
        alert('Error al procesar el pago. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error en compra:', error);
      alert('Error al procesar el pago. Por favor, inténtalo de nuevo.');
    }
    
    this.cerrarModal();
  }

  async comprarCarritoConStripe(carritoItems: CarritoItem[]) {
    this.playPurchaseSound();
    
    try {
      const response = await this.crearSesionStripe(carritoItems);
      
      if (response.success && response.sessionId) {
        this.redirigirAStripeCheckout(response.sessionId);
        // Limpiar carrito después de la compra exitosa
        this.carrito = [];
        this.guardarCarrito();
        this.cerrarCarritoCompleto();
      } else {
        console.error('Error creando sesión de Stripe:', response.error);
        alert('Error al procesar el pago. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error en compra del carrito:', error);
      alert('Error al procesar el pago. Por favor, inténtalo de nuevo.');
    }
  }

  // Integración con Stripe
  private async crearSesionStripe(items: CarritoItem[]): Promise<{success: boolean, sessionId?: string, error?: string}> {
    try {
      // Preparar datos para Stripe
      const lineItems = items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.producto.nombre,
            description: item.producto.descripcion,
            images: [item.producto.imagen || 'assets/images/global/Logo_Principal.png'],
          },
          unit_amount: Math.round(item.producto.precio * 100), // Stripe usa centavos
        },
        quantity: item.cantidad,
      }));

      const sessionData = {
        line_items: lineItems,
        mode: 'payment',
        success_url: `${window.location.origin}/tienda/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${window.location.origin}/tienda`,
        metadata: {
          order_type: items.length === 1 ? 'single_product' : 'cart',
          product_count: items.length.toString(),
        }
      };

      // En producción, esto sería una llamada HTTP real al backend
      console.log('Creando sesión de Stripe con datos:', sessionData);
      
      // Simular respuesta exitosa
      return {
        success: true,
        sessionId: 'cs_test_' + Math.random().toString(36).substr(2, 9)
      };
      
    } catch (error) {
      console.error('Error creando sesión de Stripe:', error);
      return {
        success: false,
        error: 'Error al crear sesión de pago'
      };
    }
  }

  private redirigirAStripeCheckout(sessionId: string) {
    // En producción, esto redirigiría a Stripe Checkout
    console.log('Redirigiendo a Stripe Checkout con sessionId:', sessionId);
    
    // Simulación de redirección
    setTimeout(() => {
      alert(`¡Redirección a Stripe! Session ID: ${sessionId}\n\nEn producción, esto abriría Stripe Checkout con:\n- Productos del carrito\n- Cálculo de impuestos\n- Envío gratuito\n- Pago seguro`);
    }, 100);
  }

  private playPurchaseSound() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(600, this.audioContext.currentTime + 0.1);
      oscillator.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.2, this.audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.4);
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.4);
    } catch (error) {
      console.log('Error reproduciendo sonido de compra');
    }
  }

  private playCartSound() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(600, this.audioContext.currentTime + 0.1);
      oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.15, this.audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.3);
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.3);
    } catch (error) {
      console.log('Error reproduciendo sonido del carrito');
    }
  }

  // Métodos para formatear precios según la moneda
  formatPrice(priceUSD: number): string {
    return this.currencyService.formatPrice(priceUSD);
  }

  getCurrencySymbol(): string {
    return this.currencyService.getCurrencySymbol();
  }

  getCurrencyName(): string {
    return this.currencyService.getCurrencyName();
  }

  getAvailableCurrencies() {
    return this.currencyService.getAvailableCurrencies();
  }

  changeCurrency(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.currencyService.setCurrency(target.value);
    }
  }
}
