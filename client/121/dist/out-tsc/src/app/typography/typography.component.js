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
var TypographyComponent = /** @class */ (function () {
    //  p: Number = 1;
    function TypographyComponent(listfacultyService, router) {
        this.listfacultyService = listfacultyService;
        this.router = router;
        this.faculty = [];
    }
    TypographyComponent.prototype.getFacultyFromService = function () {
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
    TypographyComponent.prototype.deleteFaculty = function (id) {
        var _this = this;
        if (confirm('Are you sure to delete this record?')) {
            this.listfacultyService.deletefaculty(id)
                .subscribe(function (res) {
                _this.getFacultyFromService();
            }, function (err) {
                console.log(err);
            });
        }
    };
    // addFaculty(form: NgForm) {
    //   this.listfacultyService.addfaculty(form)
    //     .subscribe(res => {
    //         this.router.navigate(['/typography']);
    //       }, (err) => {
    //         console.log(err);
    //       });
    // }
    TypographyComponent.prototype.AddFaculty = function () {
        this.router.navigate(['/add-Faculty']);
    };
    TypographyComponent.prototype.ngOnInit = function () {
        this.getFacultyFromService();
    };
    TypographyComponent = __decorate([
        core_1.Component({
            selector: 'app-typography',
            templateUrl: './typography.component.html',
            styleUrls: ['./typography.component.css']
        }),
        __metadata("design:paramtypes", [listfaculty_service_1.ListfacultyService, router_1.Router])
    ], TypographyComponent);
    return TypographyComponent;
}());
exports.TypographyComponent = TypographyComponent;
//# sourceMappingURL=typography.component.js.map