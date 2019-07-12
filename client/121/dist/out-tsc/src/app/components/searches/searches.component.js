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
var SearchesComponent = /** @class */ (function () {
    function SearchesComponent() {
    }
    SearchesComponent.prototype.ngOnInit = function () {
    };
    SearchesComponent = __decorate([
        core_1.Component({
            selector: 'app-searches',
            templateUrl: './searches.component.html',
            styleUrls: ['./searches.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], SearchesComponent);
    return SearchesComponent;
}());
exports.SearchesComponent = SearchesComponent;
//# sourceMappingURL=searches.component.js.map