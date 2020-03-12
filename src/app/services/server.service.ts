import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServerMessage } from '../shared/server-message';
import { Server } from '../shared/server';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  // https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4

  constructor(private http: HttpClient) {
  }

  getServers(): Observable<Server[]> {
    return this.http.get<Server[]>('https://localhost:44347/api/server')
    .pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';

    console.log(errMsg);
    return throwError(errMsg);
  }

  handleServerMessage(msg: ServerMessage): Observable<Response> {
    const url = 'https://localhost:44347/api/server/' + msg.id;
    return this.http.put<Response>(url, msg, httpOptions);
  }
}
