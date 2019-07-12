import { Component, OnInit } from '@angular/core';
import { Company } from 'app/model/company';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanylistService } from 'app/services/companylist.service';
import { NgForm } from '@angular/forms';
import { KeyskillsService } from 'app/services/keyskills.service';
import { Keyskill } from 'app/model/keyskills';
import { Faculty } from 'app/model/faculty';
import { ListfacultyService } from 'app/services/listfaculty.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent implements OnInit {

  company: Company;
  keyskill: Keyskill[] = [];
  facultyList: Faculty[] = [];
  constructor(private companylistService: CompanylistService,
              private router: Router,
              private KeyskillService: KeyskillsService,
              private activatedRoute: ActivatedRoute,
              private facultyService: ListfacultyService) {
    }
    // get faculty id
    getcompany( id: any): void {
      this.companylistService.getcompanybyID(id).subscribe(
        value => {
          if (value['code'] === 200) {
            this.company = value['data'];
            console.log(this.company);
          } else {
              alert(value['error']);
          }
      },
      error => console.log(error)
      )
     }
     getKeyskillFromService(): void {
      // Get data from function which get data (API URL) in service and convert
      this. KeyskillService.getKeyskills().subscribe(
        value => {
          // if code api true
          if (value['code'] === 200) {
            // fetch data to interface of model
                      this.keyskill = value['data'];
            console.log(this.keyskill);
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
     editcompany(form: NgForm) {
      this.companylistService.updatecompany(form)
        .subscribe(res => {
          console.log(form)
          this.router.navigate(['/table-list']);
          }, (err: any) => {
            console.log(err);
          }
        );
    }
    addKey(form: NgForm) {
      // alert(this.keyskill);
      this.KeyskillService.addKeyscompany(form)
        .subscribe(res => {
            console.log(form)
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
          console.log(id)
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
    this.getcompany(this.activatedRoute.snapshot.params['id']);
    this.getKeyskillFromService();
    this. getFacultyFromService();
  }

}
