"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var job_service_1 = require("./job.service");
describe('JobService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [job_service_1.JobService]
        });
    });
    it('should be created', testing_1.inject([job_service_1.JobService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=job.service.spec.js.map