import { Component, OnInit, OnDestroy } from '@angular/core';
import { Company } from 'app/model/company';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanylistService } from 'app/services/companylist.service';
import { JobService } from 'app/services/jobs/job.service';
import { Job } from 'app/model/job';
import { JobType } from 'app/model/jobType';
import { Keyskill } from 'app/model/keyskills';
import { KeyskillsService } from 'app/services/keyskills.service';
import { Subscription } from 'rxjs';
import { AlertmessageService } from 'app/services/alertmessage.service';

@Component({
  selector: 'app-companyjob-detail',
  templateUrl: './companyjob-detail.component.html',
  styleUrls: ['./companyjob-detail.component.scss']
})
export class CompanyjobDetailComponent implements OnInit {
  job: Job;
  // skills: Keyskill[] = [];
  company: Company;
  companyID: string;
  jobType: JobType;
  allJobByCompanyID: Job[] = [];
  message: any;
  private subscription: Subscription;
  checker: any = 0;
    // Create a interface of Service
  constructor(private jobService: JobService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private KeyskillService: KeyskillsService,
              private companyService: CompanylistService,
              private alertService:  AlertmessageService) { }

  getDetailJobByJobID(id: any): void {
  this.jobService.getdetailjob(id).subscribe(
    value => {
      if (value['code'] === 200) {
        this.job = value['data'];
        this.company = value['data'].company;
        this.jobType = value['data'].jobType;
        this.companyID = value['data'].company.id;
        this.getAllJobByBCompanyIDPublic(this.companyID);
      } else {
          alert('Something error!');
      }
  },
  error => console.log(error)
  )
     }

    //  getKeyskillFromService(): void {
    //   // Get data from function which get data (API URL) in service and convert
    //   this.KeyskillService.getKeyskills().subscribe(
    //     value => {
    //       // if code api true
    //       if (value['code'] === 200) {
    //         // fetch data to interface of model
    //         this.skills = value['data'];
    //         // console.log(this.skills);
    //       } else {
    //           alert('Something error!');
    //       }
    //   },
    //   error => console.log(error)
    //   )
    // }

    //get job for student see without job isDisplay==false or expired
    getAllJobByBCompanyIDPublic(id: any): void {
      //  console.log()
      this.companyService.getjobcompanybyIDPublic(id).subscribe(
        value => {
          if (value['code'] === 200) {
            this.allJobByCompanyID = value['data'].items;
            // console.log('allJobByCompanyID'+this.allJobByCompanyID);
          } else {
              alert('Something error!');
          }
      },
      error => console.log(error)
      )
         }
        //  load() {
        //    return window.location.reload();
        //  }

        checklogin() {
          if (localStorage.getItem('usertoken') != null) {
            this.checker = localStorage.getItem('role');
          } else { this.checker = 0; }
          console.log('role: ' + this.checker);
        }
        
  ngOnInit() {
    this.getDetailJobByJobID(this.activatedRoute.snapshot.params['id']);
    this.checklogin();
    // this.getKeyskillFromService();
    //this.getjobcompanybyIDPublic(localStorage.getItem('CompanyID'));
  }
  // ngOnDestroy() {
  //   if (this.subscription) {
  //     this.subscription.unsubscribe();
  //   }
  // }

}
