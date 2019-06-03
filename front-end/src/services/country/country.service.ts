import { Country } from '../../models/country';
import { University} from '../../models/university';
import { UNIVERSITYS_MOCK } from 'src/mocks/universitys.mock';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CountryService {
  private CountryList: Country[] = [];
  private UniversityList: University[] = UNIVERSITYS_MOCK;
  private currUniversityList: University[] = [];
  private currCountry: Country;
  public currUniversityList$: BehaviorSubject<University[]> = new BehaviorSubject(this.currUniversityList);
  public CountryList$: BehaviorSubject<Country[]> = new BehaviorSubject(this.CountryList);
  public currCountry$: BehaviorSubject<Country> = new BehaviorSubject(this.currCountry);

    constructor() {
    }
    /**
     * Services Documentation:
     * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
     */
    /**
     * Observable which contains the list of the tickets.
     * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
     */
    setCurrentCountry(country: Country) {
      this.currCountry$.next(country);
      this.setCurrentUniversity(this.sortUniversity(country.CountryID, this.currUniversityList));
    }

    sortUniversity(countryID: number , currUniversityList: University[]) {
      currUniversityList = [];
      this.UniversityList.forEach(function(item, index, array) {
        if (item.CountryID === countryID ) {
          currUniversityList.push(item);
        }
      });
      return currUniversityList;
    }

    setCurrentUniversity(universitys: University[]) {
      this.currUniversityList$.next(universitys);
    }
  }
