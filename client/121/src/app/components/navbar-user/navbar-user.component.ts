import { Component, OnInit } from '@angular/core';
import { SearchService } from 'app/services/searches/search.service';
import { CompanyName } from 'app/model/searches/companyName';
import { KeyskillsService } from 'app/services/keyskills.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl, NgForm} from '@angular/forms';
import { Keyskill } from 'app/model/keyskills';
import { CompanylistService } from 'app/services/companylist.service';
import { Company } from 'app/model/company';
import { Router } from '@angular/router';
import { Job } from 'app/model/job';
export interface CompanyName {
  name: string;
}

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.scss']
})
export class NavbarUserComponent implements OnInit {
  company: Company[] = [];
  jobname: Job[] = [];
  jobSkill: Job[] = [];
  allCompanyName: CompanyName[] = [];
  inputnameKeyskill: string;
  skillName: Keyskill[] = [];
  myControlcompany = new FormControl();
  myControlkeyskill = new FormControl();
  optionsCompany: CompanyName[] = [];
  optionsKeyskill: Keyskill[] = [];
  filteredOptionsCompany: Observable<CompanyName[]>;
  filteredOptionsKeyskill: Observable<Keyskill[]>;

  condition = {
    PageNumber: 1,
    PageSize: 20,
  };

  constructor(private searchService: SearchService,
              private keyskillService: KeyskillsService,
              private companylistService: CompanylistService,
              private router: Router) { }

  ngOnInit() {
   this.getAllCompanyName();
   this.getAllSkillSuggestSearch();
}
/////// display and filter company name
displayFnbycompany(companyname?: CompanyName): string | undefined {
return companyname ? companyname.name : undefined;
}

private _filterCompanyname(companyname: string): CompanyName[] {
const filterValuecompany = companyname.toLowerCase();

return this.optionsCompany.filter(optioncompany => optioncompany.name.toLowerCase().indexOf(filterValuecompany) === 0);
}
// ------
///// display and filter keyskill
displayFnbykeyskill(keyskillname?: Keyskill): string | undefined {
  return keyskillname ? keyskillname.name : undefined;
  }

  private _filterKeyskill(keyskillname: string): Keyskill[] {
  const filterValuekeyskill = keyskillname.toLowerCase();
  return this.optionsKeyskill.filter(optionkeyskill => optionkeyskill.name.toLowerCase().indexOf(filterValuekeyskill) === 0);
  }

// ------
// get all company name to suggest search find a company
  getAllCompanyName() {
    this.searchService.getAllCompanyName().subscribe(
        value => {
            if (value['code'] === 200) {
              this.optionsCompany = value['data'];
              // console.log(this.optionsCompany)
            } else {
                alert('Something error!');
            }
        },
        error => console.log(error)
    );
  }
  SearchResult(inputnameKeyskill: string) {
    // console.log(inputnameKeyskill);
    this.searchService.getAlljobByskillname(inputnameKeyskill, this.condition).subscribe(
      value => {
        if (value['code'] === 200) {
          this.jobSkill = value['data'];
          // console.log(this.jobSkill);
          localStorage.setItem('nameSearch', this.inputnameKeyskill)
          this.router.navigate(['/searchjobbyname/', inputnameKeyskill]);
          // this.router.navigate(['/company/', id]);
        } else {
            alert('Something error!');
        }
    },
    error => console.log(error)
    )
  }
  // SearchResult1(search1: NgForm) {
  //   console.log(search1);
  //   this.filteredOptionsCompany = this.myControlcompany.valueChanges
  // .pipe(
  //   startWith<string | CompanyName>(''),
  //   map(value => typeof value === 'string' ? value : value.name),
  //   map(name => name ? this._filterCompanyname(name) : this.optionsCompany.slice())
  // );
  // }
  getSuggestKeyskill() {
    this.filteredOptionsKeyskill = this.myControlkeyskill.valueChanges
    .pipe(
      startWith<string | Keyskill>(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(keyskillname => keyskillname ? this._filterKeyskill(keyskillname) : this.optionsKeyskill.slice())
    );
  }

 getSuggestCompany() {
  this.filteredOptionsCompany = this.myControlcompany.valueChanges
  .pipe(
    startWith<string | CompanyName>(''),
    map(value => typeof value === 'string' ? value : value.name),
    map(name => name ? this._filterCompanyname(name) : this.optionsCompany.slice())
  );
 }


  getSelectedElementIdCompany(id: any) {
    console.log(id)
    this.companylistService. getcompanybyID(id).subscribe(
      value => {
        if (value['code'] === 200) {
          this.company = value['data'];
          // console.log(this.company);
          this.router.navigate(['/company/', id]);
        } else {
            alert(value['error']);
        }
    },
    error => console.log(error)
    )
}
getSelectedElementIdKeyskill(inputnameKeyskill: any) {
  // JSON.stringify(this.inputnameKeyskill);
  // console.log('key:' + inputnameKeyskill)
  // localStorage.setItem('nameSearch', this.inputnameKeyskill.toString())
  console.log('key click:' + inputnameKeyskill)
  this.router.navigate(['/searchjobbyname/',inputnameKeyskill]);
  // this.searchService.getAlljobByskillname(inputnameKeyskill).subscribe(
  //   value => {
  //     if (value['code'] === 200) {
  //       this.jobname = value['data'];
  //         // console.log('key:' + inputnameKeyskill.name)
  //        console.log(this.jobname);
  //       this.router.navigate(['/searchjobbyname/',inputnameKeyskill]);
  //     } else {
  //         alert(value['error']);
  //     }
  // },
  // error => console.log(error)
  // )
}
getAllSkillSuggestSearch() {
    this.keyskillService.getAllSkillSuggestSearch().subscribe(
      value => {
        if (value['code'] === 200) {
          this.optionsKeyskill = value['data'];
          console.log(this.optionsKeyskill);
          // this.skillName = value['data'].name;
          // console.log(this.skillName);
           } else {
            alert(value['code']);
           }
      },
      error => console.log(error)
    )
  }
}
