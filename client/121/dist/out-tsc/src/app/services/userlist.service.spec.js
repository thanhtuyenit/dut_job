"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var userlist_service_1 = require("./userlist.service");
describe('UserlistService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [userlist_service_1.UserlistService]
        });
    });
    it('should be created', testing_1.inject([userlist_service_1.UserlistService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=userlist.service.spec.js.map