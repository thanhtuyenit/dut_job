import { Component, OnInit } from '@angular/core';
import { PostJobService } from 'app/services/post-job.service';
import { Router } from '@angular/router';
import { Job } from 'app/model/job';
import { JobService } from 'app/services/jobs/job.service';

@Component({
  selector: 'app-company-all-jobs',
  templateUrl: './company-all-jobs.component.html',
  styleUrls: ['./company-all-jobs.component.scss']
})
export class CompanyAllJobsComponent implements OnInit {
  role: any = localStorage.getItem('role');
  totalPage: number;
  condition = {
    PageNumber: 1,
    PageSize: 10,
    Sort: 'create',
    Type: 'asc'
  };
  jobList: Job[] = []
  jobAdmin: Job;
  constructor(private alljobService: PostJobService,
              private jobService: JobService,
              private router: Router) { }

  ngOnInit() {
    this.getJobCompanyList();
  }

  getJobCompanyList(): void {
    this.jobService.getAllJobsCompany(this.condition).subscribe(
      value => {
        if (value['code'] === 200) {
          this.jobList = value['data'].items;
          this.totalPage = value['data'].paging.totalPages;
          // console.log(this.job)
        } else {
            alert('Something error!');
        }
    },
    error => console.log(error)
    )
  }

  setItemPerPage() {
    this.condition.PageNumber = 1;
    this.getJobCompanyList();
    }

    arrayOne(): any[] {
      console.log('total page: ' + this.totalPage);
      return Array(this.totalPage);
    }

    changePage(page: number) {
        this.condition.PageNumber = page;
        this.getJobCompanyList();
    }

    previousPage() {
        this.condition.PageNumber--;
        this.getJobCompanyList();
    }

    nextPage() {
        this.condition.PageNumber++;
        this.getJobCompanyList();
    }
    SortBy(sort: any, type: any) {
      this.condition.Sort = sort;
      this.condition.Type = type;
      this.getJobCompanyList();
    }

    getJobDetail(id: any) {
      this.jobService.getJobByIDAdmin(id).subscribe(
       value => {
         if (value['code'] === 200) {
           this.jobAdmin = value['data'];
         } else {
             alert(value['code']);
         }
     },
     error => console.log(error)
      )
    };


}
