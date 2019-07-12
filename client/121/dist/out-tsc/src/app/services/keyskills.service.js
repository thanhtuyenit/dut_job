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
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var KeyskillsService = /** @class */ (function () {
    // delete keyskill of user
    function KeyskillsService(http) {
        this.http = http;
        // get API URL
        this.keyskillsURL = apiURL_1.API_URL + 'skills';
        this.deleteUrl = apiURL_1.API_URL + 'profile/skills';
    }
    //  Create a function to get data from API URL
    KeyskillsService.prototype.getKeyskills = function () {
        return this.http.get(this.keyskillsURL).pipe(
        // if get data true => run tap()
        // tap(recieveKeyskill => console.log(`receiveKeyskill= ${JSON.stringify(recieveKeyskill)}`)),
        // else return Error
        operators_1.catchError(this.handleError('getKeyskills')));
    };
    KeyskillsService.prototype.getSkillCanAddForUser = function () {
        return this.http.get('https://localhost:44371/api/skills/add/user').pipe(
        // if get data true => run tap()
        //  tap( receiveFaculty => console.log(`receiveFaculty= ${JSON.stringify(receiveFaculty)}`)),
        // else return Error
        operators_1.catchError(function (Error) { return rxjs_1.of([]); }));
    };
    KeyskillsService.prototype.getSkillCanAddForCompany = function () {
        return this.http.get('https://localhost:44371/api/skills/add/company').pipe(
        // if get data true => run tap()
        //  tap( receiveFaculty => console.log(`receiveFaculty= ${JSON.stringify(receiveFaculty)}`)),
        // else return Error
        operators_1.catchError(function (Error) { return rxjs_1.of([]); }));
    };
    // End Get Key skill
    // get by id
    KeyskillsService.prototype.getKeyskillsByID = function (id) {
        var url = this.keyskillsURL + "/" + id;
        return this.http.get(url).pipe(operators_1.tap(function (_) { return console.log("fetched keyskills id=" + id); }), operators_1.catchError(this.handleError("getKeyskillsByID id=" + id)));
    };
    //  end
    // Add Key Skill
    KeyskillsService.prototype.addKeyskills = function (keyskill) {
        var url = this.keyskillsURL + '/create';
        return this.http.post(url, keyskill, apiURL_1.httpOptions).pipe(operators_1.catchError(this.handleError('addKeyskills')));
    };
    // end add
    // add keyskill to user
    KeyskillsService.prototype.addKeys = function (keyskill) {
        var url = apiURL_1.API_URL + 'profile/skills';
        return this.http.put(url, keyskill, apiURL_1.httpOptions).pipe(operators_1.catchError(this.handleError('addKeys')));
    };
    // add keyskill to user
    // delete keyskill of user
    KeyskillsService.prototype.deleteKeys = function (id) {
        var url = this.deleteUrl + "/" + id;
        // const url = this.deleteUrl;
        return this.http.delete(url, apiURL_1.httpOptions).pipe(operators_1.tap(function (recieveKeys) { return console.log("receiveKeys= " + JSON.stringify(recieveKeys)); }), operators_1.catchError(this.handleError('deleteKeyskills')));
    };
    // delete keyskill of user
    // update key skill
    KeyskillsService.prototype.updateKeyskills = function (keyskill) {
        var url = this.keyskillsURL + "/" + keyskill.id;
        return this.http.put(url, keyskill, apiURL_1.httpOptions).pipe(operators_1.catchError(this.handleError('updateKeyskills')));
    };
    // ENd update key skill
    // Delete Key skill
    KeyskillsService.prototype.deleteKeyskills = function (id) {
        var url = this.keyskillsURL + "/" + id;
        return this.http.delete(url, apiURL_1.httpOptions).pipe(operators_1.tap(function (recieveKeyskill) { return console.log("receiveFaculty= " + JSON.stringify(recieveKeyskill)); }), operators_1.catchError(this.handleError('deleteKeyskills')));
    };
    // End key Skill
    // handle Error
    KeyskillsService.prototype.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // Let the app keep running by returning an empty result.
            return rxjs_1.of(result);
        };
    };
    // add keyskill to user
    KeyskillsService.prototype.addKeyscompany = function (keyskill) {
        var url = apiURL_1.API_URL + 'companies/user/skills';
        return this.http.post(url, keyskill, apiURL_1.httpOptions).pipe(operators_1.catchError(this.handleError('addKeys')));
    };
    // add keyskill to user
    // delete keyskill of user
    KeyskillsService.prototype.deleteKeyscompany = function (id) {
        var url = apiURL_1.API_URL + "companies/user/skills/" + id;
        // const url = this.deleteUrl;
        return this.http.delete(url, apiURL_1.httpOptions).pipe(operators_1.tap(function (recieveKeyscompany) { return console.log("receiveKeyscompany= " + JSON.stringify(recieveKeyscompany)); }), operators_1.catchError(this.handleError('deleteKeyskillscompany')));
    };
    KeyskillsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], KeyskillsService);
    return KeyskillsService;
}());
exports.KeyskillsService = KeyskillsService;
//# sourceMappingURL=keyskills.service.js.map