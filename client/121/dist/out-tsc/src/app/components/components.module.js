"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var footer_component_1 = require("./footer/footer.component");
var navbar_component_1 = require("./navbar/navbar.component");
var sidebar_component_1 = require("./sidebar/sidebar.component");
var navbar_user_component_1 = require("./navbar-user/navbar-user.component");
var footer_user_component_1 = require("./footer-user/footer-user.component");
var faculty_component_1 = require("./faculty/faculty.component");
var company_component_1 = require("./company/company.component");
var login_component_1 = require("./login/login.component");
var register_component_1 = require("./register/register.component");
var header_component_1 = require("./header/header.component");
var forms_1 = require("@angular/forms");
var pw_must_match_directive_1 = require("./directive/pw-must-match.directive");
var http_1 = require("@angular/http");
var listfaculty_service_1 = require("app/services/listfaculty.service");
var http_2 = require("@angular/common/http");
var keyskills_service_1 = require("app/services/keyskills.service");
var add_faculty_component_1 = require("./add-faculty/add-faculty.component");
var add_keyskills_component_1 = require("./add-keyskills/add-keyskills.component");
var ngx_pagination_1 = require("ngx-pagination"); // <-- import the module
var edit_keyskills_component_1 = require("../edit-keyskills/edit-keyskills.component");
var edit_faculty_component_1 = require("../edit-faculty/edit-faculty.component");
var authentication_service_1 = require("app/services/authentication.service");
var alertmessage_service_1 = require("app/services/alertmessage.service");
var profile_admin_component_1 = require("./profile-admin/profile-admin.component");
var changepw_admin_component_1 = require("./changepw-admin/changepw-admin.component");
var companylist_component_1 = require("./companylist/companylist.component");
var manage_company_profile_component_1 = require("app/manage-company-profile/manage-company-profile.component");
var post_company_job_component_1 = require("app/post-company-job/post-company-job.component");
var profile_user_component_1 = require("app/profile-user/profile-user.component");
var changepw_user_component_1 = require("app/changepw-user/changepw-user.component");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var job_list_admin_component_1 = require("./job/job-list-admin/job-list-admin.component");
var companyjob_detail_component_1 = require("app/companyjob-detail/companyjob-detail.component");
var material_1 = require("@angular/material");
var searches_component_1 = require("./searches/searches.component");
var company_all_jobs_component_1 = require("app/company-all-jobs/company-all-jobs.component");
var upload_cv_component_1 = require("./upload-cv/upload-cv.component");
var view_cv_component_1 = require("./view-cv/view-cv.component");
var aboutus_component_1 = require("app/aboutus/aboutus.component");
var recent_jobs_component_1 = require("app/recent-jobs/recent-jobs.component");
var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                http_2.HttpClientModule,
                forms_1.ReactiveFormsModule,
                ngx_pagination_1.NgxPaginationModule,
                material_1.MatCheckboxModule,
                material_1.MatAutocompleteModule,
                material_1.MatFormFieldModule,
                material_1.MatInputModule,
                ng_bootstrap_1.NgbModule.forRoot(),
            ],
            declarations: [
                footer_component_1.FooterComponent,
                navbar_component_1.NavbarComponent,
                sidebar_component_1.SidebarComponent,
                navbar_user_component_1.NavbarUserComponent,
                footer_user_component_1.FooterUserComponent,
                faculty_component_1.FacultyComponent,
                company_component_1.CompanyComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                header_component_1.HeaderComponent,
                pw_must_match_directive_1.MustMatchDirective,
                add_faculty_component_1.AddFacultyComponent,
                add_keyskills_component_1.AddKeyskillsComponent,
                edit_faculty_component_1.EditFacultyComponent,
                edit_keyskills_component_1.EditKeyskillsComponent,
                profile_admin_component_1.ProfileAdminComponent,
                changepw_admin_component_1.ChangepwAdminComponent,
                companylist_component_1.CompanylistComponent,
                manage_company_profile_component_1.ManageCompanyProfileComponent,
                post_company_job_component_1.PostCompanyJobComponent,
                profile_user_component_1.ProfileUserComponent,
                changepw_user_component_1.ChangepwUserComponent,
                job_list_admin_component_1.JobListAdminComponent,
                companyjob_detail_component_1.CompanyjobDetailComponent,
                searches_component_1.SearchesComponent,
                company_all_jobs_component_1.CompanyAllJobsComponent,
                upload_cv_component_1.UploadCvComponent,
                view_cv_component_1.ViewCvComponent,
                aboutus_component_1.AboutusComponent,
                recent_jobs_component_1.RecentJobsComponent
            ],
            providers: [
                listfaculty_service_1.ListfacultyService,
                keyskills_service_1.KeyskillsService,
                authentication_service_1.AuthenticationService,
                alertmessage_service_1.AlertmessageService
            ],
            exports: [
                footer_component_1.FooterComponent,
                navbar_component_1.NavbarComponent,
                sidebar_component_1.SidebarComponent,
            ]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());
exports.ComponentsModule = ComponentsModule;
//# sourceMappingURL=components.module.js.map