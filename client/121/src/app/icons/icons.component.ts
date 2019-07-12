import { Component, OnInit } from '@angular/core';
import { KeyskillsService } from 'app/services/keyskills.service';
import { Keyskill } from 'app/model/keyskills';
import { Router } from '@angular/router';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {
  // Create a interface of model
 keyskillList: Keyskill[] = [];
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
                    this.keyskillList = value['data'];
          // console.log(this.keyskillList);
        } else {
            alert(value['code']);
        }
    },
    error => console.log(error)
    )

  }
  // delete key skill
  deleteKeyskill(id: any): void {
    if (confirm('Are you sure to delete this record?')) {
      this.KeyskillService.deleteKeyskills(id)
      .subscribe(res => {
          this.getKeyskillFromService();
        }, (err) => {
          console.log(err);
        }
      );
    }
  }
  AddKeyskills() {
    this.router.navigate(['/add-Faculty']);
  }
  ngOnInit() {
    this.getKeyskillFromService();
  }

}
