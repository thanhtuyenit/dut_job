import { Component, OnInit } from '@angular/core';
import { Company } from 'app/model/company';
import { CompanylistService } from 'app/services/companylist.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ListfacultyService } from 'app/services/listfaculty.service';
import { Faculty } from 'app/model/faculty';
import swal from 'sweetalert';
@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {
// company: Company[] = [];
facultyList: Faculty[] = [];
  constructor(private router: Router,
              private companylistService: CompanylistService,
              private listfacultyService: ListfacultyService) { }

  ngOnInit() {
    this. getFacultyFromService();
  }

  addCompany(form: NgForm) {
    this.companylistService.addcompany(form)
      .subscribe(res => {
        swal('Success!', 'New Company was created!', 'success')
        .then(() =>   this.router.navigate(['/table-list']))
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
            alert('Somthing error!');
        }
    },
    error => console.log(error)
    )
   }
}
