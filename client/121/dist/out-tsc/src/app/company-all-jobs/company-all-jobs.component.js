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
var post_job_service_1 = require("app/services/post-job.service");
var router_1 = require("@angular/router");
var job_service_1 = require("app/services/jobs/job.service");
var CompanyAllJobsComponent = /** @class */ (function () {
    function CompanyAllJobsComponent(alljobService, jobService, router) {
        this.alljobService = alljobService;
        this.jobService = jobService;
        this.router = router;
        this.role = localStorage.getItem('role');
        this.condition = {
            PageNumber: 1,
            PageSize: 10,
            Sort: 'company',
            Type: 'asc'
        };
        this.job = [];
    }
    CompanyAllJobsComponent.prototype.ngOnInit = function () {
        this.getjobcompanylist();
    };
    CompanyAllJobsComponent.prototype.getjobcompanylist = function () {
        var _this = this;
        this.alljobService.getALljobByCompany(this.condition).subscribe(function (value) {
            if (value['code'] === 200) {
                _this.job = value['data'].items;
                _this.totalPage = value['data'].paging.totalPages;
                console.log(_this.job);
            }
            else {
                alert(value['code']);
            }
        }, function (error) { return console.log(error); });
    };
    CompanyAllJobsComponent.prototype.setItemPerPage = function () {
        this.condition.PageNumber = 1;
        this.getjobcompanylist();
    };
    CompanyAllJobsComponent.prototype.arrayOne = function () {
        console.log('total page: ' + this.totalPage);
        return Array(this.totalPage);
    };
    CompanyAllJobsComponent.prototype.changePage = function (page) {
        this.condition.PageNumber = page;
        this.getjobcompanylist();
    };
    CompanyAllJobsComponent.prototype.previousPage = function () {
        this.condition.PageNumber--;
        this.getjobcompanylist();
    };
    CompanyAllJobsComponent.prototype.nextPage = function () {
        this.condition.PageNumber++;
        this.getjobcompanylist();
    };
    CompanyAllJobsComponent.prototype.SortBy = function (sort, type) {
        this.condition.Sort = sort;
        this.condition.Type = type;
        this.getjobcompanylist();
    };
    CompanyAllJobsComponent.prototype.getJobDetail = function (id) {
        var _this = this;
        this.jobService.getJobByIDAdmin(id).subscribe(function (value) {
            if (value['code'] === 200) {
                _this.jobAdmin = value['data'];
            }
            else {
                alert(value['code']);
            }
        }, function (error) { return console.log(error); });
    };
    ;
    CompanyAllJobsComponent = __decorate([
        core_1.Component({
            selector: 'app-company-all-jobs',
            templateUrl: './company-all-jobs.component.html',
            styleUrls: ['./company-all-jobs.component.scss']
        }),
        __metadata("design:paramtypes", [post_job_service_1.PostJobService, job_service_1.JobService, router_1.Router])
    ], CompanyAllJobsComponent);
    return CompanyAllJobsComponent;
}());
exports.CompanyAllJobsComponent = CompanyAllJobsComponent;
//# sourceMappingURL=company-all-jobs.component.js.map