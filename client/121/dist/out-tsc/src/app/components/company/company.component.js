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
var keyskills_service_1 = require("app/services/keyskills.service");
var router_1 = require("@angular/router");
var companylist_service_1 = require("app/services/companylist.service");
var CompanyComponent = /** @class */ (function () {
    // Create a interface of Service
    function CompanyComponent(KeyskillService, router, companylistService, activatedRoute) {
        this.KeyskillService = KeyskillService;
        this.router = router;
        this.companylistService = companylistService;
        this.activatedRoute = activatedRoute;
        // Create a interface of model
        this.keyskill = [];
        this.company = [];
        this.companyjob = [];
    }
    // Create a function to get data from service to component
    CompanyComponent.prototype.getKeyskillFromService = function () {
        var _this = this;
        // Get data from function which get data (API URL) in service and convert
        this.KeyskillService.getKeyskills().subscribe(function (value) {
            // if code api true
            if (value['code'] === 200) {
                // fetch data to interface of model
                _this.keyskill = value['data'];
                // console.log(this.keyskill);
            }
            else {
                alert(value['code']);
            }
        }, function (error) { return console.log(error); });
    };
    CompanyComponent.prototype.getcompanybyID = function (id) {
        var _this = this;
        this.companylistService.getcompanybyID(id).subscribe(function (value) {
            if (value['code'] === 200) {
                _this.company = value['data'];
                console.log(_this.company);
            }
            else {
                alert(value['error']);
            }
        }, function (error) { return console.log(error); });
    };
    CompanyComponent.prototype.getjobcompanybyIDPublic = function (id) {
        var _this = this;
        this.companylistService.getjobcompanybyIDPublic(id).subscribe(function (value) {
            if (value['code'] === 200) {
                _this.companyjob = value['data'].items;
                console.log(_this.companyjob);
            }
            else {
                alert(value['error']);
            }
        }, function (error) { return console.log(error); });
    };
    CompanyComponent.prototype.ngOnInit = function () {
        this.getKeyskillFromService();
        this.getcompanybyID(this.activatedRoute.snapshot.params['id']);
        this.getjobcompanybyIDPublic(this.activatedRoute.snapshot.params['id']);
    };
    CompanyComponent = __decorate([
        core_1.Component({
            selector: 'app-company',
            templateUrl: './company.component.html',
            styleUrls: ['./company.component.scss']
        }),
        __metadata("design:paramtypes", [keyskills_service_1.KeyskillsService, router_1.Router,
            companylist_service_1.CompanylistService, router_1.ActivatedRoute])
    ], CompanyComponent);
    return CompanyComponent;
}());
exports.CompanyComponent = CompanyComponent;
//# sourceMappingURL=company.component.js.map