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
var ListfacultyService = /** @class */ (function () {
    function ListfacultyService(http) {
        this.http = http;
        // get API URL
        this.facultyURL = apiURL_1.API_URL + 'faculties/top4';
    }
    //  Create a function to get data from API URL
    ListfacultyService.prototype.getfaculty = function () {
        return this.http.get(this.facultyURL).pipe(
        // if get data true => run tap()
        //  tap( receiveFaculty => console.log(`receiveFaculty= ${JSON.stringify(receiveFaculty)}`)),
        // else return Error
        operators_1.catchError(function (Error) { return rxjs_1.of([]); }));
    };
    // get by id
    ListfacultyService.prototype.getfacultyByID = function (id) {
        var url = this.facultyURL + "/" + id;
        return this.http.get(url).pipe(operators_1.tap(function (_) { return console.log("fetched faculty id=" + id); }), operators_1.catchError(this.handleError("getfacultyByID id=" + id)));
    };
    //  end
    // Add Faculty
    ListfacultyService.prototype.addfaculty = function (faculty) {
        var url = this.facultyURL + '/create';
        return this.http.post(url, faculty, apiURL_1.httpOptions).pipe(operators_1.catchError(this.handleError('addfaculty')));
    };
    // ENd- Add Faculty
    // Update Faculty
    ListfacultyService.prototype.updatefaculty = function (faculty) {
        var url = this.facultyURL + "/" + faculty.id;
        return this.http.put(url, faculty, apiURL_1.httpOptions).pipe(operators_1.catchError(this.handleError('updatefaculty')));
    };
    // End Update Faculty
    // Delete Faclty
    ListfacultyService.prototype.deletefaculty = function (id) {
        var url = this.facultyURL + "/" + id;
        return this.http.delete(url, apiURL_1.httpOptions).pipe(operators_1.catchError(this.handleError('deletefaculty')));
    };
    // End deleteFaculty
    // handle Error
    ListfacultyService.prototype.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // Let the app keep running by returning an empty result.
            return rxjs_1.of(result);
        };
    };
    ListfacultyService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], ListfacultyService);
    return ListfacultyService;
}());
exports.ListfacultyService = ListfacultyService;
//# sourceMappingURL=listfaculty.service.js.map