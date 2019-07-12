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
var listfaculty_service_1 = require("app/services/listfaculty.service");
var post_job_service_1 = require("app/services/post-job.service");
var keyskills_service_1 = require("app/services/keyskills.service");
var job_1 = require("app/model/job");
var PostCompanyJobComponent = /** @class */ (function () {
    // --------
    // ----------
    function PostCompanyJobComponent(router, postjobService, listfacultyService, KeyskillService, typejobService) {
        this.router = router;
        this.postjobService = postjobService;
        this.listfacultyService = listfacultyService;
        this.KeyskillService = KeyskillService;
        this.typejobService = typejobService;
        this.facultyList = [];
        this.keyskill = [];
        this.jobType = [];
        this.job = new job_1.Job();
        this.role = localStorage.getItem('role');
    }
    PostCompanyJobComponent.prototype.ngOnInit = function () {
        this.getFacultyFromService();
        this.getKeyskillFromService();
        this.getTypejob();
    };
    PostCompanyJobComponent.prototype.getCheckboxes = function () {
        this.job.skills = this.keyskill.filter(function (x) { return x.selected; });
        // this.job.faculties = this.faculty.filter(c => c.selected);
        console.log(this.job.skills);
        console.log(this.job.faculties);
    };
    ////////////
    PostCompanyJobComponent.prototype.addPost = function (form) {
        var _this = this;
        // console.log(form);
        this.job.title = form.controls['title'].value;
        this.job.reason = form.controls['reason'].value;
        // this.job.dateExpire = form.controls['dateExpire'].value;
        this.job.experience = form.controls['experience'].value;
        this.job.benefit = form.controls['benefit'].value;
        this.job.salary = form.controls['salary'].value;
        this.job.jobTypeID = form.controls['jobTypeID'].value;
        // this.job.faculties = this.faculty.filter(c => c.selected);
        this.job.facultyID = form.controls['facultyID'].value;
        this.job.skills = this.keyskill.filter(function (x) { return x.selected; });
        this.job.description = form.controls['description'].value;
        console.log(this.job);
        this.postjobService.createPost(this.job)
            .subscribe(function (res) {
            // this.router.navigate(['/company', localStorage.getItem('CompanyID')]);
            _this.router.navigate(['/companymanagealljob']);
        }, function (err) {
            console.log(err);
        });
    };
    PostCompanyJobComponent.prototype.getFacultyFromService = function () {
        var _this = this;
        this.listfacultyService.getfaculty().subscribe(function (value) {
            if (value['code'] === 200) {
                _this.facultyList = value['data'];
                // console.log(this.facultyList);
            }
            else {
                alert('Something error!');
            }
        }, function (error) { return console.log(error); });
    };
    PostCompanyJobComponent.prototype.getKeyskillFromService = function () {
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
    PostCompanyJobComponent.prototype.getTypejob = function () {
        var _this = this;
        this.typejobService.getTypejob().subscribe(function (value) {
            if (value['code'] === 200) {
                _this.jobType = value['data'];
                console.log(_this.jobType);
            }
            else {
                alert(value['code']);
            }
        }, function (error) { return console.log(error); });
    };
    PostCompanyJobComponent = __decorate([
        core_1.Component({
            selector: 'app-post-company-job',
            templateUrl: './post-company-job.component.html',
            styleUrls: ['./post-company-job.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.Router, post_job_service_1.PostJobService,
            listfaculty_service_1.ListfacultyService, keyskills_service_1.KeyskillsService,
            post_job_service_1.PostJobService])
    ], PostCompanyJobComponent);
    return PostCompanyJobComponent;
}());
exports.PostCompanyJobComponent = PostCompanyJobComponent;
//# sourceMappingURL=post-company-job.component.js.map