import { Component, OnInit } from '@angular/core';
import { Company } from 'app/model/company';
import { Router } from '@angular/router';
import { CompanylistService } from 'app/services/companylist.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  companyList: Company[] = [];
  keyskillcompany: Company[] = [];


  // Tavia
  totalPage: number;
  condition = {
    PageNumber: 1,
    PageSize: 10,
    Sort: 'created',
    Type: 'desc'
  };
  // -----
  constructor(private companylistService: CompanylistService,
              private router: Router) { }

  getCompanylist(): void {
    this.companylistService.getcompany(this.condition).subscribe(
      value => {

        if (value['code'] === 200) {
          this.companyList = value['data'].items;
          this.totalPage = value['data'].paging.totalPages;
        } else {
            alert(value['code']);
        }
    },
    error => console.log(error)
    )
  }
  deletecompany(id: any): void {
    if (confirm('Are you sure to delete this record?')) {
      this.companylistService.deletecompany(id)
      .subscribe(res => {
          this.getCompanylist();
        }, (err) => {
          console.log(err);
        }
      );
    }
  }

  setItemPerPage() {
    this.condition.PageNumber = 1;
    this.getCompanylist();
    }

    arrayOne(): any[] {
      console.log('total page: ' + this.totalPage);
      return Array(this.totalPage);
    }

    changePage(page: number) {
        this.condition.PageNumber = page;
        this.getCompanylist();
    }

    previousPage() {
        this.condition.PageNumber--;
        this.getCompanylist();
    }

    nextPage() {
        this.condition.PageNumber++;
        this.getCompanylist();
    }

    SortBy(sort: any, type: any) {
      this.condition.Sort = sort;
      this.condition.Type = type;
      this.getCompanylist();
    }
  ngOnInit() {
    this.  getCompanylist();
  }

}
