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
var keyskills_service_1 = require("app/services/keyskills.service");
var router_1 = require("@angular/router");
var listfaculty_service_1 = require("app/services/listfaculty.service");
var ManageCompanyProfileComponent = /** @class */ (function () {
    function ManageCompanyProfileComponent(companylistService, router, KeyskillService, activatedRoute, facultyService) {
        this.companylistService = companylistService;
        this.router = router;
        this.KeyskillService = KeyskillService;
        this.activatedRoute = activatedRoute;
        this.facultyService = facultyService;
        this.keyskill = [];
        this.facultyList = [];
    }
    // get faculty id
    ManageCompanyProfileComponent.prototype.getcompany = function () {
        var _this = this;
        this.companylistService.getprofilecompanybyUserID().subscribe(function (value) {
            if (value['code'] === 200) {
                _this.company = value['data'];
                console.log(_this.company);
            }
            else {
                alert(value['error']);
            }
        }, function (error) { return console.log(error); });
    };
    ManageCompanyProfileComponent.prototype.editcompany = function (form) {
        var _this = this;
        this.companylistService.updatecompany(form)
            .subscribe(function (res) {
            console.log(form);
            _this.getcompany();
            // this.router.navigate(['/table-list']);
        }, function (err) {
            console.log(err);
        });
    };
    ManageCompanyProfileComponent.prototype.getKeyskillFromService = function () {
        var _this = this;
        // Get data from function which get data (API URL) in service and convert
        this.KeyskillService.getSkillCanAddForCompany().subscribe(function (value) {
            // if code api true
            if (value['code'] === 200) {
                // fetch data to interface of model
                _this.keyskill = value['data'];
            }
            else {
                alert(value['code']);
            }
        }, function (err) {
            if (err.status = 400) {
            }
            else {
                console.log(err);
            }
        });
    };
    ManageCompanyProfileComponent.prototype.addKey = function (form) {
        var _this = this;
        // alert(this.keyskill);
        this.KeyskillService.addKeyscompany(form)
            .subscribe(function (res) {
            _this.getcompany();
            _this.getKeyskillFromService();
        }, function (err) {
            if (err.status = 400) {
            }
            else {
                console.log(err);
            }
        });
    };
    ManageCompanyProfileComponent.prototype.deleteKey = function (id) {
        var _this = this;
        if (confirm('Are you sure to delete this record?')) {
            this.KeyskillService.deleteKeyscompany(id)
                .subscribe(function (res) {
                _this.getcompany();
                _this.getKeyskillFromService();
            }, function (err) {
                console.log(err);
            });
        }
    };
    ManageCompanyProfileComponent.prototype.getFacultyFromService = function () {
        var _this = this;
        this.facultyService.getfaculty().subscribe(function (value) {
            if (value['code'] === 200) {
                _this.facultyList = value['data'];
                console.log('f:' + _this.facultyList);
            }
            else {
                alert('Something error!');
            }
        }, function (error) { return console.log(error); });
    };
    ManageCompanyProfileComponent.prototype.ngOnInit = function () {
        this.getcompany();
        this.getKeyskillFromService();
        this.getFacultyFromService();
    };
    ManageCompanyProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-manage-company-profile',
            templateUrl: './manage-company-profile.component.html',
            styleUrls: ['./manage-company-profile.component.scss']
        }),
        __metadata("design:paramtypes", [companylist_service_1.CompanylistService,
            router_1.Router,
            keyskills_service_1.KeyskillsService,
            router_1.ActivatedRoute,
            listfaculty_service_1.ListfacultyService])
    ], ManageCompanyProfileComponent);
    return ManageCompanyProfileComponent;
}());
exports.ManageCompanyProfileComponent = ManageCompanyProfileComponent;
//# sourceMappingURL=manage-company-profile.component.js.map