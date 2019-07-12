import { Injectable } from '@angular/core';
import { API_URL, httpOptions } from 'app/define/apiURL';
import { Observable, of } from 'rxjs';
import { Faculty } from 'app/model/faculty';
import { tap, catchError } from 'rxjs/operators';
import { Company } from 'app/model/company';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanylistService {
    // get API URL
    private companyURL = API_URL + 'companies';
    private listcompanyURL = API_URL + 'companies/faculty';
    private jobcompanyURL = API_URL + 'jobs/public/company';
    private profilecompanybyUserID_URL = API_URL + 'companies/user';
    
    //  Create a function to get data from API URL
   getcompany(condition: any): Observable<Company[]> {
      return this.http.get<Company[]>(this.companyURL + '?PageNumber=' + condition.PageNumber +
                                                        '&PageSize=' + condition.PageSize +
                                                        '&Sort=' + condition.Sort +
                                                        '&Type=' + condition.Type).pipe(
      // if get data true => run tap()
        tap( receiveCompany => console.log(`receiveCompany= ${JSON.stringify(receiveCompany)}`)),
          // else return Error
        catchError( Error => of([]))
      );
   }
   getcompanybyID(id: number): Observable<Company> {
     const url = `${this.companyURL}/${id}`
     return this.http.get<Company>(url).pipe(
      tap(_ => console.log(`fetched company id=${id}`)),
      catchError(this.handleError<Company>(`getcompanybyID id=${id}`))
     )
   }
   getcompanybyfacultyID(id: number): Observable<any> {
    const url = `${this.listcompanyURL}/${id}`
     return this.http.get<Company>(url).pipe(
      tap(_ => console.log(`fetched faculty id=${id}`)),
      catchError(this.handleError<Company>(`getcompanybyfacultyID id=${id}`))
     )
   }

   getjobcompanybyID(id: number): Observable<any> {
    const url = `${this.jobcompanyURL}/${id}`
     return this.http.get<Company>(url).pipe(
      tap(_ => console.log(`fetched company id=${id}`)),
      catchError(this.handleError<Company>(` getjobcompanybyID id=${id}`))
     )
   }

   getjobcompanybyIDPublic(id: number): Observable<any> {
     // console.log('id of company: '+id)
    const url = `https://localhost:44371/api/jobs/public/company/${id}?PageNumber=1&PageSize=10`
     return this.http.get<Company>(url).pipe(
      tap(_ => console.log(`fetched company id=${id}`)),
      catchError(this.handleError<Company>(` getjobcompanybyID id=${id}`))
     )
   }

   // get profile of current user
   getprofilecompanybyUserID(): Observable<Company[]> {
    return this.http.get<Company[]>(this.profilecompanybyUserID_URL).pipe(
    // if get data true => run tap()
      tap( receiveProfileCompany => console.log(`receiveProfileCompany= ${JSON.stringify(receiveProfileCompany)}`)),
        // else return Error
      catchError( Error => of([]))
    );
 }
     // Add Company
     addcompany(company: any): Observable<Company[]> {
      const url = this.companyURL + '/create';
            return this.http.post<Company[]>(url, company, httpOptions).pipe(
              catchError(this.handleError<Company[]>('addcompany'))
            )
     }
  // ENd- Add Company
    // Delete Company
    deletecompany(id: number): Observable<Company[]> {
    const url = `${this.companyURL}/${id}`;
    return this.http.delete<Company[]>(url, httpOptions).pipe(
      catchError(this.handleError<Company[]>('deletecompany'))
    )
    }
      // End delete Company
        // Update Company
  updatecompany(company: any): Observable<any> {
    const url = `${this.companyURL}/user/${company.id}`;
    return this.http.put<Company[]>(url, company, httpOptions).pipe(
      catchError(this.handleError<Company[]>('updatecompany'))
    )
  }
  // End Update Company
       // handle Error
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
