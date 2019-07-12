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
var http_1 = require("@angular/common/http");
var job_service_1 = require("app/services/jobs/job.service");
var ProfileUserComponent = /** @class */ (function () {
    function ProfileUserComponent(auth, KeyskillService, router, alertService, listfacultyService, http, jobService) {
        this.auth = auth;
        this.KeyskillService = KeyskillService;
        this.router = router;
        this.alertService = alertService;
        this.listfacultyService = listfacultyService;
        this.http = http;
        this.jobService = jobService;
        // faculty: User[] = [];
        this.skillList = [];
        this.facultyList = [];
        this.role = localStorage.getItem('role');
    }
    ProfileUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getAppliedJob();
        this.profile();
        this.getFacultyFromService();
        this.getKeyskillFromService();
        this.subscription = this.alertService.getMessage().subscribe(function (message) { _this.message = message; });
    };
    ProfileUserComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    ProfileUserComponent.prototype.getKeyskillFromService = function () {
        var _this = this;
        // Get data from function which get data (API URL) in service and convert
        this.KeyskillService.getSkillCanAddForUser().subscribe(function (value) {
            // if code api true
            if (value['code'] === 200) {
                // fetch data to interface of model
                _this.skillList = value['data'];
                // console.log(this.keyskill);
            }
            else {
                alert('Somthing error!');
            }
        }, function (err) {
            if (err.status = 400) {
                // show message
                _this.alertService.error('Something error!');
            }
            else {
                console.log(err);
            }
        });
    };
    ProfileUserComponent.prototype.profile = function () {
        var _this = this;
        this.auth.profile().subscribe(function (value) {
            if (value['code'] === 200) {
                _this.user = value['data'];
                _this.facultyCurrentUser = value['data'].faculty;
                _this.cv = _this.user.cvLink;
                _this.urlCV = "https://localhost:44371/cv/" + _this.cv;
                console.log(_this.cv);
                // console.log('user1: ' + this.facultyCurrentUser.id);
                // console.log('user1: ' + this.user.faculty.id);
            }
            else {
                alert(value['code']);
            }
        }, function (error) { return console.log(error); });
    };
    ProfileUserComponent.prototype.openCV = function () {
        window.open(this.urlCV);
    };
    ProfileUserComponent.prototype.updateprofile = function (form) {
        this.auth.updateprofile(form).subscribe(function (res) {
            // this.router.navigate(['/typography']);
            console.log(form);
            // this.profile();
        }, function (err) {
            console.log(err);
        });
    };
    ProfileUserComponent.prototype.addKey = function (form) {
        var _this = this;
        // alert(this.keyskill);
        this.KeyskillService.addKeys(form)
            .subscribe(function (res) {
            // console.log(form)
            _this.profile();
            _this.getKeyskillFromService();
        }, function (err) {
            if (err.status = 400) {
                // show message
                _this.alertService.error('Something error!');
            }
            else {
                console.log(err);
            }
        });
    };
    ProfileUserComponent.prototype.deleteKey = function (id) {
        var _this = this;
        if (confirm('Are you sure to delete this record?')) {
            this.KeyskillService.deleteKeys(id)
                .subscribe(function (res) {
                console.log(id);
                _this.profile();
                _this.getKeyskillFromService();
            }, function (err) {
                console.log(err);
            });
        }
    };
    ProfileUserComponent.prototype.getFacultyFromService = function () {
        var _this = this;
        this.listfacultyService.getfaculty().subscribe(function (value) {
            if (value['code'] === 200) {
                _this.facultyList = value['data'];
                // console.log(this.faculty);
            }
            else {
                alert('Something error!');
            }
        }, function (error) { return console.log(error); });
    };
    ProfileUserComponent.prototype.getAppliedJob = function () {
        var _this = this;
        this.jobService.getJobApplied().subscribe(function (value) {
            if (value['code'] === 200) {
                _this.appliedJobList = value['data'];
                // console.log(this.faculty);
            }
            else {
                alert('Something error!');
            }
        }, function (error) { return console.log(error); });
    };
    ProfileUserComponent.prototype.upload = function (files) {
        var _this = this;
        if (files.length === 0) {
            return;
        }
        var formData = new FormData();
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            formData.append(file.name, file);
        }
        var uploadReq = new http_1.HttpRequest('POST', "https://localhost:44371/api/upload", formData, {
            reportProgress: true,
        });
        this.http.request(uploadReq).subscribe(function (event) {
            if (event.type === http_1.HttpEventType.UploadProgress) {
                _this.progress = Math.round(100 * event.loaded / event.total);
            }
            else if (event.type === http_1.HttpEventType.Response) {
                _this.message = event.body.toString();
                _this.profile();
                // window.location.reload();
            }
        });
    };
    ProfileUserComponent = __decorate([
        core_1.Component({
            selector: 'app-profile-user',
            templateUrl: './profile-user.component.html',
            styleUrls: ['./profile-user.component.scss']
        }),
        __metadata("design:paramtypes", [authentication_service_1.AuthenticationService,
            keyskills_service_1.KeyskillsService,
            router_1.Router,
            alertmessage_service_1.AlertmessageService,
            listfaculty_service_1.ListfacultyService,
            http_1.HttpClient,
            job_service_1.JobService])
    ], ProfileUserComponent);
    return ProfileUserComponent;
}());
exports.ProfileUserComponent = ProfileUserComponent;
//# sourceMappingURL=profile-user.component.js.map