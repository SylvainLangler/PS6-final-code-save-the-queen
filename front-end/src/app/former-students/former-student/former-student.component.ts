import { Component, OnInit, Input } from '@angular/core';
import { FormerStudent } from '../../../models/former-student';


@Component({
  selector: 'app-former-student',
  templateUrl: './former-student.component.html',
  styleUrls: ['./former-student.component.css']
})
export class FormerStudentComponent implements OnInit {

  @Input()
  formerStudent: FormerStudent;

  constructor() { }

  ngOnInit() {
  }

}
