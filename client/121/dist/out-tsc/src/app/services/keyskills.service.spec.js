"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var keyskills_service_1 = require("./keyskills.service");
describe('KeyskillsService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [keyskills_service_1.KeyskillsService]
        });
    });
    it('should be created', testing_1.inject([keyskills_service_1.KeyskillsService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=keyskills.service.spec.js.map