import { Component, OnInit } from '@angular/core';
import { Filter } from 'src/services/base.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FormerStudentService } from 'src/services/former-student/former-student.service';

@Component({
  selector: 'app-former-student-filter-form',
  templateUrl: './former-student-filter-form.component.html',
  styleUrls: ['./former-student-filter-form.component.css']
})
export class FormerStudentFilterFormComponent implements OnInit {

  private availableFilters: Filter[] = [];

  public isAnyFilterActive: boolean = false;

  public availableCountryNames: string[] = [];
  public availableSectionNames: string[] = [];

  public filterForm: FormGroup;

  // tslint:disable-next-line:max-line-length
  constructor(public formBuilder: FormBuilder , private router: Router, public formerStudentService: FormerStudentService) {
    
    this.availableFilters.push(new Filter("firstName", "Prénom"));
    this.availableFilters.push(new Filter("lastName", "Nom"));
    this.availableFilters.push(new Filter("yearAbroad", "Année à l'étranger"));
    this.availableFilters.push(new Filter("country", "Pays"));
    this.availableFilters.push(new Filter("section", "Section"));

    if(this.formerStudentService.hasLoadedFormerStudentsPage){
      this.availableFilters = this.formerStudentService.dumpedFilters;
      this.isAnyFilterActive = this.formerStudentService.isFilterApplied;
      this.filterForm = this.formerStudentService.filterForm;
    } else {
      let formFormerStudentData = {};
      this.availableFilters.forEach((filter) => {
        formFormerStudentData[filter.name] = [''];
      });
      
      this.filterForm = this.formBuilder.group(formFormerStudentData);
      this.formerStudentService.filterForm = this.filterForm;
    }

  }

  ngOnInit() {
      
      // Getting all countries that are in atleast 1 student
      this.formerStudentService
        .getAvailableCountries()
        .then(res => {
          this.availableCountryNames = res;
        })
        .catch(error => console.log(error));

      // Getting all sections that are in atleast 1 student
      this.formerStudentService
        .getAvailableSections()
        .then(res => {
          this.availableSectionNames = res;
        })
        .catch(error => console.log(error));
  }

  ngOnDestroy(){
    this.formerStudentService.hasLoadedFormerStudentsPage = true;
    this.formerStudentService.isFilterApplied = this.isAnyFilterActive;
    this.formerStudentService.dumpedFilters = this.availableFilters;
    this.formerStudentService.filterForm = this.filterForm;
  }

  cancelFilter(filterName: string){
    this.filterForm.controls[filterName].setValue('');
    this.filter();
  }

  filter(){
    this.isAnyFilterActive = false;
    this.availableFilters.forEach((filter) => {
      filter.value = this.filterForm.controls[filter.name].value;
      if(filter.value){
        this.isAnyFilterActive = true;
      }
    });
    this.formerStudentService.getFormerStudents();
    this.formerStudentService.isFilterApplied = this.isAnyFilterActive;
  }

  keyPressed(event){
    if(event.keyCode == 13){
      this.filter();
    }
  }
}
