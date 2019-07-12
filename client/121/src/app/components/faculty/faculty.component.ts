import { Component, OnInit } from '@angular/core';
import { Faculty } from 'app/model/faculty';
import { ListfacultyService } from 'app/services/listfaculty.service';
import { error } from 'util';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { JobService } from 'app/services/jobs/job.service';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.scss']
})
export class FacultyComponent implements OnInit {
facultyList: Faculty[] = [ ];
show = false;
showinfo = 'show more';
  constructor(private router: Router,
              private listfacultyService: ListfacultyService,
              private jobservice: JobService,
              private _sanitizer: DomSanitizer) { }

 getFacultyTop4(): void {
   this.listfacultyService.getfacultytop4().subscribe(
     value => {
       if (value['code'] === 200) {
         this.facultyList = value['data'];
         console.log(this.facultyList)
       } else {
        alert(value['code']);
    }
  },
  (err) => {
    console.log(err);
  }
   )
 }
 getBackground(image: any) {
  return this._sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${image})`);
}
  ngOnInit() {
    this.getFacultyTop4();
  }

  showDetail() {
    this.show = !this.show;
    if (this.show = true) {
      this.showinfo = 'show less';
    } else {
      this.showinfo = 'show more';
      return !this.show;
    }

  }
//  myFunction() {
//     const dots = document.getElementById("dots");
//     const moreText = document.getElementById("more");
//     const btnText = document.getElementById("myBtn");
//     if (dots.style.display === "none") {
//       dots.style.display = "inline";
//       btnText.innerHTML = "Read more";
//       moreText.style.display = "none";
//     } else {
//       dots.style.display = "none";
//       btnText.innerHTML = "Read less";
//       moreText.style.display = "inline";
//     }
//   }
}
