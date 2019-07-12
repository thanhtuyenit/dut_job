import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, httpOptions } from 'app/define/apiURL';
import { Observable, of } from 'rxjs';
import { Post } from 'app/model/post_job';
import { catchError, tap } from 'rxjs/operators';
import { TypeJob } from 'app/model/typeJob';
@Injectable({
  providedIn: 'root'
})
export class PostJobService {
  private postURL = API_URL + 'jobs/user/create';
  private typeJobURL = API_URL + 'type/jobs';
  private allJobbyCompany = API_URL + 'jobs/user';

  createPost(postJob: any): Observable<any> {
    return this.http.post<any>(this.postURL, postJob, httpOptions).pipe(
      catchError(this.handleError<any>('addpost'))
    )
  }

  getTypejob(): Observable<TypeJob[]> {
    return this.http.get<TypeJob[]>(this.typeJobURL).pipe(
      // if get data true => run tap()
        tap( receiveTypeJob => console.log(`receiveTypeJob= ${JSON.stringify(receiveTypeJob)}`)),
          // else return Error
        catchError( Error => of([]))
      );
  }
  
  getALljobByCompany(condition: any): Observable<any>  {
    return this.http.get<any>(this.allJobbyCompany + '?PageNumber=' + condition.PageNumber + '&PageSize=' + condition.PageSize).pipe(
      catchError(this.handleError<any>('getalljob'))
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
