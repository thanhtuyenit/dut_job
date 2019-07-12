import { Component, OnInit } from '@angular/core';
import { Job } from 'app/model/job';
import { Keyskill } from 'app/model/keyskills';
import { Company } from 'app/model/company';
import { JobType } from 'app/model/jobType';
import { Subscription } from 'rxjs';
import { JobService } from 'app/services/jobs/job.service';
import { Router, ActivatedRoute } from '@angular/router';
import { KeyskillsService } from 'app/services/keyskills.service';
import { CompanylistService } from 'app/services/companylist.service';
import { AlertmessageService } from 'app/services/alertmessage.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { User } from 'app/model/user';
import { Faculty } from 'app/model/faculty';
import { NgForm } from '@angular/forms';
import { ApplyJob } from 'app/model/applyJob';
import { HttpEventType, HttpClient, HttpRequest } from '@angular/common/http';
import swal from 'sweetalert';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-apply-new-job',
  templateUrl: './apply-new-job.component.html',
  styleUrls: ['./apply-new-job.component.scss']
})
export class ApplyNewJobComponent implements OnInit {

  job: Job;
  keyskill: Keyskill[] = [];
  company: Company;
  companyID: string;
  allJobByCompanyID: Job[] = [];
  message: any;
  checker: any = 0;
  userName: any = localStorage.getItem('userName');
  userCurrent: User;
  facultyCurrentUser: Faculty;
  public urlCV: string;
  public cvName: string;
  private subscription: Subscription;
  applyJob: ApplyJob;
  public progress: number;
  constructor(private JobsService: JobService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private KeyskillService: KeyskillsService,
              private companylistService: CompanylistService,
              private alertService:  AlertmessageService,
              private auth: AuthenticationService,
              private http: HttpClient,
              private _sanitizer: DomSanitizer) {
                this.applyJob = new ApplyJob();
              }

  getDetailJobByID(id: any): void {
    this.JobsService.getdetailjob(id).subscribe(
      value => {
        if (value['code'] === 200) {
          this.job = value['data'];
          this.company = value['data'].company;
          this.companyID = value['data'].company.id;
          this.applyJob.postID =  this.job.id;
          this.getAllJobByCompanyIDPublic(this.companyID);
        } else {
            alert('Something error!');
        }
    },
    error => console.log(error)
    )
  }

  getAllJobByCompanyIDPublic(id: any): void {
    this.companylistService.getjobcompanybyIDPublic(id).subscribe(
      value => {
        if (value['code'] === 200) {
          this.allJobByCompanyID = value['data'].items;
        } else {
            alert(value['error']);
        }
    },
    error => console.log(error)
    )
       }

  checklogin() {
  if (localStorage.getItem('usertoken') != null) {
    this.checker = localStorage.getItem('role');
  } else { this.checker = 0; }
  console.log('role: ' + this.checker);
}

  profile(): void {
    this.auth.profile().subscribe(value => {
      if (value['code'] === 200) {
        this.userCurrent = value['data'];
        this.facultyCurrentUser  = value['data'].faculty;
        this.cvName = this.userCurrent.cvLink;
        this.urlCV = 'https://localhost:44371/cv/' + this.userCurrent.cvLink;
        this.applyJob.coverLeter = this.userCurrent.aboutMe;
      } else {
          alert('Something error!');
      }
  },

  error => console.log(error)
  )}

  openCV() {
    window.open(this.urlCV);
  }

  applyNewJob() {
    this.JobsService.applyNewJob(this.applyJob)
      .subscribe(value => {
        swal('Success!', 'Thank for your apply! We will send it to company!', 'success').then(() =>     this.router.navigate(['/index']))
        // if(value['code'] === 200){
        //   swal('Success!', 'Thank for your apply! We will send it to company!', 'success').then(() =>     this.router.navigate(['/index']))
        // }else{
        //   swal('Error!', 'Something error with your apply.', 'error').then(() =>     this.router.navigate(['/index']))
        // }
        
        }, (err) => {
          console.log(err);
        });
  }

  upload(files: any) {  if (files.length === 0) {
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
     // window.location.reload();
    }
  });
}

  getBackground(image: any) {
    return this._sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${image})`);
  }

  ngOnInit() {
    this.getDetailJobByID(this.activatedRoute.snapshot.params['id']);
    this.checklogin();
    this.profile();
  }

}
