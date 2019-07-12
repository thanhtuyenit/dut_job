import { Component, OnInit } from '@angular/core';
import { Keyskill } from 'app/model/keyskills';
import { KeyskillsService } from 'app/services/keyskills.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-keyskills',
  templateUrl: './add-keyskills.component.html',
  styleUrls: ['./add-keyskills.component.scss']
})
export class AddKeyskillsComponent implements OnInit {

   // Create a interface of model
 keyskill: Keyskill[] = [];
 // Create a interface of Service
 constructor(private KeyskillService: KeyskillsService, private router: Router) { }
 // Create a function to get data from service to component
 getKeyskillFromService(): void {
   // Get data from function which get data (API URL) in service and convert
   this.KeyskillService.getKeyskills().subscribe(
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
   error => console.log(error)
   )
   }

  ngOnInit() {
  }
  addKeyskill(form: NgForm) {
    this.KeyskillService.addKeyskills(form)
      .subscribe(res => {
          this.router.navigate(['/icons']);
        }, (err) => {
          console.log(err);
        });
  }

}
