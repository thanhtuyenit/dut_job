import { Component, OnInit } from '@angular/core';
import { Keyskill } from 'app/model/keyskills';
import { KeyskillsService } from 'app/services/keyskills.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-keyskills',
  templateUrl: './edit-keyskills.component.html',
  styleUrls: ['./edit-keyskills.component.scss']
})
export class EditKeyskillsComponent implements OnInit {

     // Create a interface of model
 keyskill: Keyskill;
 // Create a interface of Service
 constructor(private KeyskillService: KeyskillsService, private router: Router,
      // get active route
      private activatedRoute: ActivatedRoute) {
        this.keyskill = new Keyskill();
      }
 // get faculty id
 getKeyskill( id: any): void {
  this.KeyskillService.getKeyskillsByID(id).subscribe(
    value => {
      if (value['code'] === 200) {
        this.keyskill = value['data'];
        console.log(this.keyskill);
      } else {
          alert(value['error']);
      }
  },
  error => console.log(error)
  )
 }
 editKeyskill() {
  this.KeyskillService.updateKeyskills(this.keyskill)
    .subscribe(res => {
      this.router.navigate(['/icons']);
      }, (err: any) => {
        console.log(err);
      }
    );
}

  ngOnInit() {
    this.getKeyskill(this.activatedRoute.snapshot.params['id']);
  }

}
