"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/platform-browser/animations");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var forms_2 = require("@angular/forms");
var app_routing_1 = require("./app.routing");
var components_module_1 = require("./components/components.module");
var listfaculty_service_1 = require("./services/listfaculty.service");
var authentication_service_1 = require("./services/authentication.service");
var app_component_1 = require("./app.component");
var ngx_pagination_1 = require("ngx-pagination"); // <-- import the module
var core_2 = require("@agm/core");
var jwt_interceptor_1 = require("../app/_helpers/jwt.interceptor");
var admin_layout_component_1 = require("./layouts/admin-layout/admin-layout.component");
var keyskills_service_1 = require("./services/keyskills.service");
var alertmessage_service_1 = require("./services/alertmessage.service");
var edit_company_component_1 = require("./edit-company/edit-company.component");
var add_company_component_1 = require("./add-company/add-company.component");
var http_2 = require("@angular/common/http");
var checkbox_1 = require("@angular/material/checkbox");
var filter_pipe_1 = require("./filter.pipe");
// import { PdfViewerModule } from 'ng2-pdf-viewer';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                // NgbModule.forRoot(),
                animations_1.BrowserAnimationsModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                ngx_pagination_1.NgxPaginationModule,
                components_module_1.ComponentsModule,
                router_1.RouterModule,
                forms_2.ReactiveFormsModule,
                app_routing_1.AppRoutingModule,
                checkbox_1.MatCheckboxModule,
                core_2.AgmCoreModule.forRoot({
                    apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
                }),
            ],
            declarations: [
                app_component_1.AppComponent,
                admin_layout_component_1.AdminLayoutComponent,
                edit_company_component_1.EditCompanyComponent,
                add_company_component_1.AddCompanyComponent,
                filter_pipe_1.FilterPipe,
            ],
            providers: [
                listfaculty_service_1.ListfacultyService,
                keyskills_service_1.KeyskillsService,
                authentication_service_1.AuthenticationService,
                alertmessage_service_1.AlertmessageService,
                { provide: http_2.HTTP_INTERCEPTORS, useClass: jwt_interceptor_1.JwtInterceptor, multi: true },
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map