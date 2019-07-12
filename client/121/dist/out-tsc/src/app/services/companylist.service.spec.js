"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var companylist_service_1 = require("./companylist.service");
describe('CompanylistService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [companylist_service_1.CompanylistService]
        });
    });
    it('should be created', testing_1.inject([companylist_service_1.CompanylistService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=companylist.service.spec.js.map