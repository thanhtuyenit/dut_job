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
var change_pass_service_1 = require("app/services/change-pass.service");
var router_1 = require("@angular/router");
var ChangepwAdminComponent = /** @class */ (function () {
    function ChangepwAdminComponent(changepass, router) {
        this.changepass = changepass;
        this.router = router;
    }
    ChangepwAdminComponent.prototype.ngOnInit = function () {
    };
    ChangepwAdminComponent.prototype.ChangePass = function (form) {
        this.changepass.updatePassword(form)
            .subscribe(function (res) {
            // this.router.navigate(['/icons']);
            console.log(form);
        }, function (err) {
            console.log(err);
        });
    };
    ChangepwAdminComponent = __decorate([
        core_1.Component({
            selector: 'app-changepw-admin',
            templateUrl: './changepw-admin.component.html',
            styleUrls: ['./changepw-admin.component.scss']
        }),
        __metadata("design:paramtypes", [change_pass_service_1.ChangePassService, router_1.Router])
    ], ChangepwAdminComponent);
    return ChangepwAdminComponent;
}());
exports.ChangepwAdminComponent = ChangepwAdminComponent;
//# sourceMappingURL=changepw-admin.component.js.map