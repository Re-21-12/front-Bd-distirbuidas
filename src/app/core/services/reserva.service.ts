import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../../environment';
import { Reserva } from '../models/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = `${environment.apiUrl}/reserva`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todas las reservas
   */
  getAllReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.apiUrl).pipe(
      catchError(this.handleError<Reserva[]>('getAllReservas', []))
    );
  }

  /**
   * Obtiene reservas por pasajero
   */
  getReservasByPasajero(idPasajero: number): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/by-pasajero/${idPasajero}`).pipe(
      catchError(this.handleError<Reserva[]>('getReservasByPasajero', []))
    );
  }

  /**
   * Obtiene reservas por vuelo
   */
  getReservasByVuelo(idVuelo: number): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/by-vuelo/${idVuelo}`).pipe(
      catchError(this.handleError<Reserva[]>('getReservasByVuelo', []))
    );
  }

  /**
   * Obtiene una reserva por ID
   */
  getReservaById(id: number): Observable<Reserva | undefined> {
    return this.http.get<Reserva>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError<Reserva>(`getReservaById id=${id}`))
    );
  }

  /**
   * Crea una nueva reserva
   */
  createReserva(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.apiUrl, reserva, this.httpOptions).pipe(
      catchError(this.handleError<Reserva>('createReserva'))
    );
  }

  /**
   * Actualiza una reserva existente
   */
  updateReserva(reserva: Reserva): Observable<boolean> {
    return this.http.put(`${this.apiUrl}/${reserva.id_reserva}`, reserva, this.httpOptions).pipe(
      map(() => true),
      catchError(this.handleError<boolean>('updateReserva'))
    );
  }

  /**
   * Cancela una reserva (estado especial)
   */
  cancelarReserva(id: number): Observable<boolean> {
    return this.http.patch(`${this.apiUrl}/${id}/cancelar`, {}, this.httpOptions).pipe(
      map(() => true),
      catchError(this.handleError<boolean>('cancelarReserva'))
    );
  }

  /**
   * Elimina una reserva
   */
  deleteReserva(id: number): Observable<boolean> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.httpOptions).pipe(
      map(() => true),
      catchError(this.handleError<boolean>('deleteReserva'))
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
