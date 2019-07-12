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
var AddKeyskillsComponent = /** @class */ (function () {
    // Create a interface of Service
    function AddKeyskillsComponent(KeyskillService, router) {
        this.KeyskillService = KeyskillService;
        this.router = router;
        // Create a interface of model
        this.keyskill = [];
    }
    // Create a function to get data from service to component
    AddKeyskillsComponent.prototype.getKeyskillFromService = function () {
        var _this = this;
        // Get data from function which get data (API URL) in service and convert
        this.KeyskillService.getKeyskills().subscribe(function (value) {
            // if code api true
            if (value['code'] === 200) {
                // fetch data to interface of model
                _this.keyskill = value['data'];
                console.log(_this.keyskill);
            }
            else {
                alert(value['code']);
            }
        }, function (error) { return console.log(error); });
    };
    AddKeyskillsComponent.prototype.ngOnInit = function () {
    };
    AddKeyskillsComponent.prototype.addKeyskill = function (form) {
        var _this = this;
        this.KeyskillService.addKeyskills(form)
            .subscribe(function (res) {
            _this.router.navigate(['/icons']);
        }, function (err) {
            console.log(err);
        });
    };
    AddKeyskillsComponent = __decorate([
        core_1.Component({
            selector: 'app-add-keyskills',
            templateUrl: './add-keyskills.component.html',
            styleUrls: ['./add-keyskills.component.scss']
        }),
        __metadata("design:paramtypes", [keyskills_service_1.KeyskillsService, router_1.Router])
    ], AddKeyskillsComponent);
    return AddKeyskillsComponent;
}());
exports.AddKeyskillsComponent = AddKeyskillsComponent;
//# sourceMappingURL=add-keyskills.component.js.map