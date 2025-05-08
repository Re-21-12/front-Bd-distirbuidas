import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Vuelo } from '../models/vuelo';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class VueloService {
  private apiUrl = `${environment.apiUrl}/vuelo`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los vuelos
   */
  getAllVuelos(): Observable<Vuelo[]> {
    return this.http.get<Vuelo[]>(this.apiUrl).pipe(
      catchError(this.handleError<Vuelo[]>('getAllVuelos', []))
    );
  }

  /**
   * Obtiene vuelos por aerolínea
   */
  getVuelosByAerolinea(idAerolinea: string): Observable<Vuelo[]> {
    return this.http.get<Vuelo[]>(`${this.apiUrl}/by-aerolinea/${idAerolinea}`).pipe(
      catchError(this.handleError<Vuelo[]>('getVuelosByAerolinea', []))
    );
  }

  /**
   * Busca vuelos por origen y destino
   */
  searchVuelos(origen: string, destino: string, fecha: string): Observable<Vuelo[]> {
    return this.http.get<Vuelo[]>(
      `${this.apiUrl}/search?origen=${origen}&destino=${destino}&fecha=${fecha}`
    ).pipe(
      catchError(this.handleError<Vuelo[]>('searchVuelos', []))
    );
  }

  /**
   * Obtiene un vuelo por su número
   */
  getVueloByNumero(numero: string): Observable<Vuelo | undefined> {
    return this.http.get<Vuelo>(`${this.apiUrl}/${numero}`).pipe(
      catchError(this.handleError<Vuelo>(`getVueloByNumero numero=${numero}`))
    );
  }

  /**
   * Crea un nuevo vuelo
   */
  createVuelo(vuelo: Vuelo): Observable<Vuelo> {
    return this.http.post<Vuelo>(this.apiUrl, vuelo, this.httpOptions).pipe(
      catchError(this.handleError<Vuelo>('createVuelo'))
    );
  }

  /**
   * Actualiza un vuelo existente
   */
  updateVuelo(vuelo: Vuelo): Observable<boolean> {
    return this.http.put(`${this.apiUrl}/${vuelo.numero_vuelo}`, vuelo, this.httpOptions).pipe(
      map(() => true),
      catchError(this.handleError<boolean>('updateVuelo'))
    );
  }

  /**
   * Cambia el estado de un vuelo
   */
  cambiarEstadoVuelo(numero: string, nuevoEstado: string): Observable<boolean> {
    return this.http.patch(`${this.apiUrl}/${numero}/estado`, { estado: nuevoEstado }, this.httpOptions).pipe(
      map(() => true),
      catchError(this.handleError<boolean>('cambiarEstadoVuelo'))
    );
  }

  /**
   * Elimina un vuelo
   */
  deleteVuelo(numero: string): Observable<boolean> {
    return this.http.delete(`${this.apiUrl}/${numero}`, this.httpOptions).pipe(
      map(() => true),
      catchError(this.handleError<boolean>('deleteVuelo'))
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
