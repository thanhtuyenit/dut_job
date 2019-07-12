import { Injectable } from '@angular/core';
import { API_URL, httpOptions } from 'app/define/apiURL';
import { Faculty } from 'app/model/faculty';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ListfacultyService {
   // get API URL
  private facultyURL = API_URL + 'faculties';
  private facultyURLTop4 = API_URL + 'faculties/top4';
   //  Create a function to get data from API URL
  getfaculty(): Observable<Faculty[]> {
     return this.http.get<Faculty[]>(this.facultyURL).pipe(
     // if get data true => run tap()

      //  tap( receiveFaculty => console.log(`receiveFaculty= ${JSON.stringify(receiveFaculty)}`)),
         // else return Error
       catchError( Error => of([]))
     );
  }
  getfacultytop4(): Observable<Faculty[]> {
    return this.http.get<Faculty[]>(this.facultyURLTop4).pipe(
    // if get data true => run tap()

     //  tap( receiveFaculty => console.log(`receiveFaculty= ${JSON.stringify(receiveFaculty)}`)),
        // else return Error
      catchError( Error => of([]))
    );
 }
  // get by id
  getfacultyByID(id: number): Observable<Faculty> {
    const url = `${this.facultyURL}/${id}`;
    return this.http.get<Faculty>(url).pipe(
      tap(_ => console.log(`fetched faculty id=${id}`)),
      catchError(this.handleError<Faculty>(`getfacultyByID id=${id}`))
    );
  }
  //  end
  // Add Faculty
  addfaculty(faculty: any): Observable<Faculty[]> {
    const url = this.facultyURL + '/create';
    return this.http.post<Faculty[]>(url, faculty, httpOptions).pipe(
      catchError(this.handleError<Faculty[]>('addfaculty'))
    )
  }
  // ENd- Add Faculty
  // Update Faculty
  updatefaculty(faculty: Faculty): Observable<any> {
    const url = `${this.facultyURL}/${faculty.id}`;
    return this. http.put<Faculty[]>(url, faculty, httpOptions).pipe(
      catchError(this.handleError<Faculty[]>('updatefaculty'))
    )
  }
  // End Update Faculty
  // Delete Faclty
  deletefaculty (id: number): Observable<Faculty[]> {
    const url = `${this.facultyURL}/${id}`;
    return this.http.delete<Faculty[]>(url, httpOptions).pipe(
      catchError(this.handleError<Faculty[]>('deletefaculty'))
    );
  }
    // End deleteFaculty
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
