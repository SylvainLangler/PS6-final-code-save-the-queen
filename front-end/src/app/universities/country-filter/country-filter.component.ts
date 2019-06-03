import { Component, OnInit } from '@angular/core';
import { Country } from 'src/models/country';
import { CountryService } from '../../../services/country/country.service';
import { COUNTRY_MOCK } from 'src/mocks/countrys.mock';

@Component({
  selector: 'app-country-filter',
  templateUrl: './country-filter.component.html',
  styleUrls: ['./country-filter.component.css']
})
export class CountryFilterComponent implements OnInit {
  
  private currentCountry;

  public countrys: Country[] = COUNTRY_MOCK;
  public selectedCountry: Country;

  // tslint:disable-next-line:max-line-length
  constructor(public countryService: CountryService) {
    
  }

  ngOnInit() {

  }

  getSelectedCountry(selectedCountry: Country) {
      this.countryService.setCurrentCountry(selectedCountry);
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior:'smooth'});
  }

}
