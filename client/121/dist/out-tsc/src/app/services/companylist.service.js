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
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var http_1 = require("@angular/common/http");
var CompanylistService = /** @class */ (function () {
    function CompanylistService(http) {
        this.http = http;
        // get API URL
        this.companyURL = apiURL_1.API_URL + 'companies';
        this.listcompanyURL = apiURL_1.API_URL + 'companies/faculty';
        this.jobcompanyURL = apiURL_1.API_URL + 'jobs/public/company';
        this.profilecompanybyUserID_URL = apiURL_1.API_URL + 'companies/user';
    }
    //  Create a function to get data from API URL
    CompanylistService.prototype.getcompany = function (condition) {
        return this.http.get(this.companyURL + '?PageNumber=' + condition.PageNumber + '&PageSize=' + condition.PageSize).pipe(
        // if get data true => run tap()
        operators_1.tap(function (receiveCompany) { return console.log("receiveCompany= " + JSON.stringify(receiveCompany)); }), 
        // else return Error
        operators_1.catchError(function (Error) { return rxjs_1.of([]); }));
    };
    CompanylistService.prototype.getcompanybyID = function (id) {
        var url = this.companyURL + "/" + id;
        return this.http.get(url).pipe(operators_1.tap(function (_) { return console.log("fetched company id=" + id); }), operators_1.catchError(this.handleError("getcompanybyID id=" + id)));
    };
    CompanylistService.prototype.getcompanybyfacultyID = function (id) {
        var url = this.listcompanyURL + "/" + id;
        return this.http.get(url).pipe(operators_1.tap(function (_) { return console.log("fetched faculty id=" + id); }), operators_1.catchError(this.handleError("getcompanybyfacultyID id=" + id)));
    };
    CompanylistService.prototype.getjobcompanybyID = function (id) {
        var url = this.jobcompanyURL + "/" + id;
        return this.http.get(url).pipe(operators_1.tap(function (_) { return console.log("fetched company id=" + id); }), operators_1.catchError(this.handleError(" getjobcompanybyID id=" + id)));
    };
    CompanylistService.prototype.getjobcompanybyIDPublic = function (id) {
        var url = "https://localhost:44371/api/jobs/public/company/" + id + "?PageNumber=1&PageSize=10000";
        return this.http.get(url).pipe(operators_1.tap(function (_) { return console.log("fetched company id=" + id); }), operators_1.catchError(this.handleError(" getjobcompanybyID id=" + id)));
    };
    CompanylistService.prototype.getprofilecompanybyUserID = function () {
        return this.http.get(this.profilecompanybyUserID_URL).pipe(
        // if get data true => run tap()
        operators_1.tap(function (receiveProfileCompany) { return console.log("receiveProfileCompany= " + JSON.stringify(receiveProfileCompany)); }), 
        // else return Error
        operators_1.catchError(function (Error) { return rxjs_1.of([]); }));
    };
    // Add Company
    CompanylistService.prototype.addcompany = function (company) {
        var url = this.companyURL + '/create';
        return this.http.post(url, company, apiURL_1.httpOptions).pipe(operators_1.catchError(this.handleError('addcompany')));
    };
    // ENd- Add Company
    // Delete Company
    CompanylistService.prototype.deletecompany = function (id) {
        var url = this.companyURL + "/" + id;
        return this.http.delete(url, apiURL_1.httpOptions).pipe(operators_1.catchError(this.handleError('deletecompany')));
    };
    // End delete Company
    // Update Company
    CompanylistService.prototype.updatecompany = function (company) {
        var url = this.companyURL + "/user/" + company.id;
        return this.http.put(url, company, apiURL_1.httpOptions).pipe(operators_1.catchError(this.handleError('updatecompany')));
    };
    // End Update Company
    // handle Error
    CompanylistService.prototype.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // Let the app keep running by returning an empty result.
            return rxjs_1.of(result);
        };
    };
    CompanylistService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], CompanylistService);
    return CompanylistService;
}());
exports.CompanylistService = CompanylistService;
//# sourceMappingURL=companylist.service.js.map