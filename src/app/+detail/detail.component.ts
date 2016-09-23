import { Component } from '@angular/core';

@Component({
  selector: 'detail',
  styleUrls: ['./detail.style.scss'],
  template: `
    <ult-heading>
      <ult-heading-title>Heading</ult-heading-title>
      <ult-heading-actions>
        <button class="btn btn-primary">Actions</button>
      </ult-heading-actions>
    </ult-heading>
    <router-outlet></router-outlet>
  `
})
export class Detail {
  constructor() {

  }

  ngOnInit() {
    console.log('hello `Detail` component');
  }

}
