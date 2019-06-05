import { Component, Input, EventEmitter, Output } from '@angular/core';
import { PaginationInfo } from '../../services/base.service';

@Component({
  selector: 'app-my-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})

export class PaginationComponent {
  @Input() pagination_info: PaginationInfo;

  @Output() goPrev = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();
  @Output() goPage = new EventEmitter<number>();

  constructor() {}

  getFirstOfPage(){
    return this.pagination_info.first_result + 1;
  }

  getLastOfPage(){
    return this.pagination_info.last_result + 1;
  }

  onPage(n: number){
    this.goPage.emit(n);
  }

  onPrev(){
    this.goPrev.emit(true);
  }

  onNext(next: boolean){
    this.goNext.emit(next);
  }

  getPages(): number[] {
    const c = Math.ceil(this.pagination_info.total_results / this.pagination_info.results);
    const p = this.pagination_info.current_page || 1;
    const pagesToShow = ((this.pagination_info.last_page + 1) - this.pagination_info.first_page) || 9;
    const pages: number[] = [];
    pages.push(p);
    const times = pagesToShow - 1;
    for (let i = 0; i < times; i++) {
      if (pages.length < pagesToShow) {
        if (Math.min.apply(null, pages) > 1) {
          pages.push(Math.min.apply(null, pages) - 1);
        }
      }
      if (pages.length < pagesToShow) {
        if (Math.max.apply(null, pages) < c) {
          pages.push(Math.max.apply(null, pages) + 1);
        }
      }
    }
    pages.sort((a, b) => a - b);
    console.log(pages);
    return pages;
  }

}
