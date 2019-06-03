import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { FormerStudentListComponent } from './former-students/former-student-list/former-student-list.component';
import { InternshipListComponent } from './internships/internship-list/internship-list.component';
import { AccommodationListComponent } from './accommodations/accommodation-list/accommodation-list.component';
import { HomeCardsComponent } from './home-cards/home-cards.component';
import { AgencyListComponent } from './agencies/agency-list/agency-list.component';
import { InternshipFormComponent } from './internships/internship-form/internship-form.component';
import { CountryUniversitiesComponent } from './universities/country-universities/country-universities.component';
import { WaiterComponent } from './waiter/waiter.component';


const routes: Routes = [
  {path: 'stages', component: InternshipListComponent},
  {path: 'stages/form', component: InternshipFormComponent},
  {path: 'logements', component: AccommodationListComponent},
  {path: 'agences-immobilieres', component: AgencyListComponent},
  {path: 'anciens-eleves', component: FormerStudentListComponent},
  {path: 'universites', component: CountryUniversitiesComponent},
  {path: 'accueil', component: HomeCardsComponent},
  {path: 'waiter', component: WaiterComponent},
  {path: '', redirectTo: '/accueil', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
