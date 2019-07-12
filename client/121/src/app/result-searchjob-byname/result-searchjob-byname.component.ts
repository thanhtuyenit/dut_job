import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchService } from 'app/services/searches/search.service';
import { Job } from 'app/model/job';
import { JobType } from 'app/model/jobType';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'app/model/company';
import { CompanyName } from 'app/model/searches/companyName';
import { Keyskill } from 'app/model/keyskills';
import { FormControl } from '@angular/forms';
import { JobService } from 'app/services/jobs/job.service';

@Component({
  selector: 'app-result-searchjob-byname',
  templateUrl: './result-searchjob-byname.component.html',
  styleUrls: ['./result-searchjob-byname.component.scss']
})
export class ResultSearchjobBynameComponent implements OnInit {
  resultJobsSearch: Job[] = [];
  jobRandom: Job[] = [];
  typejob: JobType;
  company: Company[] = [];
  jobname: Job[] = [];
  jobSkill: Job[] = [];
  allCompanyName: CompanyName[] = [];
  inputnameKeyskill: string;
  skillName: Keyskill[] = [];
  myControlcompany = new FormControl();
  myControlkeyskill = new FormControl();
  optionsCompany: CompanyName[] = [];
  optionsKeyskill: Keyskill[] = [];
  message: any;
  namejobsearch: string;
  totalPage: number;
  totalResult: number;
  condition = {
    PageNumber: 1,
    PageSize: 20,
  };
  checker: any = 0;
 
  constructor(private searchService: SearchService,
              private activatedRoute: ActivatedRoute,
              private jobService: JobService) { }

  getAllResultSearchJobs(name: any) {
    this.searchService.getAlljobByskillname(name, this.condition).subscribe(
      value => {
        if (value['code'] === 200) {
          this.resultJobsSearch = value['data'].items;
          this.totalPage = value['data'].paging.totalPages;
          this.totalResult = value['data'].paging.totalItems;

          if(this.totalResult == 0){
            this.getJobRandom();
          }
          this.namejobsearch = name;
        } else {
          alert('Something error!');
      }
      },
      error => console.log(error)
    )
  }


  setItemPerPage() {
    this.condition.PageNumber = 1;
    this.getAllResultSearchJobs(this.namejobsearch);
    }

    arrayOne(): any[] {
      // console.log('total page: ' + this.totalPage);
      return Array(this.totalPage);
    }

    changePage(page: number) {
        this.condition.PageNumber = page;
        this.getAllResultSearchJobs(this.namejobsearch);
    }

    previousPage() {
        this.condition.PageNumber--;
        this.getAllResultSearchJobs(this.namejobsearch);
    }

    nextPage() {
        this.condition.PageNumber++;
        this.getAllResultSearchJobs(this.namejobsearch);
    }

    getJobRandom() {
      this.jobService.getAllRecentJob().subscribe(
        value => {
          if (value['code'] === 200) {
            // console.log('random: '+this.jobRandom)
            // console.log('random leng: '+this.jobRandom.length)
            this.jobRandom = value['data'];
          } else {
            alert('Something error!');
        }
        },
        error => console.log(error)
      )
    }
  search(string: any){
    this.condition.PageNumber = 1;
    this.getAllResultSearchJobs(string);
  }

  checklogin() {
    if (localStorage.getItem('usertoken') != null) {
      this.checker = localStorage.getItem('role');
    } else { this.checker = 0; }
    console.log('role: ' + this.checker);
  }
  
  ngOnInit() {
    this.getAllResultSearchJobs(this.activatedRoute.snapshot.params['name']);
    this.checklogin();
  }
}
