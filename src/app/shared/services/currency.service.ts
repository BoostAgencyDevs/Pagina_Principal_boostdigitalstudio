import { Injectable } from '@angular/core';

export interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
  exchangeRate: number; // Tasa de cambio respecto al USD
  format: string; // Formato de moneda
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private currentCurrency: CurrencyConfig = {
    code: 'USD',
    symbol: '$',
    name: 'Dólar Estadounidense',
    exchangeRate: 1,
    format: 'USD'
  };

  private currencies: { [key: string]: CurrencyConfig } = {
    USD: {
      code: 'USD',
      symbol: '$',
      name: 'Dólar Estadounidense',
      exchangeRate: 1,
      format: 'USD'
    },
    COP: {
      code: 'COP',
      symbol: '$',
      name: 'Peso Colombiano',
      exchangeRate: 4000, // Aproximadamente 1 USD = 4000 COP
      format: 'COP'
    },
    EUR: {
      code: 'EUR',
      symbol: '€',
      name: 'Euro',
      exchangeRate: 0.85, // Aproximadamente 1 USD = 0.85 EUR
      format: 'EUR'
    },
    MXN: {
      code: 'MXN',
      symbol: '$',
      name: 'Peso Mexicano',
      exchangeRate: 18, // Aproximadamente 1 USD = 18 MXN
      format: 'MXN'
    },
    ARS: {
      code: 'ARS',
      symbol: '$',
      name: 'Peso Argentino',
      exchangeRate: 100, // Aproximadamente 1 USD = 100 ARS
      format: 'ARS'
    }
  };

  constructor() {
    this.detectUserLocation();
  }

  private detectUserLocation(): void {
    // Detectar ubicación del usuario basado en el navegador
    const userLanguage = navigator.language || 'en-US';
    const userCountry = this.getCountryFromLanguage(userLanguage);
    
    // También intentar detectar por IP (simulado)
    this.setCurrencyByCountry(userCountry);
  }

  private getCountryFromLanguage(language: string): string {
    const languageMap: { [key: string]: string } = {
      'es-CO': 'CO',
      'es-MX': 'MX',
      'es-AR': 'AR',
      'es': 'CO', // Español por defecto -> Colombia
      'en-US': 'US',
      'en': 'US',
      'de': 'DE',
      'fr': 'FR'
    };

    return languageMap[language] || 'US';
  }

  private setCurrencyByCountry(country: string): void {
    const currencyMap: { [key: string]: string } = {
      'US': 'USD',
      'CO': 'COP',
      'MX': 'MXN',
      'AR': 'ARS',
      'DE': 'EUR',
      'FR': 'EUR',
      'ES': 'EUR'
    };

    const currencyCode = currencyMap[country] || 'USD';
    this.setCurrency(currencyCode);
  }

  setCurrency(currencyCode: string): void {
    if (this.currencies[currencyCode]) {
      this.currentCurrency = this.currencies[currencyCode];
      // Guardar en localStorage para persistencia
      localStorage.setItem('preferredCurrency', currencyCode);
    }
  }

  getCurrentCurrency(): CurrencyConfig {
    return this.currentCurrency;
  }

  getAvailableCurrencies(): CurrencyConfig[] {
    return Object.values(this.currencies);
  }

  convertPrice(priceUSD: number): number {
    return priceUSD * this.currentCurrency.exchangeRate;
  }

  formatPrice(priceUSD: number): string {
    const convertedPrice = this.convertPrice(priceUSD);
    
    switch (this.currentCurrency.format) {
      case 'COP':
        return `$${Math.round(convertedPrice).toLocaleString('es-CO')}`;
      case 'MXN':
        return `$${Math.round(convertedPrice).toLocaleString('es-MX')}`;
      case 'ARS':
        return `$${Math.round(convertedPrice).toLocaleString('es-AR')}`;
      case 'EUR':
        return `€${convertedPrice.toFixed(2).replace('.', ',')}`;
      default:
        return `$${convertedPrice.toFixed(2)}`;
    }
  }

  getCurrencySymbol(): string {
    return this.currentCurrency.symbol;
  }

  getCurrencyName(): string {
    return this.currentCurrency.name;
  }

  // Método para actualizar tasas de cambio (se puede conectar a una API real)
  updateExchangeRates(): void {
    // Aquí se podría conectar a una API como exchangerate-api.com
    // Por ahora mantenemos las tasas fijas
    console.log('Tasas de cambio actualizadas');
  }
} 