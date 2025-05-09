import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Telefono } from '../../shared/models/telefono';
import { environment } from '../../../../environment';
import { BaseApiService } from '../interfaces/base-api';

@Injectable({
  providedIn: 'root'
})
export class TelefonoService implements BaseApiService<Telefono> {
  private apiUrl = `${environment.apiUrl}telefono`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  private http = inject(HttpClient);

  /**
   * Obtiene todos los teléfonos
   */
  getAll(): Observable<Telefono[]> {
    return this.http.get<Telefono[]>(this.apiUrl).pipe(
      catchError(this.handleError<Telefono[]>('getAllTelefonos', []))
    );
  }

  /**
   * Obtiene un teléfono por su número
   */
  getById(numero: string): Observable<Telefono | null> {
    return this.http.get<Telefono>(`${this.apiUrl}/${numero}`).pipe(
      catchError(this.handleError<Telefono>(`getTelefonoByNumero numero=${numero}`))
    );
  }

  /**
   * Crea un nuevo teléfono
   */
  create(telefono: Telefono): Observable<Telefono> {
    return this.http.post<Telefono>(this.apiUrl, telefono, this.httpOptions).pipe(
      catchError(this.handleError<Telefono>('createTelefono'))
    );
  }

  /**
   * Actualiza un teléfono existente
   */
  update(numero: string, telefono: Telefono): Observable<boolean> {
    return this.http.put(`${this.apiUrl}/${numero}`, telefono, this.httpOptions).pipe(
      map(() => true),
      catchError(this.handleError<boolean>('updateTelefono'))
    );
  }

  /**
   * Elimina un teléfono
   */
  delete(numero: string): Observable<boolean> {
    return this.http.delete(`${this.apiUrl}/${numero}`, this.httpOptions).pipe(
      map(() => true),
      catchError(this.handleError<boolean>('deleteTelefono'))
    );
  }

  /**
   * Valida el formato de número telefónico
   */
  validarFormatoTelefono(numero: string): boolean {
    const regex = /^[0-9]{10,15}$/; // Ajusta según tus requisitos
    return regex.test(numero);
  }

  /**
   * Manejo de errores centralizado
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      // Aquí podrías enviar el error a un servicio de logging remoto
      return of(result as T);
    };
  }
}
