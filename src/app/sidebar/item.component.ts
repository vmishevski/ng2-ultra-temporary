import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
 selector: '.ult-sidebar-item',
 encapsulation: ViewEncapsulation.None,
 styleUrls: [
   './item.style.scss'
 ],
 templateUrl: './item.template.html'
})
export class SidebarItem {
  @Input() label: string;
  @Input() icon: string;
  ngOnInit() {
  }
}
