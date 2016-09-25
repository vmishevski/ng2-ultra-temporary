import { TestBed, async, getTestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { Http, RequestOptions, HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { AuthenticateGuard } from './authenticate.guard';
import { Authenticator } from '../authentication.service';
import { AuthorizationService } from '../authorization.service';
import { PermissionGuard } from './permission.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'test-component',
  template: '<span>Test</span>'
})
class TestComponent {
  constructor() {
    console.log('TestComponent created');
  }
}

@Component({
  selector: 'base',
  template: '<router-outlet></router-outlet>'
})
class BaseComponent {

}

let routes: Routes = [
  {
    path: '',
    canActivateChild: [PermissionGuard],
    children: [
      {
        path: 'only-view',
        component: TestComponent,
        data: {permissions: {only: ['view']}}
      },
      {
        path: 'only-view-one',
        component: TestComponent,
        data: {permissions: {only: ['view']}}
      },
      {
        path: 'except-edit',
        component: TestComponent,
        data: {permissions: {only: ['edit']}}
      }
    ]
  }
];


describe('permission.guard', () => {
  let router: Router;
  let authService = {
    permissions: new BehaviorSubject<string[]>([])
  };

  beforeEach((done) => {
    let c = TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthorizationService,
          useValue: authService
        },
        PermissionGuard,
        {
          provide: APP_BASE_HREF,
          useValue: '/'
        }
      ],
      imports: [
        CommonModule,
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [
        TestComponent,
        BaseComponent
      ]
    }).compileComponents();

    router = TestBed.get(Router);

    TestBed.createComponent(BaseComponent);

    return c.then(done);
  });

  it('should prevent activation when user has no permissions', async(() => {
    router.navigate(['only-view']).then(navigationShouldFail);
  }));

  it('should prevent activation when user does NOT have correct permission', async(() => {
    authService.permissions.next(['permission-one', 'permission-two']);

    router.navigate(['only-view']).then(navigationShouldFail);
  }));

  it('should allow activation when user HAS correct permission', async(() => {
    authService.permissions.next(['view', 'permission-two']);

    router.events.subscribe(() => console.log(arguments));

    router.navigateByUrl('/only-view-one').then(navigationShouldSucceed);
  }));

  function navigationShouldFail(success: boolean) {
    if (success) {
      throw new Error('navigation should fail');
    }
  }

  function navigationShouldSucceed(success: boolean) {
    console.log(success);
    if (!success) {
      throw new Error('navigation should succeed');
    }
  }
});
