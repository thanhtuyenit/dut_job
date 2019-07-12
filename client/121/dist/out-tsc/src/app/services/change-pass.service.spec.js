"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var change_pass_service_1 = require("./change-pass.service");
describe('ChangePassService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [change_pass_service_1.ChangePassService]
        });
    });
    it('should be created', testing_1.inject([change_pass_service_1.ChangePassService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=change-pass.service.spec.js.map