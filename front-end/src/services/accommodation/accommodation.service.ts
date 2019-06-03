import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Accommodation } from 'src/models/accommodation';
import { PaginationInfo, BaseService, ResponseJSON, Filter } from '../base.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router, UrlSerializer } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AccommodationService {

    private accommodationURL = this.baseService.baseURL + 'accommodations';

    public isFilterApplied: boolean = false;
    public hasLoadedAccommodationsPage: boolean = false;
    public dumpedFilters: Filter[] = [];
  
    public filterForm: FormGroup;
  
    private accommodationList: Accommodation[] = [];
    private currAccommodation: Accommodation;
    private pagination_info: PaginationInfo;
  
    public accommodations$: BehaviorSubject<Accommodation[]> = new BehaviorSubject(this.accommodationList);
    public currAccommodation$: BehaviorSubject<Accommodation> = new BehaviorSubject(this.currAccommodation);
    public pagination$: BehaviorSubject<PaginationInfo> = new BehaviorSubject(this.pagination_info);
  
    public elementPerPage: number = 4;
  
    constructor(private http: HttpClient, private baseService: BaseService, private router: Router, private serializer: UrlSerializer) {
    }
    /**
     * Services Documentation:
     * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
     */
  
    /**
     * Observable which contains the list of the tickets.
     * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
     */
  
    private requestAccommodations(URL: string, parameters: any){
      parameters.elemPerPage = this.elementPerPage;
      if(parameters.price){
        parameters.priceStart = parameters.price[0];
        parameters.priceEnd = parameters.price[1];
      }
      if(parameters.surface){
        parameters.surfaceStart = parameters.surface[0];
        parameters.surfaceEnd = parameters.surface[1];
      }
      this.http.get<ResponseJSON>(URL, {params: parameters}).subscribe((reqResult) => {
        this.accommodationList = reqResult.accommodations;
        this.pagination_info = reqResult.pagination_info;
        this.accommodations$.next(this.accommodationList);
        this.pagination$.next(this.pagination_info);
      });
    }
  
  
    private handleError(error: any){
      console.error('Une erreur est survenue', error);
      return Promise.reject(error.message || error);
    }
  
    getAccommodations() {
      if(this.filterForm){
        this.requestAccommodations(this.accommodationURL, this.filterForm.getRawValue());
      } 
      else{
        this.requestAccommodations(this.accommodationURL, {});
      }
    }
  
    getStatistics(){
      let URL = this.accommodationURL + "/statistics";
      return this.http.get<any>(URL).toPromise().then((res) => {return res || {};}).catch(this.handleError);
    }

    getMaxPrice(){
      let URL = this.accommodationURL + "/max_price";
      return this.http.get<any>(URL).toPromise().then((res) => {return res || 1500;}).catch(this.handleError);
    }

    getMaxSurface(){
      let URL = this.accommodationURL + "/max_surface";
      return this.http.get<any>(URL).toPromise().then((res) => {return res || 300;}).catch(this.handleError);
    }
  
    getAvailableCountries() {
      const URL = this.accommodationURL + '/available_countries';
      return this.http.get<any>(URL).toPromise().then((res) => {return res || [];}).catch(this.handleError);
    }
  
    getPage(page: number){
      let params = this.filterForm.getRawValue();
      params.page = page;
      this.requestAccommodations(this.accommodationURL, params);
    }
}