import { Component, OnInit } from '@angular/core';
import { Keyskill } from 'app/model/keyskills';
import { KeyskillsService } from 'app/services/keyskills.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanylistService } from 'app/services/companylist.service';
import { Company } from 'app/model/company';
import { Job } from 'app/model/job';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  // Create a interface of model
  keyskill: Keyskill[] = [];
  company: Company;
  companyJobList: Job[] = [];
  // Create a interface of Service
  constructor(private KeyskillService: KeyskillsService,
              private router: Router,
              private companylistService: CompanylistService,
              private activatedRoute: ActivatedRoute) { }

  // Create a function to get data from service to component
  getKeyskillFromService(): void {
    // Get data from function which get data (API URL) in service and convert
    this.KeyskillService.getKeyskills().subscribe(
      value => {
        // if code api true
        if (value['code'] === 200) {
          // fetch data to interface of model
          this.keyskill = value['data'];
          // console.log(this.keyskill);
        } else {
            alert('Something error!');
        }
    },
    error => console.log(error)
    )

  }
  getcompanybyID( id: any): void {
    this.companylistService.getcompanybyID(id).subscribe(
      value => {
        if (value['code'] === 200) {
          this.company = value['data'];
          // console.log(this.company);
        } else {
            alert(value['error']);
        }
    },
    error => console.log(error)
    )
   }

   getjobcompanybyIDPublic(id: any): void {
    this.companylistService.getjobcompanybyIDPublic(id).subscribe(
    value => {
      if (value['code'] === 200) {
        this.companyJobList = value['data'].items;
        // console.log(this.companyJobList);
      } else {
          alert(value['error']);
      }
  },
  error => console.log(error)
  )}

  ngOnInit() {
    this.getKeyskillFromService();
    this.getcompanybyID(this.activatedRoute.snapshot.params['id']);
    this.getjobcompanybyIDPublic(this.activatedRoute.snapshot.params['id']);
  }

}
