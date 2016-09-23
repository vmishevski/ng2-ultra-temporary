import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { TooltipModule } from 'ng2-bootstrap/components/tooltip';
import { DropdownModule } from 'ng2-bootstrap/components/dropdown';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { LayoutManager } from '../layout';

import { Heading, HeadingTitle, HeadingSubtitle, HeadingActions } from './heading';
import { Page, PageSize } from './page';
import { RestService } from './rest/rest.service';
import { HttpInterceptor } from './http/http.interceptor';

@NgModule({
  declarations: [
    Heading,
    HeadingTitle,
    HeadingSubtitle,
    HeadingActions,
    Page,
    PageSize
  ],
  exports: [
    CommonModule,
    HttpModule,
    FormsModule,
    SlimLoadingBarModule,
    TooltipModule,
    DropdownModule,
    Heading,
    HeadingTitle,
    HeadingSubtitle,
    HeadingActions,
    Page,
    PageSize
  ],
  imports: [
    CommonModule,
    HttpModule,
    TooltipModule,
    DropdownModule,
    SlimLoadingBarModule.forRoot()
  ],
  providers: [
    {
      provide: Http,
      useFactory: (backend, options) => {
        return new HttpInterceptor(backend, options);
      },
      deps: [XHRBackend, RequestOptions]
    },
    LayoutManager,
    RestService
  ]
})
export class SharedModule {
  constructor() {}
}
