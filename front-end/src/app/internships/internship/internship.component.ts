import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Internship } from '../../../models/internship';
import { InternshipModalContentComponent } from '../internship-modal-content/internship-modal-content.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-internship',
  templateUrl: './internship.component.html',
  styleUrls: ['./internship.component.css']
})
export class InternshipComponent implements OnInit {

  modalRef: BsModalRef;

  @Input()
  internship: Internship;

  constructor(private modalService: BsModalService) { }

  ngOnInit() { }

  openModalWithComponent(internship) {

    const initialState = {
      internship: internship
    };
    this.modalRef = this.modalService.show(InternshipModalContentComponent, {initialState, class:'modal-lg'});
    this.modalRef.content.closeBtnName = 'Close';
  }
}
