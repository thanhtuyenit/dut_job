import { Component, OnInit } from '@angular/core';
import { Company } from 'app/model/company';
import { Keyskill } from 'app/model/keyskills';
import { CompanylistService } from 'app/services/companylist.service';
import { KeyskillsService } from 'app/services/keyskills.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ListfacultyService } from 'app/services/listfaculty.service';
import { Faculty } from 'app/model/faculty';

@Component({
  selector: 'app-manage-company-profile',
  templateUrl: './manage-company-profile.component.html',
  styleUrls: ['./manage-company-profile.component.scss']
})
export class ManageCompanyProfileComponent implements OnInit {
  company: Company;
  keyskill: Keyskill[] = [];
  facultyList: Faculty[] = [];
  constructor(private companylistService: CompanylistService,
              private router: Router,
              private  KeyskillService: KeyskillsService,
              private activatedRoute: ActivatedRoute,
              private facultyService: ListfacultyService) {
    }
    
    
    getcompany(): void {
      this.companylistService.getprofilecompanybyUserID().subscribe(
        value => {
          if (value['code'] === 200) {
            this.company = value['data'];
            console.log('company profile: '+this.company);
          } else {
              alert('Something error!');
          }
      },
      error => console.log(error)
      )
     }
     editcompany(form: NgForm) {
      this.companylistService.updatecompany(form)
        .subscribe(res => {
          console.log(form);
          this.getcompany();
          // this.router.navigate(['/table-list']);
          }, (err: any) => {
            console.log(err);
          }
        );
    }

    getKeyskillFromService(): void {
      // Get data from function which get data (API URL) in service and convert
      this.KeyskillService.getSkillCanAddForCompany().subscribe(
        value => {
          // if code api true
          if (value['code'] === 200) {
            // fetch data to interface of model
            this.keyskill = value['data'];
          } else {
              alert(value['code']);
          }
      },
      err => {
        if ( err.status = 400) {
        } else {
          console.log(err);
        }
           }
      )
    }
    addKey(form: NgForm) {
      // alert(this.keyskill);
      this.KeyskillService.addKeyscompany(form)
        .subscribe(res => {
            this.getcompany();
            this.getKeyskillFromService();
          }, (err) => {
            if ( err.status = 400) {
            } else {
              console.log(err);
            }
               });
    }
    deleteKey(id: any ) {
      if (confirm('Are you sure to delete this record?')) {
        this.KeyskillService.deleteKeyscompany(id)
        .subscribe(res => {
          this.getcompany();
          this.getKeyskillFromService();
          }, (err) => {
            console.log(err);
          }
        );
      }

    }
    getFacultyFromService(): void {
      this.facultyService.getfaculty().subscribe(
        value => {
          if (value['code'] === 200) {
            this.facultyList = value['data'];
            console.log('f:' + this.facultyList);
          } else {
              alert('Something error!');
          }
      },
      error => console.log(error)
      )
     }
  ngOnInit() {
    this.getcompany();
    this.getKeyskillFromService();
    this. getFacultyFromService();
  }


}
