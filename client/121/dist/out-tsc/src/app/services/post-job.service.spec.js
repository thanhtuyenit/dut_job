"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var post_job_service_1 = require("./post-job.service");
describe('PostJobService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [post_job_service_1.PostJobService]
        });
    });
    it('should be created', testing_1.inject([post_job_service_1.PostJobService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=post-job.service.spec.js.map