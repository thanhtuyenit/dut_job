"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var alertmessage_service_1 = require("./alertmessage.service");
describe('AlertmessageService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [alertmessage_service_1.AlertmessageService]
        });
    });
    it('should be created', testing_1.inject([alertmessage_service_1.AlertmessageService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=alertmessage.service.spec.js.map