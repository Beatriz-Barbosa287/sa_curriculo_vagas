import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curriculos } from '../models/curriculo.model'; // Adjust the path as needed

@Injectable({
  providedIn: 'root'
})
export class CurriculoService {

  private apiUrl = 'http://localhost:3009/curriculos';
  getCurriculos(): Observable<Curriculos[]> {
    return this.http.get<Curriculos[]>(this.apiUrl);
  }

  constructor(private http: HttpClient) { }

  getCurriculoByUsuarioId(usuarioId: number): Observable<Curriculos[]> {
    return this.http.get<Curriculos[]>(`${this.apiUrl}?usuarioId=${usuarioId}`);
  }

  createCurriculos(curriculos: Curriculos): Observable<Curriculos> {
    return this.http.post<Curriculos>(this.apiUrl, curriculos);
  }

  updateCurriculos(curriculos: Curriculos): Observable<Curriculos> {
    return this.http.put<Curriculos>(`${this.apiUrl}/${curriculos.id}`, curriculos);
  }

  deleteCurriculos(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}