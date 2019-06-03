import { Component, OnInit } from '@angular/core';
import { FormerStudent } from '../../../models/former-student';
import { FormerStudentService } from '../../../services/former-student/former-student.service';
import { PaginationInfo } from '../../../services/base.service';

@Component({
  selector: 'app-former-student-list',
  templateUrl: './former-student-list.component.html',
  styleUrls: ['./former-student-list.component.css']
})
export class FormerStudentListComponent implements OnInit {

  private NB_ELEMENTS_PER_PAGE: number = 4;

  public formerStudentList: FormerStudent[] = [];
  public pagination_info: PaginationInfo;
  public current_page: number;
  public isFilterApplied = false;

  constructor(public formerStudentService: FormerStudentService) {
    this.formerStudentService.elementPerPage = this.NB_ELEMENTS_PER_PAGE;
    this.formerStudentService.formerStudents$.subscribe((formerStudents) => {
      this.formerStudentList = formerStudents;
      this.isFilterApplied = this.formerStudentService.isFilterApplied;
    });

    this.formerStudentService.pagination$.subscribe((pagination) => {
      this.pagination_info = pagination;
      if(pagination) this.current_page = pagination.current_page;
    });

    this.formerStudentService.getFormerStudents(); 
  }

  ngOnInit() {
  }

  goToPage(page: number){
    this.formerStudentService.getPage(page);
  }

  onPrev(){
    this.formerStudentService.getPage(this.current_page - 1);
  }

  onNext(){
    this.formerStudentService.getPage(this.current_page + 1);
  }

}
