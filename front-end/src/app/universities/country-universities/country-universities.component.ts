import { Component, OnInit } from '@angular/core';
import { Country } from 'src/models/country';
import { COUNTRY_MOCK } from 'src/mocks/countrys.mock';
import { CountryService } from 'src/services/country/country.service';
import { University } from '../../../models/university';

@Component({
  selector: 'app-country-universities',
  templateUrl: './country-universities.component.html',
  styleUrls: ['./country-universities.component.css']
})
export class CountryUniversitiesComponent implements OnInit {

  currCountry: Country = COUNTRY_MOCK[0];
  currUniversityList: University[] = [];



  constructor(public countryService: CountryService) {
  }

  ngOnInit() {
    this.countryService.currCountry$.subscribe(s => {
      this.currCountry = s;
    });
    this.countryService.currUniversityList$.subscribe(s => {
      this.currUniversityList = s;
    });
  }

}
