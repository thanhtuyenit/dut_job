import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChangePassService } from 'app/services/change-pass.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepw-user',
  templateUrl: './changepw-user.component.html',
  styleUrls: ['./changepw-user.component.scss']
})
export class ChangepwUserComponent implements OnInit {
  role: any = localStorage.getItem('role');
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
