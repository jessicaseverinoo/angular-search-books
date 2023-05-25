import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Item, LivrosResultado } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  private readonly API = 'https://www.googleapis.com/books/v1/volumes';
  constructor(private http: HttpClient) {}

  buscar(valorDigitado: string): Observable<LivrosResultado> {
    const params = new HttpParams().append('q', valorDigitado);
    return this.http.get<LivrosResultado>(this.API, { params });
    // .pipe(map((resultado) => resultado.items ?? []));
  }
}

// Anotações
// Pipe: O pipe serve para agrupar diversos tipos de operadores
// Tap: o tap é como se fosse um espião, ele é utilizado apenas para debug, ou seja,
// ele não modifica os dados, serve apenas para visualizá-los
//
// Exemplo
//                 Tap
// ObservableA --- a-1 --- Observer
//     Nenhum efeito colateral
