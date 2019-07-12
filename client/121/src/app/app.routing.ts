import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NavbarUserComponent } from './components/navbar-user/navbar-user.component';
import { CompanyComponent } from './components/company/company.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddFacultyComponent } from './components/add-faculty/add-faculty.component';
import { AddKeyskillsComponent } from './components/add-keyskills/add-keyskills.component';
import { EditFacultyComponent } from './edit-faculty/edit-faculty.component';
import { EditKeyskillsComponent } from './edit-keyskills/edit-keyskills.component';
import { ProfileAdminComponent } from './components/profile-admin/profile-admin.component';
import { AuthGuard } from './_guard/auth.guard';
import { ChangepwAdminComponent } from './components/changepw-admin/changepw-admin.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { CompanylistComponent } from './components/companylist/companylist.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { ManageCompanyProfileComponent } from './manage-company-profile/manage-company-profile.component';
import { PostCompanyJobComponent } from './post-company-job/post-company-job.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { ChangepwUserComponent } from './changepw-user/changepw-user.component';

import { JobListAdminComponent } from './components/job/job-list-admin/job-list-admin.component';

import { CompanyjobDetailComponent } from './companyjob-detail/companyjob-detail.component';
import { SearchesComponent } from './components/searches/searches.component';
import { CompanyAllJobsComponent } from './company-all-jobs/company-all-jobs.component';
import { UploadCvComponent } from './components/upload-cv/upload-cv.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ApplyNewJobComponent } from './components/apply-new-job/apply-new-job.component';
import { ResultSearchjobBynameComponent } from './result-searchjob-byname/result-searchjob-byname.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
   {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]},
  {
    path: 'index',
    component: NavbarUserComponent
  },
  {
    path: 'company/:id',
    component: CompanyComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
           path: 'add-Faculty',
           component: AddFacultyComponent,
           canActivate: [AuthGuard],
        },
        {
          path: 'add-Keyskills',
          component: AddKeyskillsComponent,
          canActivate: [AuthGuard],
       },
       {
        //  get path / para id
        path: 'edit-faculty/:id',
        component: EditFacultyComponent,
        canActivate: [AuthGuard],
     },
     {
      //  get path / para id
      path: 'edit-keyskills/:id',
      component: EditKeyskillsComponent,  canActivate: [AuthGuard],
   },
   {
    path: 'profile_admin',
    component: ProfileAdminComponent,  canActivate: [AuthGuard],
  },
  {
    path: 'changepass_admin',
    component: ChangepwAdminComponent,  canActivate: [AuthGuard],
  }, {
    path: 'edit-company/:id',
    component: EditCompanyComponent,  canActivate: [AuthGuard],
  }, {
    path: 'company/faculty/:id',
    component: CompanylistComponent
  }, {
    path: 'add-company',
    component: AddCompanyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'manage-company',
    component: ManageCompanyProfileComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'post-job',
    component: PostCompanyJobComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'aboutus',
    component: AboutusComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'profile-user',
    component: ProfileUserComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'changepass_user',
    component: ChangepwUserComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'companyjob-detail/:id',
    component: CompanyjobDetailComponent,
    // canActivate: [AuthGuard],
  },

  {
    path: 'admin/jobs',
    component: JobListAdminComponent,
   // canActivate: [AuthGuard],
  },

  {
    path: 'searches',
    component: SearchesComponent,
   // canActivate: [AuthGuard],
  }, {
    path: 'companymanagealljob',
    component:     CompanyAllJobsComponent,
   // canActivate: [AuthGuard],
  },
  {
    path: 'upload-cv',
    component: UploadCvComponent,
   // canActivate: [AuthGuard],
  },

  {
    path: 'apply-new-job/:id',
    component: ApplyNewJobComponent,
   // canActivate: [AuthGuard],
  },
  {
    path: 'searchjobbyname/:name',
    component: ResultSearchjobBynameComponent,
    // canActivate: [AuthGuard],
  },




  //   RouterModule.forRoot([
  //
  // //     {
  // //       path: 'students',
  // //       component: StudentsComponent
  // //    },
  // //    {
  // //     path: 'edit-student/:id',
  // //     component: EditStudentComponent
  // //   },
  // //   {
  // //     path: 'delete-student/:id',
  // //     component: EditStudentComponent
  // //  },
  //  ]),


    // { path: 'dashboard',      component: DashboardComponent },
    // { path: 'user-profile',   component: UserProfileComponent },
    // { path: 'table-list',     component: TableListComponent },
    // { path: 'typography',     component: TypographyComponent },
    // { path: 'icons',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent },
    // { path: 'notifications',  component: NotificationsComponent },
    // { path: 'upgrade',        component: UpgradeComponent },
    // { path: '',               redirectTo: 'dashboard', pathMatch: 'full' }
];

 @NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})
  ],
  exports: [
  ],
})
export  class AppRoutingModule { }
// export  const routing = RouterModule.forRoot(routes);
