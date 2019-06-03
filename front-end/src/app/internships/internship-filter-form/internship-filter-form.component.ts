import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Filter } from 'src/services/base.service';
import { Options } from 'ng5-slider';
import { Router } from '@angular/router';
import { InternshipService } from 'src/services/internship/internship.service';

@Component({
  selector: 'app-internship-filter-form',
  templateUrl: './internship-filter-form.component.html',
  styleUrls: ['./internship-filter-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InternshipFilterFormComponent implements OnInit {

  private availableFilters: Filter[] = [];

  public isAnyFilterActive: boolean = false;

  public availableCountryNames: string[] = [];
  public availableSectionNames: string[] = [];

  public filterForm: FormGroup;
  
  public minValue: number;
  public maxValue: number;
  public options: Options;

  // tslint:disable-next-line:max-line-length
  constructor(public formBuilder: FormBuilder , private router: Router, public internshipService: InternshipService) {
    this.minValue = 1;
    this.maxValue = 16;
    this.options = {floor:1, ceil: this.maxValue};

    this.availableFilters.push(new Filter("title", "Titre"));
    this.availableFilters.push(new Filter("company", "Entreprise"));
    this.availableFilters.push(new Filter("section", "Section"));
    this.availableFilters.push(new Filter("country", "Pays"));
    this.availableFilters.push(new Filter("schoolYear", "Année"));
    this.availableFilters.push(new Filter("duration", "Durée"));
    this.availableFilters.push(new Filter("lab", "Laboratoire"));

    

    if(this.internshipService.hasLoadedInternshipsPage){
      this.availableFilters = this.internshipService.dumpedFilters;
      this.isAnyFilterActive = this.internshipService.isFilterApplied;
      this.filterForm = this.internshipService.filterForm;
    } else {
      let formInternshipData = {};
      this.availableFilters.forEach((filter) => {
        formInternshipData[filter.name] = [''];
      });
      formInternshipData['lab'] = [false];
      this.filterForm = this.formBuilder.group(formInternshipData);
      this.internshipService.filterForm = this.filterForm;
    }
  }

  ngOnInit() {
      // Getting all countries that are in atleast 1 internship
      this.internshipService
        .getAvailableCountries()
        .then(res => {
          this.availableCountryNames = res;
        })
        .catch(error => console.log(error));

      // Getting all sections that are in atleast 1 internship
      this.internshipService
        .getAvailableSections()
        .then(res => {
          this.availableSectionNames = res;
        })
        .catch(error => console.log(error));

      this.internshipService
        .getMaxDuration()
        .then(res => {
          this.maxValue = res;
          this.options = {floor:1, ceil: this.maxValue};
        })
        .catch(error => console.log(error));
  }

  ngOnDestroy(){
    this.internshipService.hasLoadedInternshipsPage = true;
    this.internshipService.isFilterApplied = this.isAnyFilterActive;
    this.internshipService.dumpedFilters = this.availableFilters;
    this.internshipService.filterForm = this.filterForm;
  }

  cancelFilter(filterName: string){
    this.filterForm.controls[filterName].setValue('');
    this.filter();
  }

  sortAlpha() {
    this.internshipService.sortAlpha();
  }

  filter() {
    this.isAnyFilterActive = false;
    this.availableFilters.forEach((filter) => {
      filter.value = this.filterForm.controls[filter.name].value;
      if (filter.value) { 
        this.isAnyFilterActive = true;
      }
    });
    this.internshipService.getInternships();
    this.internshipService.isFilterApplied = this.isAnyFilterActive;
  }

  keyPressed(event){
    if(event.keyCode == 13){
      this.filter();
    }
  }


}
