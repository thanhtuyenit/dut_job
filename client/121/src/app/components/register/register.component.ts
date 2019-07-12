import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TokenPayload, AuthenticationService } from 'app/services/authentication.service';
import { Router } from '@angular/router';
import { AlertmessageService } from 'app/services/alertmessage.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

    // create subscription
    private subscription: Subscription;
    // create message
   message: any;
   model: any;
   // create interface credentials
   credentials: TokenPayload = {
     id: 0,
     username: '',
     password: ''
 };
 constructor(private auth: AuthenticationService, private router: Router, private alertService:  AlertmessageService) {  }
 ngOnInit() {
   this.subscription = this.alertService.getMessage().subscribe(message => {
       this.message = message;
   });
 }
 ngOnDestroy() {
   this.subscription.unsubscribe();
 }
 register () {
     this.auth.register(this.credentials).subscribe(
         () => {
          this.alertService.success('Register success');
           // route to dashboard if login true
            //  this.router.navigateByUrl('/');
         },
         err => {
           if ( err.status = 400) {
             // show message
             this.alertService.error('EXITS!');
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
   this.register();
   }
}
