import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'app/model/user';
import { Keyskill } from 'app/model/keyskills';
import { Faculty } from 'app/model/faculty';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'app/services/authentication.service';
import { KeyskillsService } from 'app/services/keyskills.service';
import { Router } from '@angular/router';
import { AlertmessageService } from 'app/services/alertmessage.service';
import { ListfacultyService } from 'app/services/listfaculty.service';

import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http'
import { JobService } from 'app/services/jobs/job.service';
import { ApplyJob } from 'app/model/applyJob';
@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit, OnDestroy {

show: Boolean;
user: User;
facultyCurrentUser: Faculty;
skillList: Keyskill[] = [];
facultyList: Faculty[] = [];
role: any = localStorage.getItem('role');
private subscription: Subscription;
public progress: number;
public message: string;
public urlCV: string;
public cvName: string;
public appliedJobList: ApplyJob;

  constructor(private auth: AuthenticationService,
              private KeyskillService: KeyskillsService,
              private router: Router,
              private alertService:  AlertmessageService,
              private listfacultyService: ListfacultyService,
              private http: HttpClient,
              private jobService: JobService) {}

  ngOnInit() {
    this.getAppliedJob();
    this.profile();
    this.getFacultyFromService();
    this.getSkillCandAddForUser();
    this.subscription = this.alertService.getMessage().subscribe(message => {this.message = message; });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getSkillCandAddForUser(): void {
    this.KeyskillService.getSkillCanAddForUser().subscribe(
      value => {
        if (value['code'] === 200) {
          this.skillList = value['data'];
        } else {
            alert('Somthing error!');
        }
    },
    err => {
      if ( err.status = 400) {
        this.alertService.error('Something error!');
      } else {
        console.log(err);
      }
    }
  )}

  profile(): void {
    this.auth.profile().subscribe(value => {
      if (value['code'] === 200) {
        this.user = value['data'];
        this.facultyCurrentUser  = value['data'].faculty;
        this.cvName = this.user.cvLink;
        this.urlCV = "https://localhost:44371/cv/"+this.user.cvLink;
      } else {
          alert(value['code']);
      }
  },
  error => console.log(error)
  )}

  openCV() {
    window.open(this.urlCV);
  }

  updateprofile(form: NgForm): void {
    this.auth.updateprofile(form).subscribe(res => {
      console.log(form)
      }, (err: any) => {
        console.log(err);
      }
    );
  }

  addKey(form: NgForm) {
    this.KeyskillService.addKeys(form)
      .subscribe(res => {
        this.profile();
        this.getSkillCandAddForUser();
      }, (err) => {
        if ( err.status = 400) {
          this.alertService.error('Something error!');
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
          this.getSkillCandAddForUser();

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
        } else {
            alert('Something error!');
        }
    },
    error => console.log(error)
  )}

  getAppliedJob(): void {
    this.jobService.getJobApplied().subscribe(
      value => {
        if (value['code'] === 200) {
          this.appliedJobList = value['data'];
        } else {
            alert('Something error!');
        }
    },
    error => console.log(error)
  )}

  upload(files: any) {    
    if (files.length === 0) {
      return;
    }    
    const formData = new FormData();
    for (const file of files) {
      formData.append(file.name, file);
    }     
    const uploadReq = new HttpRequest('POST', `https://localhost:44371/api/upload`, formData, {
      reportProgress: true,
    });
    this.http.request(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event.type === HttpEventType.Response) {
        this.message = event.body.toString(); 
        this.profile();
      }
    });
    
  }
}
