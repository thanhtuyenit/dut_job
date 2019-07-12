import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, BehaviorSubject} from 'rxjs';
import {map, catchError } from 'rxjs/operators';
import {Router} from '@angular/router';
import { User } from 'app/model/user';
import { httpOptions } from 'app/define/apiURL';
import { Profile } from 'app/model/profile';


export interface UserDetails {
    id: number;
    username: string;
    password: string;
    exp: number;
    iat: number;
}
interface TokenResponse {
    token: string;
}
export interface TokenPayload {
    id: number;
    username: string;
    password: string;
 }
 @Injectable()
 export class AuthenticationService {
    // private loggedIn = new BehaviorSubject<boolean>(false);
    // get isloggedin() {
    //     return this.loggedIn.asObservable(); // {2}
    //   }
     private token: string; // cũ
    //  private currentUserSubject: BehaviorSubject<User>;
    //  public currentUser: Observable<User>;
     constructor(private http: HttpClient, private router: Router) {
        // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        // this.currentUser = this.currentUserSubject.asObservable();
     }
    // public get currentUserValue(): User {
    //     return this.currentUserSubject.value;
    // }
    // cũ nè
        public saveToken(token: string): void {
             localStorage.setItem('usertoken', token);
             this.token = token;
         }
         public getToken(): string {
             if (!this.token) {
            this.token = localStorage.getItem('usertoken') ;
            }

             return this.token;
         }
         // cái cũ nè
         // Get token
         public getUserDetails(): UserDetails {
             const token = this.getToken();
             let payload;
             if (token) {
                 payload = token.split('.')[1];
                 payload = window.atob(payload);
                 return JSON.parse(payload);
             } else {
                 return null;
             }
         }
         // check token is expired
         public isLoggedIn(): boolean {
             const user = this.getUserDetails();
             if (user) {
                 return user.exp > Date.now() / 1000;
              } else {
                 return false;
             }
         }
         public register (user: TokenPayload): Observable<any> {
             console.log(user);
             return this.http.post(`https://localhost:44371/api/users/register`, user, {
                 headers : {'Content-Type': 'application/json'}
             });
         }
         public login(user: TokenPayload): Observable<any> {
             const base = this.http.post(`https://localhost:44371/api/login`, {username: user.username, password: user.password},
             {
                 headers: {'Content-Type': 'application/json', Authorization: `Bearer ${this.getToken()}`}
            });
            // console.log(user);
            const request = base.pipe(map((data: TokenResponse) => {
                // if (data && data.token ) {
                    this.saveToken(data.token);
                    // localStorage.setItem('usertoken', JSON.stringify(data.token));
                    console.log(data)
    //   }
               return data;
            }));
            return request;
         }
         public profile(): Observable<any> {
             return this.http.get(`https://localhost:44371/api/profile`, {
                 headers: {Authorization: `Bearer ${this.getToken()}`}
             });
         }
         public updateprofile(profileuser: any): Observable<any> {
            return this. http.put<any>(`https://localhost:44371/api/profile`, profileuser, httpOptions).pipe(
              catchError(this.handleError<any>('updateprofile'))
            )
          }
         public logout (): void {
            //  this.token = '';
              // remove user from local storage to log user out
             window.localStorage.removeItem('usertoken');
            //  this.router.navigateByUrl('/');

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


        }
