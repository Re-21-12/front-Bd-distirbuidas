import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

import { environment } from '../../../../environment';
import { Plaza } from '../models/plaza';

@Injectable({
  providedIn: 'root'
})
export class PlazaService {
  private apiUrl = `${environment.apiUrl}/plaza`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  private http = inject(HttpClient);


  /**
   * Obtiene todas las plazas
   */
  getAllPlazas(): Observable<Plaza[]> {
    return this.http.get<Plaza[]>(this.apiUrl).pipe(
      catchError(this.handleError<Plaza[]>('getAllPlazas', []))
    );
  }

  /**
   * Obtiene plazas por avión
   */
  getPlazasByAvion(idAvion: string): Observable<Plaza[]> {
    return this.http.get<Plaza[]>(`${this.apiUrl}/by-avion/${idAvion}`).pipe(
      catchError(this.handleError<Plaza[]>('getPlazasByAvion', []))
    );
  }

  /**
   * Obtiene una plaza por su identificador (letra_fila)
   */
  getPlazaById(id: string): Observable<Plaza | undefined> {
    return this.http.get<Plaza>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError<Plaza>(`getPlazaById id=${id}`))
    );
  }

  /**
   * Crea una nueva plaza
   */
  createPlaza(plaza: Plaza): Observable<Plaza> {
    return this.http.post<Plaza>(this.apiUrl, plaza, this.httpOptions).pipe(
      catchError(this.handleError<Plaza>('createPlaza'))
    );
  }

  /**
   * Actualiza una plaza existente
   */
  updatePlaza(plaza: Plaza): Observable<boolean> {
    return this.http.put(`${this.apiUrl}/${plaza.letra_fila}`, plaza, this.httpOptions).pipe(
      map(() => true),
      catchError(this.handleError<boolean>('updatePlaza'))
    );
  }

  /**
   * Elimina una plaza
   */
  deletePlaza(id: string): Observable<boolean> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.httpOptions).pipe(
      map(() => true),
      catchError(this.handleError<boolean>('deletePlaza'))
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
