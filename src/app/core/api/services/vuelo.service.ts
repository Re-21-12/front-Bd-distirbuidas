import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Reserva } from '../../shared/models/reserva';
import { environment } from '../../../../environment';
import { BaseApiService } from '../interfaces/base-api';

@Injectable({
  providedIn: 'root'
})
export class VueloService implements BaseApiService<Reserva> {
  private apiUrl = `${environment.apiUrl}/reserva`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  private http = inject(HttpClient);

  /**
   * Obtiene todas las reservas
   */
  getAll(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.apiUrl).pipe(
      catchError(this.handleError<Reserva[]>('getAll', []))
    );
  }

  /**
   * Obtiene una reserva por ID
   */
  getById(id: string): Observable<Reserva | null> {
    return this.http.get<Reserva>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError<Reserva>(`getById id=${id}`))
    );
  }

  /**
   * Crea una nueva reserva
   */
  create(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.apiUrl, reserva, this.httpOptions).pipe(
      catchError(this.handleError<Reserva>('create'))
    );
  }

  /**
   * Actualiza una reserva existente
   */
  update(id: string, reserva: Reserva): Observable<boolean> {
    return this.http.put(`${this.apiUrl}/${id}`, reserva, this.httpOptions).pipe(
      map(() => true),
      catchError(this.handleError<boolean>('update'))
    );
  }

  /**
   * Elimina una reserva
   */
  delete(id: string): Observable<boolean> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.httpOptions).pipe(
      map(() => true),
      catchError(this.handleError<boolean>('delete'))
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
