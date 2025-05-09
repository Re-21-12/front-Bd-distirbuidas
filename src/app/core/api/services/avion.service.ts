import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Avion } from '../../shared/models/avion';
import { environment } from '../../../../environment';
import { BaseApiService } from '../interfaces/base-api';

@Injectable({
  providedIn: 'root'
})
export class AvionService implements BaseApiService<Avion> {
  private apiUrl = `${environment.apiUrl}avion`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  private http = inject(HttpClient);


  /**
   * Obtiene todos los aviones
   */
  getAll(): Observable<Avion[]> {
    return this.http.get<Avion[]>(this.apiUrl).pipe(
      catchError(this.handleError<Avion[]>('getAllAviones', []))
    );
  }

  /**
   * Obtiene un avión por ID
   */
  getById(id: string): Observable<Avion | null> {
    return this.http.get<Avion>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError<Avion>(`getAvionById id=${id}`))
    );
  }


  /**
   * Crea un nuevo avión
   */
  create(avion: Avion): Observable<Avion> {
    return this.http.post<Avion>(this.apiUrl, avion, this.httpOptions).pipe(
      catchError(this.handleError<Avion>('createAvion'))
    );
  }

  /**
   * Actualiza un avión existente
   */
  update(id: string,avion: Avion): Observable<boolean> {
    return this.http.put(`${this.apiUrl}/${id}`, avion, this.httpOptions).pipe(
      map(() => true),
      catchError(this.handleError<boolean>('updateAvion'))
    );
  }

  /**
   * Elimina un avión
   */
  delete(id: string): Observable<boolean> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.httpOptions).pipe(
      map(() => true),
      catchError(this.handleError<boolean>('deleteAvion'))
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
