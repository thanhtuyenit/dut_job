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
var keyskills_service_1 = require("app/services/keyskills.service");
var router_1 = require("@angular/router");
var IconsComponent = /** @class */ (function () {
    // Create a interface of Service
    function IconsComponent(KeyskillService, router) {
        this.KeyskillService = KeyskillService;
        this.router = router;
        // Create a interface of model
        this.keyskillList = [];
    }
    // Create a function to get data from service to component
    IconsComponent.prototype.getKeyskillFromService = function () {
        var _this = this;
        // Get data from function which get data (API URL) in service and convert
        this.KeyskillService.getKeyskills().subscribe(function (value) {
            // if code api true
            if (value['code'] === 200) {
                // fetch data to interface of model
                _this.keyskillList = value['data'];
                // console.log(this.keyskillList);
            }
            else {
                alert(value['code']);
            }
        }, function (error) { return console.log(error); });
    };
    // delete key skill
    IconsComponent.prototype.deleteKeyskill = function (id) {
        var _this = this;
        if (confirm('Are you sure to delete this record?')) {
            this.KeyskillService.deleteKeyskills(id)
                .subscribe(function (res) {
                _this.getKeyskillFromService();
            }, function (err) {
                console.log(err);
            });
        }
    };
    IconsComponent.prototype.AddKeyskills = function () {
        this.router.navigate(['/add-Faculty']);
    };
    IconsComponent.prototype.ngOnInit = function () {
        this.getKeyskillFromService();
    };
    IconsComponent = __decorate([
        core_1.Component({
            selector: 'app-icons',
            templateUrl: './icons.component.html',
            styleUrls: ['./icons.component.css']
        }),
        __metadata("design:paramtypes", [keyskills_service_1.KeyskillsService, router_1.Router])
    ], IconsComponent);
    return IconsComponent;
}());
exports.IconsComponent = IconsComponent;
//# sourceMappingURL=icons.component.js.map