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
var job_service_1 = require("app/services/jobs/job.service");
var keyskills_service_1 = require("app/services/keyskills.service");
var alertmessage_service_1 = require("app/services/alertmessage.service");
var CompanyjobDetailComponent = /** @class */ (function () {
    // Create a interface of Service
    function CompanyjobDetailComponent(JobsService, router, activatedRoute, KeyskillService, companylistService, alertService) {
        this.JobsService = JobsService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.KeyskillService = KeyskillService;
        this.companylistService = companylistService;
        this.alertService = alertService;
        this.job = [];
        this.keyskill = [];
        this.company = [];
        this.typejob = [];
        this.companyjob = [];
    }
    CompanyjobDetailComponent.prototype.getdetailjobbyID = function (id) {
        var _this = this;
        this.JobsService.getdetailjob(id).subscribe(function (value) {
            if (value['code'] === 200) {
                _this.job = value['data'];
                _this.company = value['data'].company;
                _this.typejob = value['data'].jobType;
                _this.companyID = value['data'].company.id;
                // console.log(this.job);
                // console.log(this.company);
                localStorage.setItem('CompanyID', _this.companyID);
            }
            else {
                alert('Something error!');
            }
        }, function (error) { return console.log(error); });
    };
    CompanyjobDetailComponent.prototype.getKeyskillFromService = function () {
        var _this = this;
        // Get data from function which get data (API URL) in service and convert
        this.KeyskillService.getKeyskills().subscribe(function (value) {
            // if code api true
            if (value['code'] === 200) {
                // fetch data to interface of model
                _this.keyskill = value['data'];
                console.log(_this.keyskill);
            }
            else {
                alert(value['code']);
            }
        }, function (error) { return console.log(error); });
    };
    CompanyjobDetailComponent.prototype.getjobcompanybyIDPublic = function (id) {
        var _this = this;
        this.companylistService.getjobcompanybyIDPublic(id).subscribe(function (value) {
            if (value['code'] === 200) {
                _this.companyjob = value['data'].items;
                console.log('companyjob' + _this.companyjob);
            }
            else {
                alert(value['error']);
            }
        }, function (error) { return console.log(error); });
    };
    //  load() {
    //    return window.location.reload();
    //  }
    CompanyjobDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getdetailjobbyID(this.activatedRoute.snapshot.params['id']);
        this.getKeyskillFromService();
        this.getjobcompanybyIDPublic(localStorage.getItem('CompanyID'));
        this.subscription = this.alertService.getMessage().subscribe(function (message) {
            _this.message = message;
        });
    };
    CompanyjobDetailComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    CompanyjobDetailComponent = __decorate([
        core_1.Component({
            selector: 'app-companyjob-detail',
            templateUrl: './companyjob-detail.component.html',
            styleUrls: ['./companyjob-detail.component.scss']
        }),
        __metadata("design:paramtypes", [job_service_1.JobService,
            router_1.Router,
            router_1.ActivatedRoute,
            keyskills_service_1.KeyskillsService,
            companylist_service_1.CompanylistService,
            alertmessage_service_1.AlertmessageService])
    ], CompanyjobDetailComponent);
    return CompanyjobDetailComponent;
}());
exports.CompanyjobDetailComponent = CompanyjobDetailComponent;
//# sourceMappingURL=companyjob-detail.component.js.map