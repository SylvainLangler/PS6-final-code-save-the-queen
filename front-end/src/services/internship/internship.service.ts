import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/index';
import { Internship } from '../../models/internship';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { BaseService, ResponseJSON, PaginationInfo, Filter } from '../base.service';
import { FormGroup } from '@angular/forms';
import { Router, UrlSerializer } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InternshipService {

  private internshipsURL = this.baseService.baseURL + 'internships';

  public isFilterApplied: boolean = false;
  public hasLoadedInternshipsPage: boolean = false;
  public dumpedFilters: Filter[] = [];

  public filterForm: FormGroup;

  private internshipList: Internship[] = [];
  private currInternship: Internship;
  private pagination_info: PaginationInfo;

  public internships$: BehaviorSubject<Internship[]> = new BehaviorSubject(this.internshipList);
  public currInternship$: BehaviorSubject<Internship> = new BehaviorSubject(this.currInternship);
  public pagination$: BehaviorSubject<PaginationInfo> = new BehaviorSubject(this.pagination_info);

  public elementPerPage: number = 4;

  constructor(private http: HttpClient, private baseService: BaseService, private router: Router, private serializer: UrlSerializer) {}
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /**
   * Observable which contains the list of the tickets.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */

  private requestInternships(URL: string, parameters: any){
    parameters.elemPerPage = this.elementPerPage;
    if(parameters.duration){
      parameters.durationStart = parameters.duration[0];
      parameters.durationEnd = parameters.duration[1];
    }
    //parameters.validity = true;
    this.http.get<ResponseJSON>(URL, {params: parameters}).subscribe((reqResult) => {
      this.internshipList = reqResult.internships;
      this.pagination_info = reqResult.pagination_info;
      this.internships$.next(this.internshipList);
      this.pagination$.next(this.pagination_info);
    });
  }


  private handleError(error: any){
    console.error('Une erreur est survenue', error);
    return Promise.reject(error.message || error);
  }

  getInternships() {
    if(this.filterForm){
      this.requestInternships(this.internshipsURL, this.filterForm.getRawValue());
    }
  }

  getStatistics(){
    let URL = this.internshipsURL + "/statistics";
    return this.http.get<any>(URL).toPromise().then((res) => {return res || {};}).catch(this.handleError);
  }

  addInternship(intern: Internship) {
    this.http.post<Internship>(this.internshipsURL, intern).subscribe(s => {
      this.internshipList.push(s);
    this.internships$.next(this.internshipList); });
  }

  getAvailableCountries() {
    const URL = this.internshipsURL + '/available_countries';
    return this.http.get<any>(URL).toPromise().then((res) => {return res || [];}).catch(this.handleError);
  }

  getAvailableSections() {
    const URL = this.internshipsURL + '/available_sections';
    return this.http.get<any>(URL).toPromise().then((res) => {return res || [];}).catch(this.handleError);
  }

  getMaxDuration(){
    const URL = this.internshipsURL + '/max_duration';
    return this.http.get<any>(URL).toPromise().then((res) => {return res || 52;}).catch(this.handleError);
  }

  getPage(page: number){
    let params = this.filterForm.getRawValue();
    params.page = page;
    this.requestInternships(this.internshipsURL, params);
  }

  sortAlpha() {
    function alphabeticSort(a: Internship, b: Internship) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    }

    // TO DO when alphabeticalSort is added to back-end
  }

  sortDuration(isActivated, isDecreasingSorting) {
    const param = this.filterForm.getRawValue();
    if(isActivated) param.durationSort = 'true';
    if(isDecreasingSorting) param.decreasingSort = 'true';
    this.requestInternships(this.internshipsURL, param);
  }

  getInternshipByID(id: number) {
    this.internships$.subscribe((internships) => {
      internships.forEach(obj => {
        if (obj.id === id) {
          this.currInternship$.next(obj);
        }
      });
    });
    this.getInternships();
  }
}
