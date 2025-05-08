import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Aeropuerto } from '../models/aeropuerto';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class AeropuertoService {
  private apiUrl = `${environment.apiUrl}aeropuerto`;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private http = inject(HttpClient);


  // Obtener todos los aeropuertos
  getAllAeropuertos(): Observable<Aeropuerto[]> {
    return this.http.get<Aeropuerto[]>(this.apiUrl).pipe(
      catchError(this.handleError<Aeropuerto[]>('getAllAeropuertos', []))
    );
  }

  // Obtener un aeropuerto por ID
  getAeropuertoById(id: number): Observable<Aeropuerto | undefined> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Aeropuerto>(url).pipe(
      catchError(this.handleError<Aeropuerto>(`getAeropuertoById id=${id}`))
    );
  }

  // Crear un nuevo aeropuerto
  createAeropuerto(aeropuerto: Aeropuerto): Observable<Aeropuerto> {
    return this.http.post<Aeropuerto>(this.apiUrl, aeropuerto, this.httpOptions).pipe(
      catchError(this.handleError<Aeropuerto>('createAeropuerto'))
    );
  }

  // Actualizar un aeropuerto existente
  updateAeropuerto(aeropuerto: Aeropuerto): Observable<boolean> {
    const url = `${this.apiUrl}/${aeropuerto.id_aeropuerto}`;
    return this.http.put(url, aeropuerto, this.httpOptions).pipe(
      map(() => true), // Si la operación es exitosa, retorna true
      catchError(this.handleError<boolean>('updateAeropuerto'))
    );
  }

  // Eliminar un aeropuerto
  deleteAeropuerto(id: number): Observable<boolean> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, this.httpOptions).pipe(
      map(() => true), // Si la operación es exitosa, retorna true
      catchError(this.handleError<boolean>('deleteAeropuerto'))
    );
  }

  // Manejo de errores genérico
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      // Puedes enviar el error a un servicio de logging aquí
      return of(result as T); // Devuelve un resultado seguro para que la app continúe
    };
  }
}
