"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var search_service_1 = require("app/services/searches/search.service");
var keyskills_service_1 = require("app/services/keyskills.service");
var operators_1 = require("rxjs/operators");
var forms_1 = require("@angular/forms");
var companylist_service_1 = require("app/services/companylist.service");
var router_1 = require("@angular/router");
var NavbarUserComponent = /** @class */ (function () {
    function NavbarUserComponent(searchService, keyskillService, companylistService, router) {
        this.searchService = searchService;
        this.keyskillService = keyskillService;
        this.companylistService = companylistService;
        this.router = router;
        this.company = [];
        this.allCompanyName = [];
        this.skillName = [];
        this.myControlcompany = new forms_1.FormControl();
        this.myControlkeyskill = new forms_1.FormControl();
        this.optionsCompany = [];
        this.optionsKeyskill = [];
    }
    NavbarUserComponent.prototype.ngOnInit = function () {
        this.getAllCompanyName();
        this.getAllSkillName();
        //
        //////
    };
    /////// display and filter company name
    NavbarUserComponent.prototype.displayFnbycompany = function (companyname) {
        return companyname ? companyname.name : undefined;
    };
    NavbarUserComponent.prototype._filterCompanyname = function (companyname) {
        var filterValuecompany = companyname.toLowerCase();
        return this.optionsCompany.filter(function (optioncompany) { return optioncompany.name.toLowerCase().indexOf(filterValuecompany) === 0; });
    };
    // ------
    ///// display and filter keyskill
    NavbarUserComponent.prototype.displayFnbykeyskill = function (keyskillname) {
        return keyskillname ? keyskillname.name : undefined;
    };
    NavbarUserComponent.prototype._filterKeyskill = function (keyskillname) {
        var filterValuekeyskill = keyskillname.toLowerCase();
        return this.optionsKeyskill.filter(function (optionkeyskill) { return optionkeyskill.name.toLowerCase().indexOf(filterValuekeyskill) === 0; });
    };
    // ------
    // asdasd
    NavbarUserComponent.prototype.getAllCompanyName = function () {
        var _this = this;
        this.searchService.getAllCompanyName().subscribe(function (value) {
            if (value['code'] === 200) {
                _this.optionsCompany = value['data'];
                console.log(_this.optionsCompany);
            }
            else {
                alert('Something error!');
            }
        }, function (error) { return console.log(error); });
    };
    // SearchResult(search: NgForm) {
    //   console.log(search);
    //   this.filteredOptionsKeyskill = this.myControlkeyskill.valueChanges
    //   .pipe(
    //     startWith<string | Keyskill>(''),
    //     map(value => typeof value === 'string' ? value : value.name),
    //     map(keyskillname => keyskillname ? this._filterKeyskill(keyskillname) : this.optionsKeyskill.slice())
    //   );
    // }
    // SearchResult1(search1: NgForm) {
    //   console.log(search1);
    //   this.filteredOptionsCompany = this.myControlcompany.valueChanges
    // .pipe(
    //   startWith<string | CompanyName>(''),
    //   map(value => typeof value === 'string' ? value : value.name),
    //   map(name => name ? this._filterCompanyname(name) : this.optionsCompany.slice())
    // );
    // }
    NavbarUserComponent.prototype.getSuggestKeyskill = function () {
        var _this = this;
        this.filteredOptionsKeyskill = this.myControlkeyskill.valueChanges
            .pipe(operators_1.startWith(''), operators_1.map(function (value) { return typeof value === 'string' ? value : value.name; }), operators_1.map(function (keyskillname) { return keyskillname ? _this._filterKeyskill(keyskillname) : _this.optionsKeyskill.slice(); }));
    };
    NavbarUserComponent.prototype.getSuggestCompany = function () {
        var _this = this;
        this.filteredOptionsCompany = this.myControlcompany.valueChanges
            .pipe(operators_1.startWith(''), operators_1.map(function (value) { return typeof value === 'string' ? value : value.name; }), operators_1.map(function (name) { return name ? _this._filterCompanyname(name) : _this.optionsCompany.slice(); }));
    };
    NavbarUserComponent.prototype.getSelectedElementIdCompany = function (id) {
        var _this = this;
        console.log(id);
        this.companylistService.getcompanybyID(id).subscribe(function (value) {
            if (value['code'] === 200) {
                _this.company = value['data'];
                // console.log(this.company);
                _this.router.navigate(['/company/', id]);
            }
            else {
                alert(value['error']);
            }
        }, function (error) { return console.log(error); });
    };
    NavbarUserComponent.prototype.getSelectedElementIdKeyskill = function (id) {
        console.log(id);
        // this.companylistService. getcompanybyID(id).subscribe(
        //   value => {
        //     if (value['code'] === 200) {
        //       this.company = value['data'];
        //       console.log(this.company);
        //       this.router.navigate(['/company/', id]);
        //     } else {
        //         alert(value['error']);
        //     }
        // },
        // error => console.log(error)
        // )
    };
    NavbarUserComponent.prototype.getAllSkillName = function () {
        var _this = this;
        this.keyskillService.getKeyskills().subscribe(function (value) {
            if (value['code'] === 200) {
                _this.optionsKeyskill = value['data'];
                console.log(_this.optionsKeyskill);
            }
            else {
                alert(value['code']);
            }
        }, function (error) { return console.log(error); });
    };
    NavbarUserComponent = __decorate([
        core_1.Component({
            selector: 'app-navbar-user',
            templateUrl: './navbar-user.component.html',
            styleUrls: ['./navbar-user.component.scss']
        }),
        __metadata("design:paramtypes", [search_service_1.SearchService, keyskills_service_1.KeyskillsService,
            companylist_service_1.CompanylistService, router_1.Router])
    ], NavbarUserComponent);
    return NavbarUserComponent;
}());
exports.NavbarUserComponent = NavbarUserComponent;
//# sourceMappingURL=navbar-user.component.js.map