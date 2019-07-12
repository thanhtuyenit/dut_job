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
var router_1 = require("@angular/router");
var companylist_service_1 = require("app/services/companylist.service");
var TableListComponent = /** @class */ (function () {
    // -----
    function TableListComponent(companylistService, router) {
        this.companylistService = companylistService;
        this.router = router;
        this.company = [];
        this.keyskillcompany = [];
        this.condition = {
            PageNumber: 1,
            PageSize: 10,
        };
    }
    TableListComponent.prototype.getcompanylist = function () {
        var _this = this;
        this.companylistService.getcompany(this.condition).subscribe(function (value) {
            if (value['code'] === 200) {
                _this.company = value['data'].items;
                _this.totalPage = value['data'].paging.totalPages;
            }
            else {
                alert(value['code']);
            }
        }, function (error) { return console.log(error); });
    };
    TableListComponent.prototype.deletecompany = function (id) {
        var _this = this;
        if (confirm('Are you sure to delete this record?')) {
            this.companylistService.deletecompany(id)
                .subscribe(function (res) {
                _this.getcompanylist();
            }, function (err) {
                console.log(err);
            });
        }
    };
    TableListComponent.prototype.setItemPerPage = function () {
        this.condition.PageNumber = 1;
        this.getcompanylist();
    };
    TableListComponent.prototype.arrayOne = function () {
        console.log('total page: ' + this.totalPage);
        return Array(this.totalPage);
    };
    TableListComponent.prototype.changePage = function (page) {
        this.condition.PageNumber = page;
        this.getcompanylist();
    };
    TableListComponent.prototype.previousPage = function () {
        this.condition.PageNumber--;
        this.getcompanylist();
    };
    TableListComponent.prototype.nextPage = function () {
        this.condition.PageNumber++;
        this.getcompanylist();
    };
    TableListComponent.prototype.ngOnInit = function () {
        this.getcompanylist();
    };
    TableListComponent = __decorate([
        core_1.Component({
            selector: 'app-table-list',
            templateUrl: './table-list.component.html',
            styleUrls: ['./table-list.component.css']
        }),
        __metadata("design:paramtypes", [companylist_service_1.CompanylistService, router_1.Router])
    ], TableListComponent);
    return TableListComponent;
}());
exports.TableListComponent = TableListComponent;
//# sourceMappingURL=table-list.component.js.map