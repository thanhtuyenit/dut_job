import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, httpOptions } from 'app/define/apiURL';
import { User } from 'app/model/user';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChangePassService {
  private changepassURL = API_URL + 'users/password';
  updatePassword(user: any): Observable<User[]> {
    return this.http.put<User[]>(this.changepassURL, user, httpOptions).pipe(
      catchError(this.handleError<User[]>('updatePassword'))
      )
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) { }
}
