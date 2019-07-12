import { Injectable } from '@angular/core';
import { API_URL, httpOptions } from 'app/define/apiURL';
import { Observable, of } from 'rxjs';
import { Keyskill } from 'app/model/keyskills';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { User } from 'app/model/user';


@Injectable({
  providedIn: 'root'
})
export class KeyskillsService {
  // get API URL
  private keyskillsURL = API_URL + 'skills';
  private deleteUrl = API_URL + 'profile/skills';
  //  Create a function to get data from API URL
  getKeyskills(): Observable<Keyskill[]> {
    return this.http.get<Keyskill[]>(this.keyskillsURL).pipe(
      // if get data true => run tap()
      // tap(recieveKeyskill => console.log(`receiveKeyskill= ${JSON.stringify(recieveKeyskill)}`)),
      // else return Error
      catchError(this.handleError<Keyskill[]>('getKeyskills'))
    );
  }
  getSkillCanAddForUser(): Observable<any> {
    return this.http.get<any>('https://localhost:44371/api/skills/add/user').pipe(
    // if get data true => run tap()

     //  tap( receiveFaculty => console.log(`receiveFaculty= ${JSON.stringify(receiveFaculty)}`)),
        // else return Error
      catchError( Error => of([]))
    );
 }

 getSkillCanAddForCompany(): Observable<any> {
  return this.http.get<any>('https://localhost:44371/api/skills/add/company').pipe(
  // if get data true => run tap()

   //  tap( receiveFaculty => console.log(`receiveFaculty= ${JSON.stringify(receiveFaculty)}`)),
      // else return Error
    catchError( Error => of([]))
  );
}
getAllSkillSuggestSearch(): Observable<any> {
  return this.http.get<any>('https://localhost:44371/api/search/key-suggest').pipe(
  // if get data true => run tap()

   //  tap( receiveFaculty => console.log(`receiveFaculty= ${JSON.stringify(receiveFaculty)}`)),
      // else return Error
    catchError( Error => of([]))
  );
}
  // End Get Key skill
    // get by id
    getKeyskillsByID(id: number): Observable<Keyskill> {
      const url = `${this.keyskillsURL}/${id}`;
      return this.http.get<Keyskill>(url).pipe(
        tap(_ => console.log(`fetched keyskills id=${id}`)),
        catchError(this.handleError<Keyskill>(`getKeyskillsByID id=${id}`))
      );
    }
    //  end
  // Add Key Skill
addKeyskills(keyskill: any): Observable<Keyskill[]> {
  const url = this.keyskillsURL + '/create';
  return this.http.post<Keyskill[]>(url, keyskill, httpOptions).pipe(
    catchError(this.handleError<Keyskill[]>('addKeyskills'))
  )
}
// end add
// add keyskill to user
addKeys(keyskill: any): Observable<Keyskill[]> {
  const url =  API_URL + 'profile/skills';
  return this.http.put<Keyskill[]>(url, keyskill, httpOptions).pipe(
    catchError(this.handleError<Keyskill[]>('addKeys'))
  )
}
// add keyskill to user
// delete keyskill of user
deleteKeys(id: any): Observable<Keyskill[]> {
  const url = `${this.deleteUrl}/${id}`;
    // const url = this.deleteUrl;
  return this.http.delete<Keyskill[]>(url, httpOptions).pipe(
    tap(recieveKeys => console.log(`receiveKeys= ${JSON.stringify(recieveKeys)}`)),
    catchError(this.handleError<Keyskill[]>('deleteKeyskills'))
  )
}
// delete keyskill of user
// update key skill
updateKeyskills(keyskill: Keyskill): Observable<Keyskill[]> {
  const url = `${this.keyskillsURL}/${keyskill.id}`;
  return this.http.put<Keyskill[]>(url, keyskill, httpOptions).pipe(
    catchError(this.handleError<Keyskill[]>('updateKeyskills'))
    )
}
// ENd update key skill
  // Delete Key skill
  deleteKeyskills(id: number): Observable<Keyskill[]> {
    const url = `${this.keyskillsURL}/${id}`;
    return this.http.delete<Keyskill[]>(url, httpOptions).pipe(
      tap(recieveKeyskill => console.log(`receiveFaculty= ${JSON.stringify(recieveKeyskill)}`)),
      catchError(this.handleError<Keyskill[]>('deleteKeyskills'))
    )
  }
  // End key Skill
  // handle Error
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  // add keyskill to user
addKeyscompany(keyskill: any): Observable<Keyskill[]> {
  const url =  API_URL + 'companies/user/skills';
  return this.http.post<Keyskill[]>(url, keyskill, httpOptions).pipe(
    catchError(this.handleError<Keyskill[]>('addKeys'))
  )
}
// add keyskill to user
// delete keyskill of user
deleteKeyscompany(id: any): Observable<Keyskill[]> {
  const url = `${API_URL}companies/user/skills/${id}`;
    // const url = this.deleteUrl;
  return this.http.delete<Keyskill[]>(url, httpOptions).pipe(
    tap(recieveKeyscompany => console.log(`receiveKeyscompany= ${JSON.stringify(recieveKeyscompany)}`)),
    catchError(this.handleError<Keyskill[]>('deleteKeyskillscompany'))
  )
}
// delete keyskill of user


  constructor(private http: HttpClient) { }
}
