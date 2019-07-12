import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChangePassService } from 'app/services/change-pass.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepw-admin',
  templateUrl: './changepw-admin.component.html',
  styleUrls: ['./changepw-admin.component.scss']
})
export class ChangepwAdminComponent implements OnInit {

  constructor(private changepass: ChangePassService, private router: Router) { }

  ngOnInit() {
  }
  ChangePass(form: NgForm) {
    this.changepass.updatePassword(form)
      .subscribe(res => {
          // this.router.navigate(['/icons']);
          console.log(form);
        }, (err) => {
          console.log(err);
        });
  }

}
