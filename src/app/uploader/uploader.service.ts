import { Injectable } from '@angular/core';
import {
  HttpClient, HttpEvent, HttpEventType, HttpProgressEvent,
  HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders, HttpParams
} from '@angular/common/http';

import { of } from 'rxjs';
import { catchError, last, map, tap } from 'rxjs/operators';

import { MessageService } from '../mensagens/message.service';

@Injectable()
export class UploaderService {
  constructor(
    private http: HttpClient,
    private messenger: MessageService) { }
  // If uploading multiple files, change to:
  upload(file: File) {
    const user = sessionStorage.getItem('basicauth');

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: user
      })
    };

    const headers = new HttpHeaders({
      Authorization: user
    });

    const formData = new FormData(); // Por que o form data ta vazio?

    formData.append('file', file);

    const req = new HttpRequest('POST', 'https://rotas-lixo-ibirama-api.herokuapp.com/upload', formData, {
      headers,
      reportProgress: true
    });

    return this.http.request(req).pipe(
      map(event => this.getEventMessage(event, file)),
      tap(message => this.showProgress(message)),
      last(), // return last (completed) message to caller
      catchError(this.handleError(file)));

  }

  /** Return distinct message for sent, upload progress, & response events */
  private getEventMessage(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Uploading file "${file.name}" of size ${file.size}.`;

      case HttpEventType.UploadProgress:
        // Compute and show the % done:
        const percentDone = Math.round(100 * event.loaded / event.total);
        return `File "${file.name}" is ${percentDone}% uploaded.`;

      case HttpEventType.Response:
        return `Arquivo "${file.name}" foi enviado com sucesso!`;

      default:
        return `File "${file.name}" surprising upload event: ${event.type}.`;
    }
  }

  /**
   * Returns a function that handles Http upload failures.
   * @param file - File object for file being uploaded
   *
   * When no `UploadInterceptor` and no server,
   * you'll end up here in the error handler.
   */
  private handleError(file: File) {
    const userMessage = `erro ao enviar o arquivo ${file.name}.`;

    return (error: HttpErrorResponse) => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      const message = (error.error instanceof Error) ?
        error.error.message :
        `server returned code ${error.status} with body "${error.error}"`;

      this.messenger.add(`${userMessage} ${message}`);

      // Let app keep running but indicate failure.
      return of(userMessage);
    };
  }

  private showProgress(message: string) {
    this.messenger.add(message);
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
