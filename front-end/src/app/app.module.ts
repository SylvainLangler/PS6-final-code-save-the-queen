import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { Ng5SliderModule } from 'ng5-slider';
import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { InternshipService } from '../services/internship/internship.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeCardsComponent } from './home-cards/home-cards.component';
import { InternshipComponent } from './internships/internship/internship.component';
import { InternshipListComponent } from './internships/internship-list/internship-list.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FooterComponent } from './footer/footer.component';
import { InternshipModalContentComponent } from './internships/internship-modal-content/internship-modal-content.component';
import { InternshipFormComponent } from './internships/internship-form/internship-form.component';
import { FormerStudentComponent } from './former-students/former-student/former-student.component';
import { FormerStudentListComponent } from './former-students/former-student-list/former-student-list.component';
import { FormerStudentService } from 'src/services/former-student/former-student.service';
import { AgencyComponent } from './agencies/agency/agency.component';
import { AgencyListComponent } from './agencies/agency-list/agency-list.component';
import { InternshipFilterFormComponent } from './internships/internship-filter-form/internship-filter-form.component';
import { FormerStudentFilterFormComponent } from './former-students/former-student-filter-form/former-student-filter-form.component';
import { CountryFilterComponent } from './universities/country-filter/country-filter.component';
import { CountryUniversitiesComponent } from './universities/country-universities/country-universities.component';
import { HomeLeftColumnComponent } from './home-left-column/home-left-column.component';
import { AgencyFilterFormComponent } from './agencies/agency-filter-form/agency-filter-form.component';
import { AccommodationComponent } from './accommodations/accommodation/accommodation.component';
import { AccommodationListComponent } from './accommodations/accommodation-list/accommodation-list.component';
import { AccommodationFilterFormComponent } from './accommodations/accommodation-filter-form/accommodation-filter-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeCardsComponent,
    FormerStudentComponent,
    FormerStudentListComponent,
    InternshipComponent,
    InternshipFormComponent,
    InternshipListComponent,
    PaginationComponent,
    FooterComponent,
    InternshipModalContentComponent,
    AgencyComponent,
    AgencyListComponent,
    InternshipFilterFormComponent,
    FormerStudentFilterFormComponent,
    CountryFilterComponent,
    CountryUniversitiesComponent,
    HomeLeftColumnComponent,
    AgencyFilterFormComponent,
    AccommodationComponent,
    AccommodationListComponent,
    AccommodationFilterFormComponent,
  ],
  entryComponents: [
    InternshipModalContentComponent
  ],
  imports: [
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    Ng5SliderModule,
    ChartsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule // Import all dependencies
  ],
  providers: [InternshipService, FormerStudentService], // All the services need to be provided
  bootstrap: [AppComponent]
})
export class AppModule {}
