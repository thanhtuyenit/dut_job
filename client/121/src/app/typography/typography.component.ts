import { Component, OnInit } from '@angular/core';
import { Faculty } from 'app/model/faculty';
import { ListfacultyService } from 'app/services/listfaculty.service';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
 faculty: Faculty[] = [];
//  p: Number = 1;
  constructor(private listfacultyService: ListfacultyService , private router: Router) { }
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
 deleteFaculty(id: any): void {
  if (confirm('Are you sure to delete this record?')) {
    this.listfacultyService.deletefaculty(id)
    .subscribe(res => {
        this.getFacultyFromService();
      }, (err) => {
        console.log(err);
      }
    );
  }
}
// addFaculty(form: NgForm) {
//   this.listfacultyService.addfaculty(form)
//     .subscribe(res => {
//         this.router.navigate(['/typography']);
//       }, (err) => {
//         console.log(err);
//       });
// }
AddFaculty() {
  this.router.navigate(['/add-Faculty']);
}
  ngOnInit() {
    this.getFacultyFromService();
  }
}
