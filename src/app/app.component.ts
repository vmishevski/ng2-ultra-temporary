import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AppState } from './app.service';
import { LayoutManager } from './layout';

require('../assets/scss/main.scss');

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.style.scss'
  ],
  template: `
    <ng2-slim-loading-bar></ng2-slim-loading-bar>
    <div class="ult" [ngClass]="{
      'ult-sidebar-open': this.sidebarOpen,
      'ult-sidebar-closed': !this.sidebarOpen,
      'utl-breakpoint-xs': this.breakpoint == 'xs',
      'utl-breakpoint-sm': this.breakpoint == 'sm',
      'utl-breakpoint-md': this.breakpoint == 'md',
      'utl-breakpoint-lg': this.breakpoint == 'lg',
      'utl-breakpoint-xl': this.breakpoint == 'xl'
    }">
      <ult-sidebar [sidebarOpen]="sidebarOpen"></ult-sidebar>
      <main class="ult-main">
        <div class="ult-container">
          <ult-nav></ult-nav>
          <router-outlet></router-outlet>
        </div>
        <ult-footer></ult-footer>
      </main>
    </div>
  `,
  providers: [
    LayoutManager
  ]
})
export class App implements OnInit{
  sidebarOpen: boolean;
  breakpoint: string;

  constructor(
    public appState: AppState,
    public layoutManager: LayoutManager
  ) {}

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
    this.layoutManager.state.sidebar.subscribe(value => {
      this.sidebarOpen = value;
    });
    this.layoutManager.state.breakpoint.subscribe(value => {
      console.log('Active breakpoint', value);
      this.breakpoint =  value;
    });
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
