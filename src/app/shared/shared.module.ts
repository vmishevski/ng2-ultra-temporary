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
import {
  PermissionGuard, AuthorizationService, Authenticator, AuthenticateGuard,
  RestoreUserGuard
} from './access-control';
import { LoginComponent } from './access-control/login.component';

export const ACCESS_CONTROL_PROVIDERS = [
  Authenticator,
  AuthorizationService,
  PermissionGuard,
  AuthenticateGuard,
  RestoreUserGuard
];

@NgModule({
  declarations: [
    Heading,
    HeadingTitle,
    HeadingSubtitle,
    HeadingActions,
    Page,
    PageSize,
    LoginComponent
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
    PageSize,
    LoginComponent
  ],
  imports: [
    FormsModule,
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
    RestService,
    Authenticator,
    AuthorizationService,
    ...ACCESS_CONTROL_PROVIDERS
  ]
})
export class SharedModule {
  constructor() {
  }
}
