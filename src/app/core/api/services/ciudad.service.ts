import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Ciudad } from '../../shared/models/ciudad';
import { environment } from '../../../../environment';
import { BaseApiService } from '../interfaces/base-api';

@Injectable({
  providedIn: 'root'
})
export class CiudadService implements BaseApiService<Ciudad> {
  private apiUrl = `${environment.apiUrl}ciudad`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  private http = inject(HttpClient);

  /**
   * Obtiene todas las ciudades
   */
  getAll(): Observable<Ciudad[]> {
    return this.http.get<Ciudad[]>(this.apiUrl).pipe(
      catchError(this.handleError<Ciudad[]>('getAll', []))
    );
  }

  /**
   * Obtiene una ciudad por su código
   */
  getById(id: string): Observable<Ciudad | null> {
    return this.http.get<Ciudad>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError<Ciudad>(`getById id=${id}`))
    );
  }

  /**
   * Crea una nueva ciudad
   */
  create(ciudad: Ciudad): Observable<Ciudad> {
    return this.http.post<Ciudad>(this.apiUrl, ciudad, this.httpOptions).pipe(
      catchError(this.handleError<Ciudad>('create'))
    );
  }

  /**
   * Actualiza una ciudad existente
   */
  update(id: string, ciudad: Ciudad): Observable<boolean> {
    return this.http.put(`${this.apiUrl}/${id}`, ciudad, this.httpOptions).pipe(
      map(() => true),
      catchError(this.handleError<boolean>('update'))
    );
  }

  /**
   * Elimina una ciudad
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
