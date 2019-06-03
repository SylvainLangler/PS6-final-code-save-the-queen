import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Filter } from 'src/services/base.service';
import { Router } from '@angular/router';
import { AgencyService } from 'src/services/agency/agency.service';

@Component({
  selector: 'app-agency-filter-form',
  templateUrl: './agency-filter-form.component.html',
  styleUrls: ['./agency-filter-form.component.css']
})
export class AgencyFilterFormComponent implements OnInit {

  private availableFilters: Filter[] = [];

  public isAnyFilterActive: boolean = false;

  public availableCountryNames: string[] = [];

  public filterForm: FormGroup;

  // tslint:disable-next-line:max-line-length
  constructor(public formBuilder: FormBuilder , private router: Router, public agencyService: AgencyService) {
    
    this.availableFilters.push(new Filter("name", "Nom"));
    this.availableFilters.push(new Filter("country", "Pays"));

    if(this.agencyService.hasLoadedAgenciesPage){
      this.availableFilters = this.agencyService.dumpedFilters;
      this.isAnyFilterActive = this.agencyService.isFilterApplied;
      this.filterForm = this.agencyService.filterForm;
    } else {
      let formData = {};
      this.availableFilters.forEach((filter) => {
        formData[filter.name] = [''];
      });
      
      this.filterForm = this.formBuilder.group(formData);
      this.agencyService.filterForm = this.filterForm;
    }

  }

  ngOnInit() {
      
      // Getting all countries that are in atleast 1 student
      this.agencyService
        .getAvailableCountries()
        .then(res => {
          this.availableCountryNames = res;
        })
        .catch(error => console.log(error));
  }

  ngOnDestroy(){
    this.agencyService.hasLoadedAgenciesPage = true;
    this.agencyService.isFilterApplied = this.isAnyFilterActive;
    this.agencyService.dumpedFilters = this.availableFilters;
    this.agencyService.filterForm = this.filterForm;
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
    this.agencyService.getAgencies();
    this.agencyService.isFilterApplied = this.isAnyFilterActive;
  }

  keyPressed(event){
    if(event.keyCode == 13){
      this.filter();
    }
  }

}
