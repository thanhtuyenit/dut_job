import { Component, OnInit } from '@angular/core';
import { Job } from 'app/model/job';
import { JobService } from 'app/services/jobs/job.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-list-admin',
  templateUrl: './job-list-admin.component.html',
  styleUrls: ['./job-list-admin.component.scss']
})
export class JobListAdminComponent implements OnInit {

  allJobsAdmin: Job[] = [];
  jobAdmin: Job;

  // Tavia
  totalPage: number;
  condition = {
    PageNumber: 1,
    PageSize: 100,
    Sort: 'create',
    Type: 'asc'
  };
  constructor(private jobService: JobService,
              private router: Router) { }

  ngOnInit() {
    this.getAllJobsAdmin();
  }

  getAllJobsAdmin() {
    this.jobService.getAllJobsAdmin(this.condition).subscribe(
        value => {
            if (value['code'] === 200) {
              this.allJobsAdmin = value['data'].items;
              this.totalPage = value['data'].paging.totalPages;
            } else {
                alert(value['code']);
            }
        },
        error => console.log(error)
    )
  }

  setItemPerPage() {
    this.condition.PageNumber = 1;
    this.getAllJobsAdmin();
    }

    arrayOne(): any[] {
      console.log('total page: ' + this.totalPage);
      return Array(this.totalPage);
    }

    changePage(page: number) {
        this.condition.PageNumber = page;
        this.getAllJobsAdmin();
    }

    previousPage() {
        this.condition.PageNumber--;
        this.getAllJobsAdmin();
    }

    nextPage() {
        this.condition.PageNumber++;
        this.getAllJobsAdmin();
    }

    changeStatusJob(id: any) {
      if (confirm('Are you sure?')) {
      this.jobService.changeStatusJob(id).subscribe(
        value => {
          if (value['code'] === 200) {
            this.getAllJobsAdmin();
          } else {
              alert(value['code']);
          }
      },
      error => console.log(error)
      )
    }
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

    SortBy(sort: any, type: any) {
      this.condition.Sort = sort;
      this.condition.Type = type;
      this.getAllJobsAdmin();
    }

}
