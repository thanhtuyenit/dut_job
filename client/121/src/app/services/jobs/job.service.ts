import { Injectable } from '@angular/core';
import { API_URL, httpOptions } from 'app/define/apiURL';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Job } from 'app/model/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private jobURL = API_URL + 'jobs';
  private detailjobURL = API_URL + 'jobs/public';
  private appliyJob = API_URL + 'jobs/applied/user';
  private recentjobURL = API_URL + 'jobs/public/top8';
  private applynNewJob = API_URL + 'jobs/apply'
  private allJobbyCompany = API_URL + 'jobs/user';
  private jobbyfacultyURL = API_URL + 'jobs/public/faculty/'
  constructor(private http: HttpClient) {
  }

  getAllRecentJob(): Observable<any> {
    return this.http.get(this.recentjobURL).pipe(
      catchError(Error => of([]))
    )

  }

  getAllJobsAdmin(condition: any): Observable<any> {
    return this.http.get(this.jobURL + '?PageNumber=' + condition.PageNumber +
                                        '&PageSize=' + condition.PageSize +
                                        '&Sort=' + condition.Sort +
                                        '&Type=' + condition.Type);
  }

  getAllJobsCompany(condition: any): Observable<any> {
    return this.http.get(this.allJobbyCompany + '?PageNumber=' + condition.PageNumber +
                                        '&PageSize=' + condition.PageSize +
                                        '&Sort=' + condition.Sort +
                                        '&Type=' + condition.Type);
  }

  getJobApplied(): Observable<any> {
    return this.http.get(this.appliyJob);
  }

  changeStatusJob(id: any): Observable<any> {
    const url = `${this.jobURL}/review/${id}`;
    return this. http.put<any>(url, id, httpOptions).pipe(
      catchError(this.handleError<any>('review user'))
    )
  }

       // get by id
    getJobByIDAdmin(id: any): Observable<any> {
    const url = `${this.jobURL}/${id}`;
    return this.http.get<Job>(url).pipe(
      tap(_ => console.log(`fetched User id=${id}`)),
      catchError(this.handleError<Job>(`getuserlistByID id=${id}`))
    );
  }

  getdetailjob(id: any): Observable<any> {
  const url = `${this.detailjobURL}/${id}`;
  return this.http.get<Job>(url).pipe(
  tap(_ => console.log(`fetched job id=${id}`)),
  catchError(this.handleError<Job>(`getdetailjob id=${id}`))
  );
  }

  // handle Error
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  applyNewJob(apply: any): Observable<any> {
    const url = this.applynNewJob;
    return this.http.post<any>(url, apply, httpOptions).pipe(
      catchError(this.handleError<any>('Something error.'))
    )
  }
  getalljobfaculty(id: any): Observable<any> {
    const url = `${this.jobbyfacultyURL}/${id}`;
    return this. http.get<any>(url, id).pipe(
      catchError(this.handleError<any>('Job faculty'))
    )
  }

  dashboard(): Observable<any> {
    return this.http.get(API_URL+'dashboard');
  }

}
