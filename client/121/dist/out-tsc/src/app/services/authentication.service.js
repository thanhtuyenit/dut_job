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
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var router_1 = require("@angular/router");
var apiURL_1 = require("app/define/apiURL");
var AuthenticationService = /** @class */ (function () {
    //  private currentUserSubject: BehaviorSubject<User>;
    //  public currentUser: Observable<User>;
    function AuthenticationService(http, router) {
        this.http = http;
        this.router = router;
        // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        // this.currentUser = this.currentUserSubject.asObservable();
    }
    // public get currentUserValue(): User {
    //     return this.currentUserSubject.value;
    // }
    // cũ nè
    AuthenticationService.prototype.saveToken = function (token) {
        localStorage.setItem('usertoken', token);
        this.token = token;
    };
    AuthenticationService.prototype.getToken = function () {
        if (!this.token) {
            this.token = localStorage.getItem('usertoken');
        }
        return this.token;
    };
    // cái cũ nè
    // Get token
    AuthenticationService.prototype.getUserDetails = function () {
        var token = this.getToken();
        var payload;
        if (token) {
            payload = token.split('.')[1];
            payload = window.atob(payload);
            return JSON.parse(payload);
        }
        else {
            return null;
        }
    };
    // check token is expired
    AuthenticationService.prototype.isLoggedIn = function () {
        var user = this.getUserDetails();
        if (user) {
            return user.exp > Date.now() / 1000;
        }
        else {
            return false;
        }
    };
    AuthenticationService.prototype.register = function (user) {
        console.log(user);
        return this.http.post("https://localhost:44371/api/users/register", user, {
            headers: { 'Content-Type': 'application/json' }
        });
    };
    AuthenticationService.prototype.login = function (user) {
        var _this = this;
        var base = this.http.post("https://localhost:44371/api/login", { username: user.username, password: user.password }, {
            headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + this.getToken() }
        });
        // console.log(user);
        var request = base.pipe(operators_1.map(function (data) {
            // if (data && data.token ) {
            _this.saveToken(data.token);
            // localStorage.setItem('usertoken', JSON.stringify(data.token));
            console.log(data);
            //   }
            return data;
        }));
        return request;
    };
    AuthenticationService.prototype.profile = function () {
        return this.http.get("https://localhost:44371/api/profile", {
            headers: { Authorization: "Bearer " + this.getToken() }
        });
    };
    AuthenticationService.prototype.updateprofile = function (profileuser) {
        return this.http.put("https://localhost:44371/api/profile", profileuser, apiURL_1.httpOptions).pipe(operators_1.catchError(this.handleError('updateprofile')));
    };
    AuthenticationService.prototype.logout = function () {
        //  this.token = '';
        // remove user from local storage to log user out
        window.localStorage.removeItem('usertoken');
        //  this.router.navigateByUrl('/');
    };
    // handle Error
    AuthenticationService.prototype.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // Let the app keep running by returning an empty result.
            return rxjs_1.of(result);
        };
    };
    AuthenticationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map