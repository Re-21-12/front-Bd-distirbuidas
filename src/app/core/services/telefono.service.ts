import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../../environment';
import { Telefono } from '../models/telefono';

@Injectable({
  providedIn: 'root'
})
export class TelefonoService {
  private apiUrl = `${environment.apiUrl}/telefono`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los teléfonos
   */
  getAllTelefonos(): Observable<Telefono[]> {
    return this.http.get<Telefono[]>(this.apiUrl).pipe(
      catchError(this.handleError<Telefono[]>('getAllTelefonos', []))
    );
  }

  /**
   * Obtiene teléfonos por persona
   */
  getTelefonosByPersona(idPersona: number): Observable<Telefono[]> {
    return this.http.get<Telefono[]>(`${this.apiUrl}/by-persona/${idPersona}`).pipe(
      catchError(this.handleError<Telefono[]>('getTelefonosByPersona', []))
    );
  }

  /**
   * Obtiene un teléfono por su número
   */
  getTelefonoByNumero(numero: string): Observable<Telefono | undefined> {
    return this.http.get<Telefono>(`${this.apiUrl}/${numero}`).pipe(
      catchError(this.handleError<Telefono>(`getTelefonoByNumero numero=${numero}`))
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
   * Crea un nuevo teléfono
   */
  createTelefono(telefono: Telefono): Observable<Telefono> {
    if (!this.validarFormatoTelefono(telefono.numero_telefono)) {
      return throwError(() => new Error('Formato de teléfono inválido'));
    }

    return this.http.post<Telefono>(this.apiUrl, telefono, this.httpOptions).pipe(
      catchError(this.handleError<Telefono>('createTelefono'))
    );
  }

  /**
   * Actualiza un teléfono existente
   */
  updateTelefono(telefono: Telefono): Observable<boolean> {
    return this.http.put(`${this.apiUrl}/${telefono.numero_telefono}`, telefono, this.httpOptions).pipe(
      map(() => true),
      catchError(this.handleError<boolean>('updateTelefono'))
    );
  }

  /**
   * Marca un teléfono como principal
   */
  setTelefonoPrincipal(numero: string, idPersona: number): Observable<boolean> {
    return this.http.patch(`${this.apiUrl}/${numero}/principal`, { idPersona }, this.httpOptions).pipe(
      map(() => true),
      catchError(this.handleError<boolean>('setTelefonoPrincipal'))
    );
  }

  /**
   * Elimina un teléfono
   */
  deleteTelefono(numero: string): Observable<boolean> {
    return this.http.delete(`${this.apiUrl}/${numero}`, this.httpOptions).pipe(
      map(() => true),
      catchError(this.handleError<boolean>('deleteTelefono'))
    );
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
