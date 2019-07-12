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
var http_1 = require("@angular/common/http");
var apiURL_1 = require("app/define/apiURL");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var UserlistService = /** @class */ (function () {
    function UserlistService(http) {
        this.http = http;
        // get API URL
        this.userlistURL = apiURL_1.API_URL + 'users';
        this.userinfoURL = apiURL_1.API_URL + 'profile';
    }
    UserlistService.prototype.getuserlist = function () {
        return this.http.get(this.userlistURL).pipe(
        // if get data true => run tap()
        operators_1.tap(function (receiveUserlist) { return console.log("receiveUserlist= " + JSON.stringify(receiveUserlist)); }), 
        // map((data: any) => data.result),
        // else return Error
        operators_1.catchError(function (Error) { return rxjs_1.of([]); }));
    };
    UserlistService.prototype.getUserListCondition = function (condition) {
        return this.http.get(this.userlistURL + '?PageNumber=' + condition.PageNumber +
            '&PageSize=' + condition.PageSize +
            '&Sort=' + condition.Sort +
            '&Type=' + condition.Type).pipe(
        // if get data true => run tap()
        operators_1.tap(function (receiveUserlist) { return console.log("receiveUserlist= " + JSON.stringify(receiveUserlist)); }), 
        // map((data: any) => data.result),
        // else return Error
        operators_1.catchError(function (Error) { return rxjs_1.of([]); }));
    };
    // get by id
    UserlistService.prototype.getuserlistByID = function (userID) {
        var url = this.userinfoURL + "/" + userID;
        return this.http.get(url).pipe(operators_1.tap(function (_) { return console.log("fetched User id=" + userID); }), operators_1.catchError(this.handleError("getuserlistByID id=" + userID)));
    };
    //  end
    // handle Error
    UserlistService.prototype.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // Let the app keep running by returning an empty result.
            return rxjs_1.of(result);
        };
    };
    UserlistService.prototype.changeStatusUser = function (userID) {
        var url = this.userlistURL + "/review/" + userID;
        return this.http.put(url, userID, apiURL_1.httpOptions).pipe(operators_1.catchError(this.handleError('review user')));
    };
    UserlistService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], UserlistService);
    return UserlistService;
}());
exports.UserlistService = UserlistService;
//# sourceMappingURL=userlist.service.js.map