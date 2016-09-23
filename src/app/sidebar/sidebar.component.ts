import { Component, ViewEncapsulation, Input } from '@angular/core';
import { LayoutManager } from '../layout';
import { SidebarItem } from './item.component.ts';

@Component({
 selector: 'ult-sidebar',
 encapsulation: ViewEncapsulation.None,
 styleUrls: [
   './sidebar.style.scss'
 ],
 templateUrl: './sidebar.template.html'
})
export class Sidebar {
  @Input() sidebarOpen: any;

  constructor(
    public layoutManager: LayoutManager
  ) {}

  closeSidebar(): void {
    this.layoutManager.toggle();
  };

  ngOnInit() {
  }
}
