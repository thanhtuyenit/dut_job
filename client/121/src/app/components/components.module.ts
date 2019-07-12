import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarUserComponent } from './navbar-user/navbar-user.component';
import { FooterUserComponent } from './footer-user/footer-user.component';
import { FacultyComponent } from './faculty/faculty.component';
import { CompanyComponent } from './company/company.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MustMatchDirective } from './directive/pw-must-match.directive';
import { HttpModule } from '@angular/http';
import { ListfacultyService } from 'app/services/listfaculty.service';
import { HttpClientModule } from '@angular/common/http';
import { KeyskillsService } from 'app/services/keyskills.service';
import { AddFacultyComponent } from './add-faculty/add-faculty.component';
import { AddKeyskillsComponent } from './add-keyskills/add-keyskills.component';
import { NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { EditKeyskillsComponent } from '../edit-keyskills/edit-keyskills.component';
import { EditFacultyComponent } from '../edit-faculty/edit-faculty.component';
import { AuthenticationService } from 'app/services/authentication.service';
import { AlertmessageService } from 'app/services/alertmessage.service';
import { ProfileAdminComponent } from './profile-admin/profile-admin.component';
import { ChangepwAdminComponent } from './changepw-admin/changepw-admin.component';
import { CompanylistComponent } from './companylist/companylist.component';
import { ManageCompanyProfileComponent } from 'app/manage-company-profile/manage-company-profile.component';
import { PostCompanyJobComponent } from 'app/post-company-job/post-company-job.component';
import { ProfileUserComponent } from 'app/profile-user/profile-user.component';
import { ChangepwUserComponent } from 'app/changepw-user/changepw-user.component';

import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { JobListAdminComponent } from './job/job-list-admin/job-list-admin.component';
import { CompanyjobDetailComponent } from 'app/companyjob-detail/companyjob-detail.component';
import { MatCheckboxModule, MatAutocompleteModule,  MatFormFieldModule, MatFormFieldControl, MatInputModule } from '@angular/material';
import { SearchesComponent } from './searches/searches.component';
import { CompanyAllJobsComponent } from 'app/company-all-jobs/company-all-jobs.component';
import { UploadCvComponent } from './upload-cv/upload-cv.component';
import { ViewCvComponent } from './view-cv/view-cv.component';
import { AboutusComponent } from 'app/aboutus/aboutus.component';
import { RecentJobsComponent } from 'app/recent-jobs/recent-jobs.component';
import { ApplyNewJobComponent } from './apply-new-job/apply-new-job.component';
import { ResultSearchjobBynameComponent } from 'app/result-searchjob-byname/result-searchjob-byname.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
   MatCheckboxModule,
   MatAutocompleteModule,
   MatFormFieldModule,
   MatInputModule,
    NgbModule.forRoot(),

  ],

  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    NavbarUserComponent,
    FooterUserComponent,
    FacultyComponent,
    CompanyComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    MustMatchDirective,
    AddFacultyComponent,
    AddKeyskillsComponent,
    EditFacultyComponent,
    EditKeyskillsComponent,
    ProfileAdminComponent,
    ChangepwAdminComponent,
    CompanylistComponent,
    ManageCompanyProfileComponent,
    PostCompanyJobComponent,
    ProfileUserComponent,
    ChangepwUserComponent,
    JobListAdminComponent,
    CompanyjobDetailComponent,
    SearchesComponent,
    CompanyAllJobsComponent,
    UploadCvComponent,
    ViewCvComponent,
    AboutusComponent,
    RecentJobsComponent,
    ApplyNewJobComponent,
    ResultSearchjobBynameComponent,
  ],

  providers: [
    ListfacultyService,
    KeyskillsService,
    AuthenticationService,
    AlertmessageService
  ],

  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
  ]
})
export class ComponentsModule { }
