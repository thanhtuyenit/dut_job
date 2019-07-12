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
var http_1 = require("@angular/common/http");
var apiURL_1 = require("app/define/apiURL");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var PostJobService = /** @class */ (function () {
    function PostJobService(http) {
        this.http = http;
        this.postURL = apiURL_1.API_URL + 'jobs/user/create';
        this.typeJobURL = apiURL_1.API_URL + 'type/jobs';
        this.allJobbyCompany = apiURL_1.API_URL + 'jobs/user';
    }
    PostJobService.prototype.createPost = function (postJob) {
        return this.http.post(this.postURL, postJob, apiURL_1.httpOptions).pipe(operators_1.catchError(this.handleError('addpost')));
    };
    PostJobService.prototype.getTypejob = function () {
        return this.http.get(this.typeJobURL).pipe(
        // if get data true => run tap()
        operators_1.tap(function (receiveTypeJob) { return console.log("receiveTypeJob= " + JSON.stringify(receiveTypeJob)); }), 
        // else return Error
        operators_1.catchError(function (Error) { return rxjs_1.of([]); }));
    };
    PostJobService.prototype.getALljobByCompany = function (condition) {
        return this.http.get(this.allJobbyCompany + '?PageNumber=' + condition.PageNumber + '&PageSize=' + condition.PageSize).pipe(operators_1.catchError(this.handleError('getalljob')));
    };
    PostJobService.prototype.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // Let the app keep running by returning an empty result.
            return rxjs_1.of(result);
        };
    };
    PostJobService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], PostJobService);
    return PostJobService;
}());
exports.PostJobService = PostJobService;
//# sourceMappingURL=post-job.service.js.map