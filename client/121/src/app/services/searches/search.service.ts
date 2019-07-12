import { Injectable } from '@angular/core';
import { API_URL } from 'app/define/apiURL';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private jobURL = API_URL + 'search';

  private companyNameURL = API_URL + 'all/company/name';
  private ListjobbyskillnameURL = API_URL + 'search/jobs'

  constructor(private http: HttpClient) { }

  getAllCompanyName(): Observable<any> {
    return this.http.get(this.companyNameURL).pipe(
      // if get data true => run tap()
        // tap( receiveCompanyName => console.log(`receiveCompanyName= ${JSON.stringify(receiveCompanyName)}`)),
          // else return Error
        catchError( Error => of([]))
      );
  }

  getAlljobByskillname(name: any, condition: any): Observable<any> {
    // const url = `${this.ListjobbyskillnameURL}${name}`
    return this.http.get<any>(this.ListjobbyskillnameURL + '?keyword=' + name +
                                                            '&PageNumber=' + condition.PageNumber +
                                                            '&PageSize=' + condition.PageSize).pipe(
      // tap(_ => console.log(`fetched company id=${id}`)),
      catchError(this.handleError<any>(`getjobbyName name=${name}`))
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
}
