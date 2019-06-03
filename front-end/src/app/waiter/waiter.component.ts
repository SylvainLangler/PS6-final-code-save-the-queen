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

  constructor(public testService: TestServiceService) { }

  ngOnInit() {
    this.testService.getIncrement().subscribe((data) => {
      console.log(data);
      this.count = data;
      this.testService.listen();
    });
  }

}
