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
var listfaculty_service_1 = require("app/services/listfaculty.service");
var router_1 = require("@angular/router");
var AddFacultyComponent = /** @class */ (function () {
    function AddFacultyComponent(listfacultyService, router) {
        this.listfacultyService = listfacultyService;
        this.router = router;
        this.faculty = [];
    }
    AddFacultyComponent.prototype.getFacultyFromService = function () {
        var _this = this;
        this.listfacultyService.getfaculty().subscribe(function (value) {
            if (value['code'] === 200) {
                _this.faculty = value['data'];
                // console.log(this.faculty);
            }
            else {
                alert(value['code']);
            }
        }, function (error) { return console.log(error); });
    };
    AddFacultyComponent.prototype.ngOnInit = function () {
    };
    AddFacultyComponent.prototype.addFaculty = function (form) {
        var _this = this;
        this.listfacultyService.addfaculty(form)
            .subscribe(function (res) {
            _this.router.navigate(['/typography']);
        }, function (err) {
            console.log(err);
        });
    };
    AddFacultyComponent = __decorate([
        core_1.Component({
            selector: 'app-add-faculty',
            templateUrl: './add-faculty.component.html',
            styleUrls: ['./add-faculty.component.scss']
        }),
        __metadata("design:paramtypes", [listfaculty_service_1.ListfacultyService,
            router_1.Router])
    ], AddFacultyComponent);
    return AddFacultyComponent;
}());
exports.AddFacultyComponent = AddFacultyComponent;
//# sourceMappingURL=add-faculty.component.js.map