"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var listfaculty_service_1 = require("./listfaculty.service");
describe('ListfacultyService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [listfaculty_service_1.ListfacultyService]
        });
    });
    it('should be created', testing_1.inject([listfaculty_service_1.ListfacultyService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=listfaculty.service.spec.js.map