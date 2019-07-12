import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ListfacultyService } from 'app/services/listfaculty.service';
import { Router } from '@angular/router';
import { Faculty } from 'app/model/faculty';
import { ApplyJob } from 'app/model/applyJob';
@Component({
  selector: 'app-add-faculty',
  templateUrl: './add-faculty.component.html',
  styleUrls: ['./add-faculty.component.scss']
})
export class AddFacultyComponent implements OnInit {
  faculty: Faculty[] = [];
  // apply: ApplyJob;
  constructor( private listfacultyService: ListfacultyService,
    private router: Router ) {
      //this.apply = new ApplyJob();
     }

    getFacultyFromService(): void {
      this.listfacultyService.getfaculty().subscribe(
        value => {
          if (value['code'] === 200) {
            this.faculty = value['data'];
            // console.log(this.faculty);
          } else {
              alert(value['code']);
          }
      },
      error => console.log(error)
      )
     }
  ngOnInit() {
  }
  addFaculty(form: NgForm) {
    this.listfacultyService.addfaculty(form)
      .subscribe(res => {
          this.router.navigate(['/typography']);
        }, (err) => {
          console.log(err);
        });
  }

}
