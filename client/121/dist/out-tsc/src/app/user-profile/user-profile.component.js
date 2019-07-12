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
var user_1 = require("app/model/user");
var userlist_service_1 = require("app/services/userlist.service");
var router_1 = require("@angular/router");
var UserProfileComponent = /** @class */ (function () {
    // ---
    function UserProfileComponent(userlistService, router) {
        this.userlistService = userlistService;
        this.router = router;
        // page = 4;
        this.userList = [];
        this.condition = {
            PageNumber: 1,
            PageSize: 10,
            Sort: 'role',
            Type: 'asc'
        };
        this.userProfile = new user_1.User();
    }
    UserProfileComponent.prototype.getUserlistFromService = function () {
        var _this = this;
        this.userlistService.getUserListCondition(this.condition).subscribe(function (value) {
            if (value['code'] === 200) {
                _this.userList = value['data'].items;
                _this.totalPage = value['data'].paging.totalPages;
            }
            else {
                alert(value['code']);
            }
        }, function (error) { return console.log(error); });
    };
    UserProfileComponent.prototype.getedit = function (userID) {
        var _this = this;
        this.userlistService.getuserlistByID(userID).subscribe(function (value) {
            if (value['code'] === 200) {
                _this.userProfile = value['data'];
            }
            else {
                alert(value['code']);
            }
        }, function (error) { return console.log(error); });
    };
    ;
    UserProfileComponent.prototype.setItemPerPage = function () {
        this.condition.PageNumber = 1;
        this.getUserlistFromService();
    };
    UserProfileComponent.prototype.arrayOne = function () {
        console.log('total page: ' + this.totalPage);
        return Array(this.totalPage);
    };
    UserProfileComponent.prototype.changePage = function (page) {
        this.condition.PageNumber = page;
        this.getUserlistFromService();
    };
    UserProfileComponent.prototype.previousPage = function () {
        this.condition.PageNumber--;
        this.getUserlistFromService();
    };
    UserProfileComponent.prototype.nextPage = function () {
        this.condition.PageNumber++;
        this.getUserlistFromService();
    };
    UserProfileComponent.prototype.changeStatusUser = function (userID) {
        var _this = this;
        this.userlistService.changeStatusUser(userID).subscribe(function (value) {
            if (value['code'] === 200) {
                _this.getUserlistFromService();
            }
            else {
                alert(value['code']);
            }
        }, function (error) { return console.log(error); });
    };
    UserProfileComponent.prototype.SortBy = function (sort, type) {
        this.condition.Sort = sort;
        this.condition.Type = type;
        this.getUserlistFromService();
    };
    UserProfileComponent.prototype.ngOnInit = function () {
        this.getUserlistFromService();
        // this.getedit(this.users.userID);
    };
    UserProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-user-profile',
            templateUrl: './user-profile.component.html',
            styleUrls: ['./user-profile.component.css']
        }),
        __metadata("design:paramtypes", [userlist_service_1.UserlistService, router_1.Router])
    ], UserProfileComponent);
    return UserProfileComponent;
}());
exports.UserProfileComponent = UserProfileComponent;
//# sourceMappingURL=user-profile.component.js.map