import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Plaza } from '../../shared/models/plaza';
import { environment } from '../../../../environment';
import { BaseApiService } from '../interfaces/base-api';

@Injectable({
  providedIn: 'root'
})
export class PlazaService implements BaseApiService<Plaza> {
  private apiUrl = `${environment.apiUrl}plaza`;
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
  getAll(): Observable<Plaza[]> {
    return this.http.get<Plaza[]>(this.apiUrl).pipe(
      catchError(this.handleError<Plaza[]>('getAllPlazas', []))
    );
  }

  /**
   * Obtiene una plaza por su identificador (letra_fila)
   */
  getById(id: string): Observable<Plaza | null> {
    return this.http.get<Plaza>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError<Plaza>(`getPlazaById id=${id}`))
    );
  }


  /**
   * Crea una nueva plaza
   */
  create(plaza: Plaza): Observable<Plaza> {
    return this.http.post<Plaza>(this.apiUrl, plaza, this.httpOptions).pipe(
      catchError(this.handleError<Plaza>('createPlaza'))
    );
  }

  /**
   * Actualiza una plaza existente
   */
  update(id: string, plaza: Plaza): Observable<boolean> {
    return this.http.put(`${this.apiUrl}/${id}`, plaza, this.httpOptions).pipe(
      map(() => true),
      catchError(this.handleError<boolean>('updatePlaza'))
    );
  }

  /**
   * Elimina una plaza
   */
  delete(id: string): Observable<boolean> {
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
