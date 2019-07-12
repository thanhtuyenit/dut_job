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
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var admin_layout_component_1 = require("./layouts/admin-layout/admin-layout.component");
var navbar_user_component_1 = require("./components/navbar-user/navbar-user.component");
var company_component_1 = require("./components/company/company.component");
var login_component_1 = require("./components/login/login.component");
var register_component_1 = require("./components/register/register.component");
var add_faculty_component_1 = require("./components/add-faculty/add-faculty.component");
var add_keyskills_component_1 = require("./components/add-keyskills/add-keyskills.component");
var edit_faculty_component_1 = require("./edit-faculty/edit-faculty.component");
var edit_keyskills_component_1 = require("./edit-keyskills/edit-keyskills.component");
var profile_admin_component_1 = require("./components/profile-admin/profile-admin.component");
var auth_guard_1 = require("./_guard/auth.guard");
var changepw_admin_component_1 = require("./components/changepw-admin/changepw-admin.component");
var edit_company_component_1 = require("./edit-company/edit-company.component");
var companylist_component_1 = require("./components/companylist/companylist.component");
var add_company_component_1 = require("./add-company/add-company.component");
var manage_company_profile_component_1 = require("./manage-company-profile/manage-company-profile.component");
var post_company_job_component_1 = require("./post-company-job/post-company-job.component");
var profile_user_component_1 = require("./profile-user/profile-user.component");
var changepw_user_component_1 = require("./changepw-user/changepw-user.component");
var job_list_admin_component_1 = require("./components/job/job-list-admin/job-list-admin.component");
var companyjob_detail_component_1 = require("./companyjob-detail/companyjob-detail.component");
var searches_component_1 = require("./components/searches/searches.component");
var company_all_jobs_component_1 = require("./company-all-jobs/company-all-jobs.component");
var upload_cv_component_1 = require("./components/upload-cv/upload-cv.component");
var aboutus_component_1 = require("./aboutus/aboutus.component");
var routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
        canActivate: [auth_guard_1.AuthGuard],
    },
    {
        path: '',
        component: admin_layout_component_1.AdminLayoutComponent,
        canActivate: [auth_guard_1.AuthGuard],
        children: [
            {
                path: '',
                loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
            }
        ]
    },
    {
        path: 'index',
        component: navbar_user_component_1.NavbarUserComponent
    },
    {
        path: 'company/:id',
        component: company_component_1.CompanyComponent
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'register',
        component: register_component_1.RegisterComponent
    },
    {
        path: 'add-Faculty',
        component: add_faculty_component_1.AddFacultyComponent,
        canActivate: [auth_guard_1.AuthGuard],
    },
    {
        path: 'add-Keyskills',
        component: add_keyskills_component_1.AddKeyskillsComponent,
        canActivate: [auth_guard_1.AuthGuard],
    },
    {
        //  get path / para id
        path: 'edit-faculty/:id',
        component: edit_faculty_component_1.EditFacultyComponent,
        canActivate: [auth_guard_1.AuthGuard],
    },
    {
        //  get path / para id
        path: 'edit-keyskills/:id',
        component: edit_keyskills_component_1.EditKeyskillsComponent, canActivate: [auth_guard_1.AuthGuard],
    },
    {
        path: 'profile_admin',
        component: profile_admin_component_1.ProfileAdminComponent, canActivate: [auth_guard_1.AuthGuard],
    },
    {
        path: 'changepass_admin',
        component: changepw_admin_component_1.ChangepwAdminComponent, canActivate: [auth_guard_1.AuthGuard],
    }, {
        path: 'edit-company/:id',
        component: edit_company_component_1.EditCompanyComponent, canActivate: [auth_guard_1.AuthGuard],
    }, {
        path: 'company/faculty/:id',
        component: companylist_component_1.CompanylistComponent
    }, {
        path: 'add-company',
        component: add_company_component_1.AddCompanyComponent,
        canActivate: [auth_guard_1.AuthGuard],
    },
    {
        path: 'manage-company',
        component: manage_company_profile_component_1.ManageCompanyProfileComponent,
    },
    {
        path: 'post-job',
        component: post_company_job_component_1.PostCompanyJobComponent,
    },
    {
        path: 'aboutus',
        component: aboutus_component_1.AboutusComponent,
    },
    {
        path: 'profile-user',
        component: profile_user_component_1.ProfileUserComponent,
    },
    {
        path: 'changepass_user',
        component: changepw_user_component_1.ChangepwUserComponent,
    },
    {
        path: 'companyjob-detail/:id',
        component: companyjob_detail_component_1.CompanyjobDetailComponent,
    },
    {
        path: 'admin/jobs',
        component: job_list_admin_component_1.JobListAdminComponent,
    },
    {
        path: 'searches',
        component: searches_component_1.SearchesComponent,
    }, {
        path: 'companymanagealljob',
        component: company_all_jobs_component_1.CompanyAllJobsComponent,
    },
    {
        path: 'upload-cv',
        component: upload_cv_component_1.UploadCvComponent,
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                platform_browser_1.BrowserModule,
                router_1.RouterModule.forRoot(routes)
            ],
            exports: [],
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
// export  const routing = RouterModule.forRoot(routes);
//# sourceMappingURL=app.routing.js.map