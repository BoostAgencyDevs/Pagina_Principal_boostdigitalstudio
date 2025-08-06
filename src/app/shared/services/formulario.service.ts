import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * Servicio para enviar los formularios de Cotización y Asesoría a la API externa.
 * Se han actualizado las URLs para apuntar a los endpoints correctos en Railway.
 *
 * - Cotización: POST ${environment.apiUrl}/leads/formQuote
 * - Asesoría: POST ${environment.apiUrl}/leads/formSupport
 */
@Injectable({ providedIn: 'root' })
export class FormularioService {
  // URL base de tu API usando variable de entorno
  private baseUrl = environment.apiUrl;

  // Endpoints específicos para cada formulario
  private cotizacionUrl = `${this.baseUrl}/leads/formQuote`;
  private asesoriaUrl = `${this.baseUrl}/leads/formSupport`;

  constructor(private http: HttpClient) {}

  /**
   * Envía el formulario de cotización al endpoint externo
   * @param data Objeto con la estructura JSON requerida para la cotización
   */
  enviarCotizacion(data: any): Observable<any> {
    // Se incluye el Content-Type para asegurar que el backend reciba JSON correctamente.
    return this.http.post(this.cotizacionUrl, data, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  /**
   * Envía el formulario de asesoría al endpoint externo
   * @param data Objeto con la estructura JSON requerida para la asesoría
   */
  enviarAsesoria(data: any): Observable<any> {
    // Se incluye el Content-Type para asegurar que el backend reciba JSON correctamente.
    return this.http.post(this.asesoriaUrl, data, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}