import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Correo } from '../../shared/models/correo';
import { environment } from '../../../../environment';
import { BaseApiService } from '../interfaces/base-api';

@Injectable({
  providedIn: 'root'
})
export class CorreoElectronicoService implements BaseApiService<Correo> {
  private apiUrl = `${environment.apiUrl}correo_electronico`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };
  private http = inject(HttpClient);

  /**
   * Obtiene todos los correos electrónicos
   */
  getAll(): Observable<Correo[]> {
    return this.http.get<Correo[]>(this.apiUrl).pipe(
      catchError(this.handleError<Correo[]>('getAll', []))
    );
  }

  /**
   * Obtiene un correo electrónico por dirección
   */
  getById(correo: string): Observable<Correo | null> {
    return this.http.get<Correo>(`${this.apiUrl}/${correo}`).pipe(
      catchError(this.handleError<Correo>(`getById correo=${correo}`))
    );
  }

  /**
   * Crea un nuevo correo electrónico
   */
  create(correo: Correo): Observable<Correo> {
    return this.http.post<Correo>(this.apiUrl, correo, this.httpOptions).pipe(
      catchError(this.handleError<Correo>('create'))
    );
  }

  /**
   * Actualiza un correo electrónico existente
   */
  update(id:string, correo: Correo): Observable<boolean> {
    return this.http.put(`${this.apiUrl}/${id}`, correo, this.httpOptions).pipe(
      map(() => true),
      catchError(this.handleError<boolean>('update'))
    );
  }

  /**
   * Elimina un correo electrónico
   */
  delete(correo: string): Observable<boolean> {
    return this.http.delete(`${this.apiUrl}/${correo}`, this.httpOptions).pipe(
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
