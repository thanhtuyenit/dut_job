import { Component, OnInit } from '@angular/core';
import { Faculty } from 'app/model/faculty';
import { ListfacultyService } from 'app/services/listfaculty.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-faculty',
  templateUrl: './edit-faculty.component.html',
  styleUrls: ['./edit-faculty.component.scss']
})
export class EditFacultyComponent implements OnInit {
  faculty: Faculty;
  constructor( private listfacultyService: ListfacultyService,
    private router: Router,
    // get active route
    private activatedRoute: ActivatedRoute, ) {
      this.faculty = new Faculty();
    }
    // get faculty id
    getFaculty( id: any): void {
      this.listfacultyService.getfacultyByID(id).subscribe(
        value => {
          if (value['code'] === 200) {
            this.faculty = value['data'];
            console.log(this.faculty);
          } else {
              alert(value['error']);
          }
      },
      error => console.log(error)
      )
     }
     editFaculty() {
      this.listfacultyService.updatefaculty(this.faculty)
        .subscribe(res => {
          this.router.navigate(['/typography']);
          }, (err: any) => {
            console.log(err);
          }
        );
    }

  ngOnInit() {
    this.getFaculty(this.activatedRoute.snapshot.params['id']);
  }
}
