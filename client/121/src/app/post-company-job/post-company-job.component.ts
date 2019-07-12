import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanylistService } from 'app/services/companylist.service';
import { ListfacultyService } from 'app/services/listfaculty.service';
import { PostJobService } from 'app/services/post-job.service';
import { NgForm } from '@angular/forms';
import { Faculty } from 'app/model/faculty';
import { KeyskillsService } from 'app/services/keyskills.service';
import { Keyskill } from 'app/model/keyskills';
import { TypeJob } from 'app/model/typeJob';

import { Job } from 'app/model/job';
import { JobType } from 'app/model/jobType';
import swal from 'sweetalert';

@Component({
  selector: 'app-post-company-job',
  templateUrl: './post-company-job.component.html',
  styleUrls: ['./post-company-job.component.scss']
})
export class PostCompanyJobComponent implements OnInit {
  facultyList: Faculty[] = [];
  skillList: Keyskill[] = [];
  jobTypeList: JobType[] = [];
  job = new Job();
  role: any = localStorage.getItem('role');
  // --------
  // ----------
  constructor(private router: Router,
              private postjobService: PostJobService,
              private listfacultyService: ListfacultyService,
              private KeyskillService: KeyskillsService,
              private typejobService: PostJobService,
              private companyService: CompanylistService) { }

  ngOnInit() {
    this.getFacultyFromService();
    this.getKeyskillFromService();
    this.getTypejob();
  }
  getCheckboxes() {
    this.job.skills = this.skillList.filter(x => x.selected);
   // this.job.faculties = this.faculty.filter(c => c.selected);
    // console.log(this.job.skills);
    // console.log(this.job.faculties);
  }

    ////////////
  addPost(form: NgForm) {
    // console.log(form);
    this.job.title = form.controls['title'].value;
    this.job.reason = form.controls['reason'].value;
    // this.job.dateExpire = form.controls['dateExpire'].value;
    this.job.experience = form.controls['experience'].value;
    this.job.benefit = form.controls['benefit'].value;
    this.job.salary = form.controls['salary'].value;
    this.job.jobTypeID = form.controls['jobTypeID'].value;
    // this.job.faculties = this.faculty.filter(c => c.selected);
    this.job.facultyID = form.controls['facultyID'].value;
    this.job.skills = this.skillList.filter(x => x.selected);
    this.job.description = form.controls['description'].value;
    this.postjobService.createPost(this.job)
      .subscribe(res => {
        if(res['code'] != null && res['code'] === 200){
          // alert(res['code']);
          swal('Success!', 'New Job was created!', 'success')
          .then(() => this.router.navigate(['/companymanagealljob']))
        }else{
          
          swal('Error!', 'Something error!', 'error')
        .then(() => this.router.navigate(['/companymanagealljob']))
        }
        
        }, (err) => {
          console.log(err);
        });
  }
  getFacultyFromService(): void {
    this.listfacultyService.getfaculty().subscribe(
      value => {
        if (value['code'] === 200) {
          this.facultyList = value['data'];
          // console.log(this.facultyList);
        } else {
            alert('Something error!');
        }
    },
    error => console.log(error)
    )
   }
   getKeyskillFromService(): void {
    this.companyService.getprofilecompanybyUserID().subscribe(
      value => {
        // if code api true
        if (value['code'] === 200) {
          this.skillList = value['data'].skills;
          // console.log(this.keyskill);
        } else {
            alert(value['code']);
        }
    },
    error => console.log(error)
    )
    }
    getTypejob(): void {
      this.typejobService.getTypejob().subscribe(
        value => {
          if (value['code'] === 200) {
            this.jobTypeList = value['data'];
            // console.log(this.jobType);
          } else {
              alert('Something error!');
          }
      },
      error => console.log(error)
      )
     }
}
