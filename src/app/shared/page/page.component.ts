import { Component } from '@angular/core';
import { LayoutManager } from '../../layout';

@Component({
 selector: 'ult-page',
 styleUrls: [
   './page.style.scss'
 ],
 templateUrl: './page.template.html'
})
export class Page {
  pageSize: string;

  constructor(
    public layoutManager: LayoutManager
  ) {}


  ngOnInit() {
    this.layoutManager.state.page.subscribe(value => {
      this.pageSize = value;
    });
  }

}
