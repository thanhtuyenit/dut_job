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
var http_1 = require("@angular/common/http");
var UploadCvComponent = /** @class */ (function () {
    function UploadCvComponent(http) {
        this.http = http;
    }
    UploadCvComponent.prototype.upload = function (files) {
        var _this = this;
        if (files.length === 0)
            return;
        var formData = new FormData();
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            formData.append(file.name, file);
        }
        var uploadReq = new http_1.HttpRequest('POST', "https://localhost:44371/api/upload", formData, {
            reportProgress: true,
        });
        this.http.request(uploadReq).subscribe(function (event) {
            if (event.type === http_1.HttpEventType.UploadProgress)
                _this.progress = Math.round(100 * event.loaded / event.total);
            else if (event.type === http_1.HttpEventType.Response)
                _this.message = event.body.toString();
        });
    };
    UploadCvComponent = __decorate([
        core_1.Component({
            selector: 'app-upload-cv',
            templateUrl: './upload-cv.component.html',
            styleUrls: ['./upload-cv.component.scss']
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], UploadCvComponent);
    return UploadCvComponent;
}());
exports.UploadCvComponent = UploadCvComponent;
//# sourceMappingURL=upload-cv.component.js.map