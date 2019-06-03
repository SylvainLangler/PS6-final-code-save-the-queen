import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../../../models/accommodation';
import { PaginationInfo } from 'src/services/base.service';
import { AccommodationService } from '../../../services/accommodation/accommodation.service';

@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.css']
})
export class AccommodationListComponent implements OnInit {

  private NB_ELEMENTS_PER_PAGE: number = 4;

  public accommodationList: Accommodation[] = [];
  public pagination_info: PaginationInfo;
  public current_page: number;
  public isFilterApplied = false;

  constructor(public accommodationService: AccommodationService) {
    this.accommodationService.elementPerPage = this.NB_ELEMENTS_PER_PAGE;
    this.accommodationService.accommodations$.subscribe((accommodations) => {
      this.accommodationList = accommodations;
      this.isFilterApplied = this.accommodationService.isFilterApplied;
    });

    this.accommodationService.pagination$.subscribe((pagination) => {
      this.pagination_info = pagination;
      if(pagination) this.current_page = pagination.current_page;
    });

    this.accommodationService.getAccommodations(); 
  }

  ngOnInit() {
  }

  goToPage(page: number){
    this.accommodationService.getPage(page);
  }

  onPrev(){
    this.accommodationService.getPage(this.current_page - 1);
  }

  onNext(){
    this.accommodationService.getPage(this.current_page + 1);
  }

}
