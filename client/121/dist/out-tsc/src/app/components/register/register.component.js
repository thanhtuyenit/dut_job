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
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(auth, router, alertService) {
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
    RegisterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.alertService.getMessage().subscribe(function (message) {
            _this.message = message;
        });
    };
    RegisterComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    RegisterComponent.prototype.register = function () {
        var _this = this;
        this.auth.register(this.credentials).subscribe(function () {
            _this.alertService.success('Register success');
            // route to dashboard if login true
            //  this.router.navigateByUrl('/');
        }, function (err) {
            if (err.status = 400) {
                // show message
                _this.alertService.error('EXITS!');
            }
            else {
                console.log(err);
            }
        });
    };
    RegisterComponent.prototype.onSubmit = function () {
        // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model));
        // this.ngOnInit();
        // this.ngOnDestroy();
        this.register();
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.scss']
        }),
        __metadata("design:paramtypes", [authentication_service_1.AuthenticationService, router_1.Router, alertmessage_service_1.AlertmessageService])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map