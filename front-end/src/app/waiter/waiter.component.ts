import { Component, OnInit } from '@angular/core';
import { TestServiceService } from 'src/services/test/test-service.service';
import { CookieService } from 'ngx-cookie-service';
import { Internship } from '../../models/internship';

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.css'],
  providers: [TestServiceService, CookieService]
})
export class WaiterComponent implements OnInit {

  unvalidatedInternship: Internship;
  logged: boolean;

  constructor(public testService: TestServiceService, public cookieService: CookieService) {
    this.testService.listen();

    this.testService.incrementObs.subscribe((res) => {
      this.unvalidatedInternship = res;
    });
    this.testService.getIncrement();

    this.logged = cookieService.check('login');
  }

  ngOnInit() { }

  getGreenDollarArray(costOfLife: number) {
    let tab = [];
    for (let i = 0; i < costOfLife; i++) {
      tab.push(i);
    }
    return tab;
  }

  getGreyDollarArray(costOfLife: number) {
    let tab = [];
    for (let i = 0; i < 5 - costOfLife; i++) {
      tab.push(i);
    }
    return tab;

  }

}

