import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Ciudad } from '../models/ciudad';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {
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
  getAllCiudades(): Observable<Ciudad[]> {
    return this.http.get<Ciudad[]>(this.apiUrl).pipe(
      catchError(this.handleError<Ciudad[]>('getAllCiudades', []))
    );
  }

  /**
   * Obtiene una ciudad por su código
   */
  getCiudadById(codigo: string): Observable<Ciudad | undefined> {
    return this.http.get<Ciudad>(`${this.apiUrl}/${codigo}`).pipe(
      catchError(this.handleError<Ciudad>(`getCiudadById codigo=${codigo}`))
    );
  }

  /**
   * Busca ciudades por nombre
   */
  searchCiudades(term: string): Observable<Ciudad[]> {
    return this.http.get<Ciudad[]>(`${this.apiUrl}/search?nombre=${term}`).pipe(
      catchError(this.handleError<Ciudad[]>('searchCiudades', []))
    );
  }

  /**
   * Crea una nueva ciudad
   */
  createCiudad(ciudad: Ciudad): Observable<Ciudad> {
    return this.http.post<Ciudad>(this.apiUrl, ciudad, this.httpOptions).pipe(
      catchError(this.handleError<Ciudad>('createCiudad'))
    );
  }

  /**
   * Actualiza una ciudad existente
   */
  updateCiudad(ciudad: Ciudad): Observable<boolean> {
    return this.http.put(`${this.apiUrl}/${ciudad.codigo_ciudad}`, ciudad, this.httpOptions).pipe(
      map(() => true),
      catchError(this.handleError<boolean>('updateCiudad'))
    );
  }

  /**
   * Elimina una ciudad
   */
  deleteCiudad(codigo: string): Observable<boolean> {
    return this.http.delete(`${this.apiUrl}/${codigo}`, this.httpOptions).pipe(
      map(() => true),
      catchError(this.handleError<boolean>('deleteCiudad'))
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
