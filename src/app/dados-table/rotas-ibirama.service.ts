import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../mensagens/http-error-handler.service';

import { Rota } from './Rota';

@Injectable()
export class RotasIbiramaService {
  rotasUrl = 'https://rotas-lixo-ibirama-api.herokuapp.com/rotasIbirama';
  private handleError: HandleError;
  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('RotasIbiramaService');
  }

  /** GET rotas from the server */
  getRotas(): Observable<Rota[]> {
    return this.http.get<Rota[]>(this.rotasUrl)
      .pipe(
        catchError(this.handleError('getRotas', []))
      );
  }

  montaFiltros(nomeRua: string, bairro: string, tipoColeta: string) {
    const options1 = nomeRua || bairro || tipoColeta ?
      { params: new HttpParams().append('rua', nomeRua).append('bairro', bairro).append('coleta', tipoColeta) } : {};

    return this.http.get<Rota[]>(this.rotasUrl + '/filter', options1, )
      .pipe(
        catchError(this.handleError<Rota[]>('searchRotas', []))
      );
  }
  /* GET rotas whose name contains search term */
  searchRotas(filtro: string): Observable<Rota[]> {

    // Add safe, URL encoded search parameter if there is a search term
    const options = filtro ?
      { params: new HttpParams().set('rua', filtro) } : {};

    return this.http.get<Rota[]>(this.rotasUrl + '/filter', options)
      .pipe(
        catchError(this.handleError<Rota[]>('searchRotas', []))
      );
  }

}

