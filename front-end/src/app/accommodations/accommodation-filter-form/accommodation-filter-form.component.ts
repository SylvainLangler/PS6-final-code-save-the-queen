import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Filter } from 'src/services/base.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Options } from 'ng5-slider';
import { AccommodationService } from 'src/services/accommodation/accommodation.service';

@Component({
  selector: 'app-accommodation-filter-form',
  templateUrl: './accommodation-filter-form.component.html',
  styleUrls: ['./accommodation-filter-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AccommodationFilterFormComponent implements OnInit {

  private availableFilters: Filter[] = [];

  public isAnyFilterActive: boolean = false;

  public availableCountryNames: string[] = [];

  public filterForm: FormGroup;

  public minPriceValue: number;
  public maxPriceValue: number;
  public optionsPrice: Options;
  public minSurfaceValue: number;
  public maxSurfaceValue: number;
  public optionsSurface: Options;

  // tslint:disable-next-line:max-line-length
  constructor(public formBuilder: FormBuilder , private router: Router, public accommodationService: AccommodationService) {
    this.minPriceValue = 0;
    this.maxPriceValue = 1500

    this.minSurfaceValue = 1;
    this.maxSurfaceValue = 150;
    this.optionsSurface = {floor:1, ceil: this.maxSurfaceValue};


    this.availableFilters.push(new Filter("name", "Nom"));
    this.availableFilters.push(new Filter("country", "Pays"));
    this.availableFilters.push(new Filter("price", "Prix"));
    this.availableFilters.push(new Filter("surface", "Surface"));

    if(this.accommodationService.hasLoadedAccommodationsPage){
      this.availableFilters = this.accommodationService.dumpedFilters;
      this.isAnyFilterActive = this.accommodationService.isFilterApplied;
      this.filterForm = this.accommodationService.filterForm;
    } else {
      let formData = {};
      this.availableFilters.forEach((filter) => {
        formData[filter.name] = [''];
      });
      
      this.filterForm = this.formBuilder.group(formData);
      this.accommodationService.filterForm = this.filterForm;
    }

  }

  ngOnInit() {
      
      // Getting all countries that are in atleast 1 student
      this.accommodationService
        .getAvailableCountries()
        .then(res => {
          this.availableCountryNames = res;
        })
        .catch(error => console.log(error));

      this.accommodationService
        .getMaxPrice()
        .then(res => {
          this.maxPriceValue = res;
          this.optionsPrice = {floor:0, ceil: this.maxPriceValue};
        })
        .catch(error => console.log(error));

      // Getting all sections that are in atleast 1 internship
      this.accommodationService
        .getMaxSurface()
        .then(res => {
          this.maxSurfaceValue = res;
          this.optionsSurface = {floor:0, ceil: this.maxSurfaceValue};
        })
        .catch(error => console.log(error));
  }

  ngOnDestroy(){
    this.accommodationService.hasLoadedAccommodationsPage = true;
    this.accommodationService.isFilterApplied = this.isAnyFilterActive;
    this.accommodationService.dumpedFilters = this.availableFilters;
    this.accommodationService.filterForm = this.filterForm;
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
    this.accommodationService.getAccommodations();
    this.accommodationService.isFilterApplied = this.isAnyFilterActive;
  }

  keyPressed(event){
    if(event.keyCode == 13){
      this.filter();
    }
  }

}
