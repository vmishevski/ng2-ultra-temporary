import { Component } from '@angular/core';

@Component({
  selector: 'ult-heading-subtitle',
  styleUrls: [
    './subtitle.style.scss'
  ],
  template: `
    <span class="ult-heading-subtitle">
      <ng-content></ng-content>
    </span>
  `
})
export class HeadingSubtitle {
}
