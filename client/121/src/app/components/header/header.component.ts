import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  checker: any = 0;
userName: any = localStorage.getItem('userName');
  constructor(private auth: AuthenticationService , private router: Router) { }
  checklogin() {
    if (localStorage.getItem('usertoken') != null) {
      this.checker = localStorage.getItem('role');
    } else { this.checker = 0; }
    console.log(this.checker);
  }
  ngOnInit() {
    this.checklogin();
    }

}
