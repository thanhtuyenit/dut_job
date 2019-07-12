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
var authentication_service_1 = require("app/services/authentication.service");
var router_1 = require("@angular/router");
var alertmessage_service_1 = require("app/services/alertmessage.service");
var operators_1 = require("rxjs/operators");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(auth, router, alertService) {
        this.auth = auth;
        this.router = router;
        this.alertService = alertService;
        // create interface credentials
        this.credentials = {
            id: 0,
            username: '',
            password: ''
        };
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.alertService.getMessage().subscribe(function (message) {
            _this.message = message;
        });
        // reset login status
        this.auth.logout();
        // get return url from route parameters or default to '/'
        //  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    LoginComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.auth.login(this.credentials).pipe(operators_1.first()).subscribe(
        // get token
        //  () => {
        function (value) {
            // =========
            if (value['code'] === 200) {
                _this.token = value['data'].token;
                _this.role = value['data'].role.id;
                _this.roleName = value['data'].role.name;
                _this.userName = value['data'].username;
                console.log(_this.token);
            }
            else {
                alert(value['error']);
            }
            // window.localStorage.removeItem('usertoken');
            localStorage.setItem('usertoken', _this.token);
            localStorage.setItem('role', _this.role);
            localStorage.setItem('roleName', _this.roleName);
            localStorage.setItem('userName', _this.userName);
            // --------
            if (localStorage.getItem('role') === '1') {
                _this.router.navigateByUrl('/dashboard');
            }
            else if (localStorage.getItem('role') !== '1') {
                _this.router.navigateByUrl('/index');
            }
            console.log(_this.role);
            console.log(_this.token);
        }, function (err) {
            if (err.status = 400) {
                // show message
                _this.alertService.error('Invalid Username or Password!');
            }
            else {
                console.log(err);
            }
        });
    };
    LoginComponent.prototype.onSubmit = function () {
        // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model));
        // this.ngOnInit();
        // this.ngOnDestroy();
        this.login();
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        }),
        __metadata("design:paramtypes", [authentication_service_1.AuthenticationService,
            router_1.Router,
            alertmessage_service_1.AlertmessageService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map