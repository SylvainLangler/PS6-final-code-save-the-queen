import { Component, OnInit } from '@angular/core';
import { TestServiceService } from 'src/services/test/test-service.service';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.css'],
  providers: [TestServiceService]
})
export class WaiterComponent implements OnInit {

  count: number;

  constructor(public testService: TestServiceService) {
    this.testService.listen();
    this.testService.incrementObs.subscribe((res) => {
      this.count = res;
    });
    this.testService.getIncrement();
  }

  ngOnInit() {
  }

}
