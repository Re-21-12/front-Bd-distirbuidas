import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { CorreoElectronico } from '../models/correo';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class CorreoElectronicoService {
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
  getAllCorreos(): Observable<CorreoElectronico[]> {
    return this.http.get<CorreoElectronico[]>(this.apiUrl).pipe(
      catchError(this.handleError<CorreoElectronico[]>('getAllCorreos', []))
    );
  }

  /**
   * Obtiene correos por persona
   */
  getCorreosByPersona(idPersona: number): Observable<CorreoElectronico[]> {
    return this.http.get<CorreoElectronico[]>(`${this.apiUrl}/by-persona/${idPersona}`).pipe(
      catchError(this.handleError<CorreoElectronico[]>('getCorreosByPersona', []))
    );
  }

  /**
   * Obtiene un correo electrónico por dirección
   */
  getCorreoByEmail(correo: string): Observable<CorreoElectronico | undefined> {
    return this.http.get<CorreoElectronico>(`${this.apiUrl}/${correo}`).pipe(
      catchError(this.handleError<CorreoElectronico>(`getCorreoByEmail correo=${correo}`))
    );
  }

  /**
   * Crea un nuevo correo electrónico
   */
  createCorreo(correo: CorreoElectronico): Observable<CorreoElectronico> {
    return this.http.post<CorreoElectronico>(this.apiUrl, correo, this.httpOptions).pipe(
      catchError(this.handleError<CorreoElectronico>('createCorreo'))
    );
  }

  /**
   * Actualiza un correo electrónico existente
   */
  updateCorreo(correo: CorreoElectronico): Observable<boolean> {
    return this.http.put(`${this.apiUrl}/${correo.correo}`, correo, this.httpOptions).pipe(
      map(() => true),
      catchError(this.handleError<boolean>('updateCorreo'))
    );
  }

  /**
   * Elimina un correo electrónico
   */
  deleteCorreo(correo: string): Observable<boolean> {
    return this.http.delete(`${this.apiUrl}/${correo}`, this.httpOptions).pipe(
      map(() => true),
      catchError(this.handleError<boolean>('deleteCorreo'))
    );
  }

  /**
   * Valida formato de correo electrónico
   */
  validarFormatoCorreo(correo: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
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
