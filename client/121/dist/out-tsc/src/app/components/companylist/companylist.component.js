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
var CompanylistComponent = /** @class */ (function () {
    function CompanylistComponent(companylistService, router, 
    // get active route
    activatedRoute) {
        this.companylistService = companylistService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.company = [];
    }
    // get faculty id
    CompanylistComponent.prototype.getcompany = function (id) {
        var _this = this;
        this.companylistService.getcompanybyfacultyID(id).subscribe(function (value) {
            if (value['code'] === 200) {
                _this.company = value['data'];
                console.log(_this.company);
            }
            else {
                alert(value['error']);
            }
        }, function (error) { return console.log(error); });
    };
    CompanylistComponent.prototype.ngOnInit = function () {
        this.getcompany(this.activatedRoute.snapshot.params['id']);
    };
    CompanylistComponent = __decorate([
        core_1.Component({
            selector: 'app-companylist',
            templateUrl: './companylist.component.html',
            styleUrls: ['./companylist.component.scss']
        }),
        __metadata("design:paramtypes", [companylist_service_1.CompanylistService,
            router_1.Router,
            router_1.ActivatedRoute])
    ], CompanylistComponent);
    return CompanylistComponent;
}());
exports.CompanylistComponent = CompanylistComponent;
//# sourceMappingURL=companylist.component.js.map