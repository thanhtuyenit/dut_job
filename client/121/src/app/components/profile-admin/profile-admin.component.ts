import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormArray, NgForm } from '@angular/forms';
import { Keyskill } from 'app/model/keyskills';
import { AuthenticationService } from 'app/services/authentication.service';
import { User } from 'app/model/user';
import { KeyskillsService } from 'app/services/keyskills.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertmessageService } from 'app/services/alertmessage.service';
import { Profile } from 'app/model/profile';
import { Faculty } from 'app/model/faculty';
import { ListfacultyService } from 'app/services/listfaculty.service';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.scss']
})
export class ProfileAdminComponent implements OnInit, OnDestroy {
show: Boolean;
user: User;
facultyCurrentUser: Faculty;
// faculty: User[] = [];
skillList: Keyskill[] = [];

facultyList: Faculty[] = [];

 // create subscription
 private subscription: Subscription;
 // create message
message: any;
  constructor(private auth: AuthenticationService,
              private  KeyskillService: KeyskillsService,
              private router: Router,
              private alertService:  AlertmessageService,
              private listfacultyService: ListfacultyService ) {
  }

  ngOnInit() {
     this.profile();
     this.getFacultyFromService();
     this.getKeyskillFromService();
     this.subscription = this.alertService.getMessage().subscribe(message => {
      this.message = message;
  });
  }
ngOnDestroy() {
  this.subscription.unsubscribe();
}
  getKeyskillFromService(): void {
    // Get data from function which get data (API URL) in service and convert
    this. KeyskillService.getKeyskills().subscribe(
      value => {
        // if code api true
        if (value['code'] === 200) {
          // fetch data to interface of model
          this.skillList = value['data'];
         // console.log(this.keyskill);
        } else {
          alert(value['code']);
        }
    },
    err => {
      if ( err.status = 400) {
        // show message
        this.alertService.error('Some thing Wrong!');
      } else {
        console.log(err);
      }
         }
    )

  }
  profile(): void {
    this.auth.profile().subscribe(value => {
      if (value['code'] === 200) {
        this.user = value['data'];
        this.facultyCurrentUser  = value['data'].faculty;

        // this.faculty =  value['data'].faculty;
        // console.log(this.user1);
        // console.log(this.user);
      } else {
          alert(value['code']);
      }
  },
  error => console.log(error)
  )
    }
    updateprofile(form: NgForm): void {
      this.auth.updateprofile(form).subscribe(res => {
        // this.router.navigate(['/typography']);
        console.log(form)
        // this.profile();
        }, (err: any) => {
          console.log(err);
        }
      );

    }
    addKey(form: NgForm) {
      // alert(this.keyskill);
      this.KeyskillService.addKeys(form)
        .subscribe(res => {
            console.log(form)
            this.profile();
          }, (err) => {
            if ( err.status = 400) {
              // show message
              this.alertService.error('Something go Wrong!');
            } else {
              console.log(err);
            }
               });
    }
    deleteKey(id: any ) {
      if (confirm('Are you sure to delete this record?')) {
        this.KeyskillService.deleteKeys(id)
        .subscribe(res => {
          console.log(id)
            this.profile();
          }, (err) => {
            console.log(err);
          }
        );
      }
    }
    getFacultyFromService(): void {
      this.listfacultyService.getfaculty().subscribe(
        value => {
          if (value['code'] === 200) {
            this.facultyList = value['data'];
            // console.log(this.faculty);
          } else {
              alert(value['code']);
          }
      },
      error => console.log(error)
      )
     }
}

