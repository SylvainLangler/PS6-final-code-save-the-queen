import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  mobileMenuDisplayed: boolean = false;
  isCollapsed = true;
  constructor() { 
  }

  ngOnInit() {
  }

  toggleMobileMenu(){
    this.mobileMenuDisplayed = !(this.mobileMenuDisplayed);
  }
}
