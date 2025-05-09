import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Pais } from '../../shared/models/pais';
import { environment } from '../../../../environment';
import { BaseApiService } from '../interfaces/base-api';

@Injectable({
  providedIn: 'root'
})
export class PaisService implements BaseApiService<Pais> {
  private apiUrl = `${environment.apiUrl}pai`; // Nota: Asegúrate de que 'pai' coincida con el backend
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  private http = inject(HttpClient);

  getAll(): Observable<Pais[]> {
    return this.http.get<Pais[]>(this.apiUrl).pipe(
      catchError(this.handleError<Pais[]>('getAllPaises', []))
    );
  }

  getById(id: string): Observable<Pais | null> {
    return this.http.get<Pais>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError<Pais>(`getPaisByCodigo id=${id}`))
    );
  }


  create(pais: Pais): Observable<Pais> {
    return this.http.post<Pais>(this.apiUrl, pais, this.httpOptions).pipe(
      catchError(this.handleError<Pais>('createPais'))
    );
  }

  update(id:string,pais: Pais): Observable<boolean> {
    return this.http.put(`${this.apiUrl}/${id}`, pais, this.httpOptions).pipe(
      map(() => true),
      catchError(this.handleError<boolean>('updatePais'))
    );
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.httpOptions).pipe(
      map(() => true),
      catchError(this.handleError<boolean>('deletePais'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
