import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/index';
import { Agency } from '../../models/agency';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BaseService, ResponseJSON, PaginationInfo, Filter } from '../base.service';
import { FormGroup } from '@angular/forms';
import { Router, UrlSerializer } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  private agencyURL = this.baseService.baseURL + 'agencies';

  public isFilterApplied: boolean = false;
  public hasLoadedAgenciesPage: boolean = false;
  public dumpedFilters: Filter[] = [];

  public filterForm: FormGroup;

  private agencyList: Agency[] = [];
  private currAgency: Agency;
  private pagination_info: PaginationInfo;

  public agencies$: BehaviorSubject<Agency[]> = new BehaviorSubject(this.agencyList);
  public currAgency$: BehaviorSubject<Agency> = new BehaviorSubject(this.currAgency);
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

  private requestAgencies(URL: string, parameters: any){
    parameters.elemPerPage = this.elementPerPage;
    this.http.get<ResponseJSON>(URL, {params: parameters}).subscribe((reqResult) => {
      this.agencyList = reqResult.agencies;
      this.pagination_info = reqResult.pagination_info;
      this.agencies$.next(this.agencyList);
      this.pagination$.next(this.pagination_info);
    });
  }


  private handleError(error: any){
    console.error('Une erreur est survenue', error);
    return Promise.reject(error.message || error);
  }

  getAgencies() {
    if(this.filterForm){
      this.requestAgencies(this.agencyURL, this.filterForm.getRawValue());
    } 
    else{
      this.requestAgencies(this.agencyURL, {});
    }
  }

  getStatistics(){
    let URL = this.agencyURL + "/statistics";
    return this.http.get<any>(URL).toPromise().then((res) => {return res || {};}).catch(this.handleError);
  }

  getAvailableCountries() {
    const URL = this.agencyURL + '/available_countries';
    return this.http.get<any>(URL).toPromise().then((res) => {return res || [];}).catch(this.handleError);
  }

  getPage(page: number){
    let params = this.filterForm.getRawValue();
    params.page = page;
    this.requestAgencies(this.agencyURL, params);
  }
}
