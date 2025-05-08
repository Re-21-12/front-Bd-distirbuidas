import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Pais } from '../models/pais';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  private apiUrl = `${environment.apiUrl}/pai`; // Nota: Mantiene 'pai' como en tu endpoint
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  private http = inject(HttpClient);

  /**
   * Obtiene todos los países
   */
  getAllPaises(): Observable<Pais[]> {
    return this.http.get<Pais[]>(this.apiUrl).pipe(
      catchError(this.handleError<Pais[]>('getAllPaises', []))
    );
  }

  /**
   * Obtiene un país por su código
   */
  getPaisByCodigo(codigo: string): Observable<Pais | undefined> {
    return this.http.get<Pais>(`${this.apiUrl}/${codigo}`).pipe(
      catchError(this.handleError<Pais>(`getPaisByCodigo codigo=${codigo}`))
    );
  }

  /**
   * Busca países por nombre
   */
  searchPaises(term: string): Observable<Pais[]> {
    return this.http.get<Pais[]>(`${this.apiUrl}/search?nombre=${term}`).pipe(
      catchError(this.handleError<Pais[]>('searchPaises', []))
    );
  }

  /**
   * Crea un nuevo país
   */
  createPais(pais: Pais): Observable<Pais> {
    return this.http.post<Pais>(this.apiUrl, pais, this.httpOptions).pipe(
      catchError(this.handleError<Pais>('createPais'))
    );
  }

  /**
   * Actualiza un país existente
   */
  updatePais(pais: Pais): Observable<boolean> {
    return this.http.put(`${this.apiUrl}/${pais.codigo_pais}`, pais, this.httpOptions).pipe(
      map(() => true),
      catchError(this.handleError<boolean>('updatePais'))
    );
  }

  /**
   * Elimina un país
   */
  deletePais(codigo: string): Observable<boolean> {
    return this.http.delete(`${this.apiUrl}/${codigo}`, this.httpOptions).pipe(
      map(() => true),
      catchError(this.handleError<boolean>('deletePais'))
    );
  }

  /**
   * Manejo de errores centralizado
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed
