import { Component, OnInit } from '@angular/core';
import { TestServiceService } from 'src/services/test/test-service.service';

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.css'],
  providers: [TestServiceService]
})
export class WaiterComponent implements OnInit {

  constructor(public testService: TestServiceService) { }

  ngOnInit() {
    this.testService.listen();
  }

}
