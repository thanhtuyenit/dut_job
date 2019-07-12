import { Component, OnInit, OnDestroy } from '@angular/core';
import { TokenPayload, AuthenticationService } from 'app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertmessageService } from 'app/services/alertmessage.service';
import { AuthGuard } from 'app/_guard/auth.guard';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  // create subscription
  private subscription: Subscription;
   // create message
  message: any;
  // create interface credentials
  credentials: TokenPayload = {
    id: 0,
    username: '',
    password: ''
};
returnURL: string;
token: string;
role: string;
roleName: string;
userName: string;
constructor(private auth: AuthenticationService,
   private router: Router,
    private alertService:  AlertmessageService,
    // private route: ActivatedRoute
    ) {  }
ngOnInit() {
  this.subscription = this.alertService.getMessage().subscribe(message => {
      this.message = message;
  });
    // reset login status
    this.auth.logout();
       // get return url from route parameters or default to '/'
      //  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}

ngOnDestroy() {
  this.subscription.unsubscribe();
}
login () {
    this.auth.login(this.credentials).pipe(first()).subscribe(
      // get token
        //  () => {
          value => {
            // =========
          if (value['code'] === 200) {
            this.token = value['data'].token;
            this.role = value['data'].role.id;
            this.roleName = value['data'].role.name;
            this.userName = value['data'].username;
            console.log(this.token);
          } else {
              alert(value['error']);
          }
          // window.localStorage.removeItem('usertoken');
          localStorage.setItem('usertoken', this.token);
          localStorage.setItem('role', this.role);
          localStorage.setItem('roleName', this.roleName);
          localStorage.setItem('userName', this.userName);
          // --------
          if ( localStorage.getItem('role') === '1') {
            this.router.navigateByUrl('/dashboard');
          } else if (localStorage.getItem('role') !== '1') {
            this.router.navigateByUrl('/index');
          }

          console.log(this.role);
          console.log(this.token);
      },
        err => {
          if ( err.status = 400) {
            // show message
            this.alertService.error('Invalid Username or Password!');
          } else {
            console.log(err);
          }
             }
    );
}


  onSubmit() {
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model));
  // this.ngOnInit();
  // this.ngOnDestroy();
  this.login();
  }
}
