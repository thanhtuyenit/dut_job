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
var keyskills_service_1 = require("app/services/keyskills.service");
var router_1 = require("@angular/router");
var alertmessage_service_1 = require("app/services/alertmessage.service");
var listfaculty_service_1 = require("app/services/listfaculty.service");
var ProfileAdminComponent = /** @class */ (function () {
    function ProfileAdminComponent(auth, KeyskillService, router, alertService, listfacultyService) {
        this.auth = auth;
        this.KeyskillService = KeyskillService;
        this.router = router;
        this.alertService = alertService;
        this.listfacultyService = listfacultyService;
        // faculty: User[] = [];
        this.skillList = [];
        this.facultyList = [];
    }
    ProfileAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.profile();
        this.getFacultyFromService();
        this.getKeyskillFromService();
        this.subscription = this.alertService.getMessage().subscribe(function (message) {
            _this.message = message;
        });
    };
    ProfileAdminComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    ProfileAdminComponent.prototype.getKeyskillFromService = function () {
        var _this = this;
        // Get data from function which get data (API URL) in service and convert
        this.KeyskillService.getKeyskills().subscribe(function (value) {
            // if code api true
            if (value['code'] === 200) {
                // fetch data to interface of model
                _this.skillList = value['data'];
                // console.log(this.keyskill);
            }
            else {
                alert(value['code']);
            }
        }, function (err) {
            if (err.status = 400) {
                // show message
                _this.alertService.error('Some thing Wrong!');
            }
            else {
                console.log(err);
            }
        });
    };
    ProfileAdminComponent.prototype.profile = function () {
        var _this = this;
        this.auth.profile().subscribe(function (value) {
            if (value['code'] === 200) {
                _this.user = value['data'];
                _this.facultyCurrentUser = value['data'].faculty;
                // this.faculty =  value['data'].faculty;
                // console.log(this.user1);
                // console.log(this.user);
            }
            else {
                alert(value['code']);
            }
        }, function (error) { return console.log(error); });
    };
    ProfileAdminComponent.prototype.updateprofile = function (form) {
        this.auth.updateprofile(form).subscribe(function (res) {
            // this.router.navigate(['/typography']);
            console.log(form);
            // this.profile();
        }, function (err) {
            console.log(err);
        });
    };
    ProfileAdminComponent.prototype.addKey = function (form) {
        var _this = this;
        // alert(this.keyskill);
        this.KeyskillService.addKeys(form)
            .subscribe(function (res) {
            console.log(form);
            _this.profile();
        }, function (err) {
            if (err.status = 400) {
                // show message
                _this.alertService.error('Something go Wrong!');
            }
            else {
                console.log(err);
            }
        });
    };
    ProfileAdminComponent.prototype.deleteKey = function (id) {
        var _this = this;
        if (confirm('Are you sure to delete this record?')) {
            this.KeyskillService.deleteKeys(id)
                .subscribe(function (res) {
                console.log(id);
                _this.profile();
            }, function (err) {
                console.log(err);
            });
        }
    };
    ProfileAdminComponent.prototype.getFacultyFromService = function () {
        var _this = this;
        this.listfacultyService.getfaculty().subscribe(function (value) {
            if (value['code'] === 200) {
                _this.facultyList = value['data'];
                // console.log(this.faculty);
            }
            else {
                alert(value['code']);
            }
        }, function (error) { return console.log(error); });
    };
    ProfileAdminComponent = __decorate([
        core_1.Component({
            selector: 'app-profile-admin',
            templateUrl: './profile-admin.component.html',
            styleUrls: ['./profile-admin.component.scss']
        }),
        __metadata("design:paramtypes", [authentication_service_1.AuthenticationService,
            keyskills_service_1.KeyskillsService,
            router_1.Router,
            alertmessage_service_1.AlertmessageService,
            listfaculty_service_1.ListfacultyService])
    ], ProfileAdminComponent);
    return ProfileAdminComponent;
}());
exports.ProfileAdminComponent = ProfileAdminComponent;
//# sourceMappingURL=profile-admin.component.js.map