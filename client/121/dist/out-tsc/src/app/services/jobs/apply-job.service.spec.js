"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var apply_job_service_1 = require("./apply-job.service");
describe('ApplyJobService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [apply_job_service_1.ApplyJobService]
        });
    });
    it('should be created', testing_1.inject([apply_job_service_1.ApplyJobService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=apply-job.service.spec.js.map