import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, httpOptions } from 'app/define/apiURL';
import { Observable, of } from 'rxjs';
import { User } from 'app/model/user';
import { tap, catchError, map } from 'rxjs/operators';
import { PARAMETERS } from '@angular/core/src/util/decorators';

@Injectable({
  providedIn: 'root'
})
export class UserlistService {
   // get API URL
   private userlistURL = API_URL + 'users';
   private userinfoURL = API_URL + 'profile'
   getuserlist(): Observable<User[]> {
    return this.http.get<User[]>(this.userlistURL).pipe(
    // if get data true => run tap()
      tap( receiveUserlist => console.log(`receiveUserlist= ${JSON.stringify(receiveUserlist)}`)),
      // map((data: any) => data.result),
        // else return Error
      catchError( Error => of([]))
    );
  }

  getUserListCondition(condition: any): Observable<User[]> {
    return this.http.get<User[]>(this.userlistURL + '?PageNumber=' + condition.PageNumber +
                                                    '&PageSize=' + condition.PageSize +
                                                    '&Sort=' + condition.Sort +
                                                    '&Type=' + condition.Type).pipe(
    // if get data true => run tap()
      tap( receiveUserlist => console.log(`receiveUserlist= ${JSON.stringify(receiveUserlist)}`)),
      // map((data: any) => data.result),
        // else return Error
      catchError( Error => of([]))
    );
  }
     // get by id
     getuserlistByID(userID: number): Observable<User> {
      const url = `${this.userinfoURL}/${userID}`;
      return this.http.get<User>(url).pipe(
        tap(_ => console.log(`fetched User id=${userID}`)),
        catchError(this.handleError<User>(`getuserlistByID id=${userID}`))
      );
    }
    //  end
        // handle Error
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  changeStatusUser(userID: any): Observable<any> {
    const url = `${this.userlistURL}/review/${userID}`;
    return this. http.put<any>(url, userID, httpOptions).pipe(
      catchError(this.handleError<any>('review user'))
    )
  }

  constructor(private http: HttpClient) { }
}
