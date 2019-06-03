import { Component, OnInit, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Internship } from 'src/models/internship';

@Component({
  selector: 'modal-content',
  templateUrl: './internship-modal-content.component.html',
  styleUrls: ['./internship-modal-content.component.css']
})

export class InternshipModalContentComponent implements OnInit {

  modalRef: BsModalRef;
  
  @Input()
  internship: Internship;
 
  constructor(public bsModalRef: BsModalRef) {}
 
  ngOnInit() {
    
  }

  getGreenDollarArray(costOfLife: number){
    let tab = [];
    for(let i = 0; i<costOfLife; i++){
      tab.push(i);
    }
    return tab;
  }

  getGreyDollarArray(costOfLife: number){
    let tab = [];
    for(let i = 0; i<5-costOfLife; i++){
      tab.push(i);
    }
    return tab;

  }
}
