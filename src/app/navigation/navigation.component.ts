import { Component, ViewEncapsulation } from '@angular/core';
import { LayoutManager } from '../layout';

@Component({
  selector: 'ult-nav',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './navigation.style.scss'
  ],
  templateUrl: './navigation.template.html'
})
export class Navigation {
  constructor(
    public layoutManager: LayoutManager
  ) {
  }
  toggleSidebar() {
    this.layoutManager.toggle();
  };
  ngOnInit() {
  };
}
