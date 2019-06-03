import { Component, OnInit } from '@angular/core';
import { Agency } from '../../../models/agency'
import { PaginationInfo } from 'src/services/base.service';
import { AgencyService } from 'src/services/agency/agency.service';

@Component({
  selector: 'app-agency-list',
  templateUrl: './agency-list.component.html',
  styleUrls: ['./agency-list.component.css']
})
export class AgencyListComponent implements OnInit {

  private NB_ELEMENTS_PER_PAGE: number = 3;

  public agencyList: Agency[] = [];
  public pagination_info: PaginationInfo;
  public current_page: number;
  public isFilterApplied = false;

  constructor(public agencyService: AgencyService) {
    this.agencyService.elementPerPage = this.NB_ELEMENTS_PER_PAGE;
    this.agencyService.agencies$.subscribe((agencies) => {
      this.agencyList = agencies;
      this.isFilterApplied = this.agencyService.isFilterApplied;
    });

    this.agencyService.pagination$.subscribe((pagination) => {
      this.pagination_info = pagination;
      if(pagination) this.current_page = pagination.current_page;
    });

    this.agencyService.getAgencies(); 
  }

  ngOnInit() {
  }

  goToPage(page: number){
    this.agencyService.getPage(page);
  }

  onPrev(){
    this.agencyService.getPage(this.current_page - 1);
  }

  onNext(){
    this.agencyService.getPage(this.current_page + 1);
  }

}
