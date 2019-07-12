import { Component, OnInit } from '@angular/core';
import { Company } from 'app/model/company';
import { CompanylistService } from 'app/services/companylist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { KeyskillsService } from 'app/services/keyskills.service';
import { DomSanitizer } from '@angular/platform-browser';
import { JobService } from 'app/services/jobs/job.service';
import { Job } from 'app/model/job';

@Component({
  selector: 'app-companylist',
  templateUrl: './companylist.component.html',
  styleUrls: ['./companylist.component.scss']
})
export class CompanylistComponent implements OnInit {
  companyList: Company[] = [];
  jobList: Job [] = [];
  checker: any = 0;
  constructor(private companylistService: CompanylistService,
              private router: Router,
              private _sanitizer: DomSanitizer,
              private jobservice: JobService,
              private activatedRoute: ActivatedRoute) { }

      // get faculty id
      getcompany( id: any): void {
        console.log('idFacultyCompany: '+id);
        this.companylistService. getcompanybyfacultyID(id).subscribe(
          value => {
            if (value['code'] === 200) {
              this.companyList = value['data'];
              console.log(this.companyList);
            } else {
                alert(value['error']);
            }
        },
        error => console.log(error)
        )
       }
       getjobbyfaculty(id: any): void {
         console.log('idFaculty: '+id);
         this.jobservice.getalljobfaculty(id).subscribe(
           value => {
            if (value['code'] === 200) {
              this.jobList = value['data'].items;
              console.log(this.jobList);
            } else {
                alert(value['error']);
            }
            },
            error => console.log(error)
         )
       }

    getBackground(image: any) {
    return this._sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${image})`);
  }

  checklogin() {
    if (localStorage.getItem('usertoken') != null) {
      this.checker = localStorage.getItem('role');
    } else { this.checker = 0; }
    console.log('role: ' + this.checker);
  }
  
  ngOnInit() {
    this.getcompany(this.activatedRoute.snapshot.params['id']);
    this.getjobbyfaculty(this.activatedRoute.snapshot.params['id'])
    this.checklogin();
  }

}
