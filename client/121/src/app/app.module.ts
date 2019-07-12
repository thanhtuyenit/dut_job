import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule} from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ListfacultyService} from './services/listfaculty.service';
import { AuthenticationService} from './services/authentication.service';
import { AppComponent } from './app.component';
import { NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { AgmCoreModule} from '@agm/core';
import { JwtInterceptor,  } from '../app/_helpers/jwt.interceptor';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { KeyskillsService } from './services/keyskills.service';
import { AlertmessageService } from './services/alertmessage.service';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FilterPipe } from './filter.pipe';

// import { PdfViewerModule } from 'ng2-pdf-viewer';









@NgModule({
  imports: [
    // NgbModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    NgxPaginationModule, //  add here
    ComponentsModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatCheckboxModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
    // PdfViewerModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    EditCompanyComponent,
    AddCompanyComponent,
    FilterPipe,





  ],

  providers: [
    ListfacultyService,
    KeyskillsService,
    AuthenticationService,
    AlertmessageService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
