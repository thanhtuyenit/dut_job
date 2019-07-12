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
var faculty_1 = require("app/model/faculty");
var listfaculty_service_1 = require("app/services/listfaculty.service");
var router_1 = require("@angular/router");
var EditFacultyComponent = /** @class */ (function () {
    function EditFacultyComponent(listfacultyService, router, 
    // get active route
    activatedRoute) {
        this.listfacultyService = listfacultyService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.faculty = new faculty_1.Faculty();
    }
    // get faculty id
    EditFacultyComponent.prototype.getFaculty = function (id) {
        var _this = this;
        this.listfacultyService.getfacultyByID(id).subscribe(function (value) {
            if (value['code'] === 200) {
                _this.faculty = value['data'];
                console.log(_this.faculty);
            }
            else {
                alert(value['error']);
            }
        }, function (error) { return console.log(error); });
    };
    EditFacultyComponent.prototype.editFaculty = function () {
        var _this = this;
        this.listfacultyService.updatefaculty(this.faculty)
            .subscribe(function (res) {
            _this.router.navigate(['/typography']);
        }, function (err) {
            console.log(err);
        });
    };
    EditFacultyComponent.prototype.ngOnInit = function () {
        this.getFaculty(this.activatedRoute.snapshot.params['id']);
    };
    EditFacultyComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-faculty',
            templateUrl: './edit-faculty.component.html',
            styleUrls: ['./edit-faculty.component.scss']
        }),
        __metadata("design:paramtypes", [listfaculty_service_1.ListfacultyService,
            router_1.Router,
            router_1.ActivatedRoute])
    ], EditFacultyComponent);
    return EditFacultyComponent;
}());
exports.EditFacultyComponent = EditFacultyComponent;
//# sourceMappingURL=edit-faculty.component.js.map