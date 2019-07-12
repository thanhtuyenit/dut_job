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
var companylist_service_1 = require("app/services/companylist.service");
var router_1 = require("@angular/router");
var listfaculty_service_1 = require("app/services/listfaculty.service");
var AddCompanyComponent = /** @class */ (function () {
    function AddCompanyComponent(router, companylistService, listfacultyService) {
        this.router = router;
        this.companylistService = companylistService;
        this.listfacultyService = listfacultyService;
        this.company = [];
        this.faculty = [];
    }
    AddCompanyComponent.prototype.ngOnInit = function () {
        this.getFacultyFromService();
    };
    AddCompanyComponent.prototype.addCompany = function (form) {
        var _this = this;
        this.companylistService.addcompany(form)
            .subscribe(function (res) {
            _this.router.navigate(['/table-list']);
        }, function (err) {
            console.log(err);
        });
    };
    AddCompanyComponent.prototype.getFacultyFromService = function () {
        var _this = this;
        this.listfacultyService.getfaculty().subscribe(function (value) {
            if (value['code'] === 200) {
                _this.faculty = value['data'];
                console.log(_this.faculty);
            }
            else {
                alert(value['code']);
            }
        }, function (error) { return console.log(error); });
    };
    AddCompanyComponent = __decorate([
        core_1.Component({
            selector: 'app-add-company',
            templateUrl: './add-company.component.html',
            styleUrls: ['./add-company.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.Router,
            companylist_service_1.CompanylistService,
            listfaculty_service_1.ListfacultyService])
    ], AddCompanyComponent);
    return AddCompanyComponent;
}());
exports.AddCompanyComponent = AddCompanyComponent;
//# sourceMappingURL=add-company.component.js.map