import { Component, OnInit } from '@angular/core';
import { JobService } from 'app/services/jobs/job.service';
import { Job } from 'app/model/job';
import { JobType } from 'app/model/jobType';

@Component({
  selector: 'app-recent-jobs',
  templateUrl: './recent-jobs.component.html',
  styleUrls: ['./recent-jobs.component.scss']
})
export class RecentJobsComponent implements OnInit {
  recentJobList: Job[] = [];
  typejob: JobType;
  checker: any = 0;

  constructor(private RecentJobService: JobService) { }
  getAllRecentJobs() {
    this.RecentJobService.getAllRecentJob().subscribe(
      value => {
        if (value['code'] === 200) {
          this.recentJobList = value['data'];
// console.log(this.recentjob)
        } else {
          alert('Something error!');
      }
      },
      error => console.log(error)
    )
  }

  checklogin() {
    if (localStorage.getItem('usertoken') != null) {
      this.checker = localStorage.getItem('role');
    } else { 
      this.checker = 0; 
    }
    // console.log('role: ' + this.checker);
  }
  ngOnInit() {
    this.getAllRecentJobs();
    this.checklogin();
  }

}
