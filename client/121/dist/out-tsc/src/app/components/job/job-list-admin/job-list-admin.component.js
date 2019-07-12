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
var job_service_1 = require("app/services/jobs/job.service");
var router_1 = require("@angular/router");
var JobListAdminComponent = /** @class */ (function () {
    function JobListAdminComponent(jobService, router) {
        this.jobService = jobService;
        this.router = router;
        this.allJobsAdmin = [];
        this.condition = {
            PageNumber: 1,
            PageSize: 10,
            Sort: 'company',
            Type: 'asc'
        };
    }
    JobListAdminComponent.prototype.ngOnInit = function () {
        this.getAllJobsAdmin();
    };
    JobListAdminComponent.prototype.getAllJobsAdmin = function () {
        var _this = this;
        this.jobService.getAllJobsAdmin(this.condition).subscribe(function (value) {
            if (value['code'] === 200) {
                _this.allJobsAdmin = value['data'].items;
                _this.totalPage = value['data'].paging.totalPages;
            }
            else {
                alert(value['code']);
            }
        }, function (error) { return console.log(error); });
    };
    JobListAdminComponent.prototype.setItemPerPage = function () {
        this.condition.PageNumber = 1;
        this.getAllJobsAdmin();
    };
    JobListAdminComponent.prototype.arrayOne = function () {
        console.log('total page: ' + this.totalPage);
        return Array(this.totalPage);
    };
    JobListAdminComponent.prototype.changePage = function (page) {
        this.condition.PageNumber = page;
        this.getAllJobsAdmin();
    };
    JobListAdminComponent.prototype.previousPage = function () {
        this.condition.PageNumber--;
        this.getAllJobsAdmin();
    };
    JobListAdminComponent.prototype.nextPage = function () {
        this.condition.PageNumber++;
        this.getAllJobsAdmin();
    };
    JobListAdminComponent.prototype.changeStatusJob = function (id) {
        var _this = this;
        if (confirm('Are you sure?')) {
            this.jobService.changeStatusJob(id).subscribe(function (value) {
                if (value['code'] === 200) {
                    _this.getAllJobsAdmin();
                }
                else {
                    alert(value['code']);
                }
            }, function (error) { return console.log(error); });
        }
    };
    JobListAdminComponent.prototype.getJobDetail = function (id) {
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
    JobListAdminComponent.prototype.SortBy = function (sort, type) {
        this.condition.Sort = sort;
        this.condition.Type = type;
        this.getAllJobsAdmin();
    };
    JobListAdminComponent = __decorate([
        core_1.Component({
            selector: 'app-job-list-admin',
            templateUrl: './job-list-admin.component.html',
            styleUrls: ['./job-list-admin.component.scss']
        }),
        __metadata("design:paramtypes", [job_service_1.JobService,
            router_1.Router])
    ], JobListAdminComponent);
    return JobListAdminComponent;
}());
exports.JobListAdminComponent = JobListAdminComponent;
//# sourceMappingURL=job-list-admin.component.js.map