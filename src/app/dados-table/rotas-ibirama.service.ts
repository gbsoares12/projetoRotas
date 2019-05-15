import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError} from '../mensagens/http-error-handler.service';

import { Rota } from './Rota';

export class RotasFiltro {

  nomeRua: string;
  bairro: string;
  tipoColeta: string;

}

@Injectable()
export class RotasIbiramaService {
  rotasUrl = 'http://localhost:8080/rotasIbirama';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('RotasIbiramaService');
  }

    /** GET heroes from the server */
  getRotas(): Observable<Rota[]> {
    return this.http.get<Rota[]>(this.rotasUrl)
      .pipe(
        catchError(this.handleError('getRotas', []))
      );
  }

   /* GET rotas whose name contains search term */
   searchRotas(filtro: string): Observable<Rota[]> {
    filtro = filtro.trim();
  //console.log(filtro);
    // Add safe, URL encoded search parameter if there is a search term
    const options = filtro ?
     { params: new HttpParams().set('name', filtro) } : {};

    return this.http.get<Rota[]>(this.rotasUrl, options)
      .pipe(
        catchError(this.handleError<Rota[]>('searchRotas', []))
      );
  }

}

