import { Aerolinea } from './../models/aerolinea';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../../environment'; // Asegúrate de tener la URL de tu backend aquí
 // Asegúrate de crear esta interfaz

@Injectable({
  providedIn: 'root',
})
export class AerolineaService {
  private apiUrl = `${environment.apiUrl}aerolinea`; // Reemplaza con tu URL

  constructor(private http: HttpClient) {}

  // GET Todos
  getAll(): Observable<Aerolinea[]> {
    return this.http.get<Aerolinea[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error al obtener aerolíneas:', error);
        return of([]); // Retorna un array vacío en caso de error
      })
    );
  }

  // GET por ID
  getById(id: string): Observable<Aerolinea | null> {
    return this.http.get<Aerolinea>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error al obtener aerolínea con ID ${id}:`, error);
        return of(null); // Retorna null si hay error o no se encuentra
      })
    );
  }

  // POST
  create(aerolinea: Aerolinea): Observable<Aerolinea | null> {
    return this.http.post<Aerolinea>(this.apiUrl, aerolinea).pipe(
      catchError((error) => {
        console.error('Error al crear aerolínea:', error);
        return of(null);
      })
    );
  }

  // PUT
  update(id: string, aerolinea: Aerolinea): Observable<boolean> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, aerolinea).pipe(
      catchError((error) => {
        console.error(`Error al actualizar aerolínea con ID ${id}:`, error);
        return of(false);
      }),
      map(() => true) // Si llega aquí, la operación fue exitosa
    );
  }

  // DELETE
  delete(id: string): Observable<boolean> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error al eliminar aerolínea con ID ${id}:`, error);
        return of(false);
      }),
      map(() => true)
    );
  }
}
