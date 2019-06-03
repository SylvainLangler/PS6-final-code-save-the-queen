import { Component, OnInit, Input } from '@angular/core';
import { Agency } from 'src/models/agency';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {

  @Input()
  agency: Agency;

  constructor() { }

  ngOnInit() {
  }

}
