import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  // URL base de tu API usando variable de entorno
  private baseUrl = environment.apiUrl;

  // Endpoints específicos para cada formulario
  private contactoUrl = `${this.baseUrl}/lead`; 


  constructor(private http: HttpClient) { }

  enviarContacto(data: any): Observable<any> {
    // Se incluye el Content-Type para asegurar que el backend reciba JSON correctamente.
    return this.http.post(this.contactoUrl, data, {
      headers: { 'Content-Type': 'application/json' }
    });
  }}
