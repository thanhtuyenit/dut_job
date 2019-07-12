import { Component, OnInit } from '@angular/core';
import { User } from 'app/model/user';
import { UserlistService } from 'app/services/userlist.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
// page = 4;
userList: User[] = [];
userProfile: User;

// Tavia
totalPage: number;
condition = {
  PageNumber: 1,
  PageSize: 10,
  Sort: 'role',
  Type: 'asc'
};
// ---
  constructor(private userlistService: UserlistService , private router: Router) {
    this.userProfile = new User();
  }
  getUserlistFromService(): void {
    this.userlistService.getUserListCondition(this.condition).subscribe(
      value => {
        if (value['code'] === 200) {
          this.userList = value['data'].items;
          this.totalPage = value['data'].paging.totalPages;
        } else {
            alert(value['code']);
        }
    },
    error => console.log(error)
    )
   }
   getedit(userID: number) {
     this.userlistService.getuserlistByID(userID).subscribe(
      value => {
        if (value['code'] === 200) {
          this.userProfile = value['data'];
        } else {
            alert(value['code']);
        }
    },
    error => console.log(error)

     )
   };

   setItemPerPage() {
    this.condition.PageNumber = 1;
    this.getUserlistFromService();
    }

    arrayOne(): any[] {
      console.log('total page: ' + this.totalPage);
      return Array(this.totalPage);
    }

    changePage(page: number) {
        this.condition.PageNumber = page;
        this.getUserlistFromService();
    }

    previousPage() {
        this.condition.PageNumber--;
        this.getUserlistFromService();
    }

    nextPage() {
        this.condition.PageNumber++;
        this.getUserlistFromService();
    }

    changeStatusUser(userID: any) {
      this.userlistService.changeStatusUser(userID).subscribe(
        value => {
          if (value['code'] === 200) {
            this.getUserlistFromService();
          } else {
              alert(value['code']);
          }
      },
      error => console.log(error)
       )
    }
    SortBy(sort: any, type: any) {
      this.condition.Sort = sort;
      this.condition.Type = type;
      this.getUserlistFromService();
    }
    ngOnInit() {
      this.getUserlistFromService();
      // this.getedit(this.users.userID);
    }

}
