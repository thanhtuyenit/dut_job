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
var keyskills_1 = require("app/model/keyskills");
var keyskills_service_1 = require("app/services/keyskills.service");
var router_1 = require("@angular/router");
var EditKeyskillsComponent = /** @class */ (function () {
    // Create a interface of Service
    function EditKeyskillsComponent(KeyskillService, router, 
    // get active route
    activatedRoute) {
        this.KeyskillService = KeyskillService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.keyskill = new keyskills_1.Keyskill();
    }
    // get faculty id
    EditKeyskillsComponent.prototype.getKeyskill = function (id) {
        var _this = this;
        this.KeyskillService.getKeyskillsByID(id).subscribe(function (value) {
            if (value['code'] === 200) {
                _this.keyskill = value['data'];
                console.log(_this.keyskill);
            }
            else {
                alert(value['error']);
            }
        }, function (error) { return console.log(error); });
    };
    EditKeyskillsComponent.prototype.editKeyskill = function () {
        var _this = this;
        this.KeyskillService.updateKeyskills(this.keyskill)
            .subscribe(function (res) {
            _this.router.navigate(['/icons']);
        }, function (err) {
            console.log(err);
        });
    };
    EditKeyskillsComponent.prototype.ngOnInit = function () {
        this.getKeyskill(this.activatedRoute.snapshot.params['id']);
    };
    EditKeyskillsComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-keyskills',
            templateUrl: './edit-keyskills.component.html',
            styleUrls: ['./edit-keyskills.component.scss']
        }),
        __metadata("design:paramtypes", [keyskills_service_1.KeyskillsService, router_1.Router,
            router_1.ActivatedRoute])
    ], EditKeyskillsComponent);
    return EditKeyskillsComponent;
}());
exports.EditKeyskillsComponent = EditKeyskillsComponent;
//# sourceMappingURL=edit-keyskills.component.js.map