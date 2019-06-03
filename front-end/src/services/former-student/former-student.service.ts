import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/index';
import { FormerStudent } from '../../models/former-student';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BaseService, ResponseJSON, PaginationInfo, Filter } from '../base.service';
import { FormGroup } from '@angular/forms';
import { Router, UrlSerializer } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FormerStudentService {

  private formerStudentsURL = this.baseService.baseURL + 'former-students';

  public isFilterApplied: boolean = false;
  public hasLoadedFormerStudentsPage: boolean = false;
  public dumpedFilters: Filter[] = [];

  public filterForm: FormGroup;

  private formerStudentsList: FormerStudent[] = [];
  private currFormerStudent: FormerStudent;
  private pagination_info: PaginationInfo;

  public formerStudents$: BehaviorSubject<FormerStudent[]> = new BehaviorSubject(this.formerStudentsList);
  public currFormerStudent$: BehaviorSubject<FormerStudent> = new BehaviorSubject(this.currFormerStudent);
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

  private requestFormerStudents(URL: string, parameters: any){
    parameters.elemPerPage = this.elementPerPage;
    this.http.get<ResponseJSON>(URL, {params: parameters}).subscribe((reqResult) => {
      this.formerStudentsList = reqResult.formerStudent;
      this.pagination_info = reqResult.pagination_info;
      this.formerStudents$.next(this.formerStudentsList);
      this.pagination$.next(this.pagination_info);
    });
  }


  private handleError(error: any){
    console.error('Une erreur est survenue', error);
    return Promise.reject(error.message || error);
  }

  getFormerStudents() {
    if(this.filterForm){
      this.requestFormerStudents(this.formerStudentsURL, this.filterForm.getRawValue());
    } 
    else{
        this.requestFormerStudents(this.formerStudentsURL, {});
    }
  }

  
  getAllFormerStudents(){
    let URL = this.formerStudentsURL + "/allFormerStudents";
    return this.http.get<any>(URL).toPromise().then((res) => {return res || {};}).catch(this.handleError);
  }

  

  getStatistics(){
    let URL = this.formerStudentsURL + "/statistics";
    return this.http.get<any>(URL).toPromise().then((res) => {return res || {};}).catch(this.handleError);
  }

  getAvailableCountries() {
    const URL = this.formerStudentsURL + '/available_countries';
    return this.http.get<any>(URL).toPromise().then((res) => {return res || [];}).catch(this.handleError);
  }

  getAvailableSections() {
    const URL = this.formerStudentsURL + '/available_sections';
    return this.http.get<any>(URL).toPromise().then((res) => {return res || [];}).catch(this.handleError);
  }

  getPage(page: number){
    let params = this.filterForm.getRawValue();
    params.page = page;
    this.requestFormerStudents(this.formerStudentsURL, params);
  }

  sortAlpha() {
    function alphabeticSort(a: FormerStudent, b: FormerStudent) {
      if (a.firstName < b.firstName) {
        return -1;
      }
      if (a.firstName > b.firstName) {
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
    this.requestFormerStudents(this.formerStudentsURL, param);
  }

  getFormerStudentByID(id: number) {
    this.formerStudents$.subscribe((formerstudents) => {
      formerstudents.forEach(obj => {
        if (obj.id === id) {
          this.currFormerStudent$.next(obj);
        }
      });
    });
    this.getFormerStudents();
  }
}
