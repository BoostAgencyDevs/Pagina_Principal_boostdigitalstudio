import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  // URL base de tu API en Railway
  private baseUrl = 'https://api-nodejs-production-f88a.up.railway.app/api';

  // Endpoints específicos para cada formulario
  private contactoUrl = `${this.baseUrl}/lead`; 


  constructor(private http: HttpClient) { }

  enviarContacto(data: any): Observable<any> {
    // Se incluye el Content-Type para asegurar que el backend reciba JSON correctamente.
    return this.http.post(this.contactoUrl, data, {
      headers: { 'Content-Type': 'application/json' }
    });
  }}
