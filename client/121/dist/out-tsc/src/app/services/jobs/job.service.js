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
var apiURL_1 = require("app/define/apiURL");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var JobService = /** @class */ (function () {
    function JobService(http) {
        this.http = http;
        this.jobURL = apiURL_1.API_URL + 'jobs';
        this.detailjobURL = apiURL_1.API_URL + 'jobs/public';
        this.appliyJob = apiURL_1.API_URL + 'jobs/applied/user';
    }
    JobService.prototype.getAllJobsAdmin = function (condition) {
        return this.http.get(this.jobURL + '?PageNumber=' + condition.PageNumber +
            '&PageSize=' + condition.PageSize +
            '&Sort=' + condition.Sort +
            '&Type=' + condition.Type);
    };
    JobService.prototype.getJobApplied = function () {
        return this.http.get(this.appliyJob);
    };
    JobService.prototype.changeStatusJob = function (id) {
        var url = this.jobURL + "/review/" + id;
        return this.http.put(url, id, apiURL_1.httpOptions).pipe(operators_1.catchError(this.handleError('review user')));
    };
    // get by id
    JobService.prototype.getJobByIDAdmin = function (id) {
        var url = this.jobURL + "/" + id;
        return this.http.get(url).pipe(operators_1.tap(function (_) { return console.log("fetched User id=" + id); }), operators_1.catchError(this.handleError("getuserlistByID id=" + id)));
    };
    JobService.prototype.getdetailjob = function (id) {
        var url = this.detailjobURL + "/" + id;
        return this.http.get(url).pipe(operators_1.tap(function (_) { return console.log("fetched job id=" + id); }), operators_1.catchError(this.handleError("getdetailjob id=" + id)));
    };
    // handle Error
    JobService.prototype.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // Let the app keep running by returning an empty result.
            return rxjs_1.of(result);
        };
    };
    JobService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], JobService);
    return JobService;
}());
exports.JobService = JobService;
//# sourceMappingURL=job.service.js.map