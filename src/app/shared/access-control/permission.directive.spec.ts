import { Component } from '@angular/core';
import { TestBed, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';

import { PermissionDirective } from './permission.directive';
import { AuthorizationService } from './authorization.service';
import { AccessCalculator } from './has-access.service';
import { RoutePermissionsConfig } from './guards/route-permissions.model';

@Component({
  selector: 'test',
  template: `
      <div *ultPermission="permissionConfig">
        <span id="inTemplate">In the template</span>
      </div>
    `
})
export class TestComponent {
  permissionConfig: RoutePermissionsConfig;
}

describe('permission.directive', () => {
  let fixure: ComponentFixture<TestComponent>;
  let cmp: TestComponent;
  let authorizationServiceStub = {
    permissions: new Subject<string[]>()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PermissionDirective,
        TestComponent
      ],
      providers: [
        AccessCalculator,
        {provide: AuthorizationService, useValue: authorizationServiceStub},
        {provide: ComponentFixtureAutoDetect, useValue: true}
      ]
    });

    fixure = TestBed.createComponent(TestComponent);
    cmp = fixure.componentInstance;
  });

  afterEach(() => {
    fixure.destroy();
  });

  describe('only configuration', () => {
    it('should NOT insert the template in the DOM when user DOES NOT have only permission', () => {
      authorizationServiceStub.permissions.next(['another']);
      cmp.permissionConfig = {only: 'view'};

      fixure.detectChanges();

      expect(fixure.debugElement.query(By.css('#inTemplate'))).toBeFalsy();
    });

    it('should insert the template in the DOM when user DOES have only permission', () => {
      authorizationServiceStub.permissions.next(['view', 'another']);
      cmp.permissionConfig = {only: 'view'};

      fixure.detectChanges();

      expect(fixure.debugElement.query(By.css('#inTemplate'))).toBeTruthy();
    });

    it('should calculate only as array correctly and add template in dom', () => {
      authorizationServiceStub.permissions.next(['one', 'two', 'three']);
      cmp.permissionConfig = {only: ['view', 'three']};

      fixure.detectChanges();

      expect(fixure.debugElement.query(By.css('#inTemplate'))).toBeTruthy();
    });

    it('should calculate only as array correctly and remove template from dom', () => {
      authorizationServiceStub.permissions.next(['one', 'two', 'three']);
      cmp.permissionConfig = {only: ['not-has-one', 'not-has-two']};

      fixure.detectChanges();

      expect(fixure.debugElement.query(By.css('#inTemplate'))).toBeFalsy();
    });

    describe('recalculate on config and permissions change', () => {
      it('should remove the template once the permissions are removed', () => {
        authorizationServiceStub.permissions.next(['view', 'another']);
        cmp.permissionConfig = {only: 'view'};

        fixure.detectChanges();

        expect(fixure.debugElement.query(By.css('#inTemplate'))).toBeTruthy();

        authorizationServiceStub.permissions.next([]);
        fixure.detectChanges();

        expect(fixure.debugElement.query(By.css('#inTemplate'))).toBeFalsy();
      });

      it('should remove the template once the required permissions change', () => {
        authorizationServiceStub.permissions.next(['view', 'another']);
        cmp.permissionConfig = {only: 'view'};

        fixure.detectChanges();

        expect(fixure.debugElement.query(By.css('#inTemplate'))).toBeTruthy();

        cmp.permissionConfig = {only: 'user-not-have'};
        fixure.detectChanges();

        expect(fixure.debugElement.query(By.css('#inTemplate'))).toBeFalsy();
      });
    });
  });

  describe('except configuration', () => {
    it('should NOT insert the template in the DOM when user DOES have except permission', () => {
      authorizationServiceStub.permissions.next(['another', 'view']);
      cmp.permissionConfig = {except: 'view'};

      fixure.detectChanges();

      expect(fixure.debugElement.query(By.css('#inTemplate'))).toBeFalsy();
    });

    it('should insert the template in the DOM when user DOES NOT have except permission', () => {
      authorizationServiceStub.permissions.next(['another']);
      cmp.permissionConfig = {except: 'view'};

      fixure.detectChanges();

      expect(fixure.debugElement.query(By.css('#inTemplate'))).toBeTruthy();
    });

    it('should calculate except as array correctly and add template in dom', () => {
      authorizationServiceStub.permissions.next(['one', 'two', 'three']);
      cmp.permissionConfig = {except: ['not-has-one', 'not-has-two']};

      fixure.detectChanges();

      expect(fixure.debugElement.query(By.css('#inTemplate'))).toBeTruthy();
    });

    it('should calculate except as array correctly and remove template from dom', () => {
      authorizationServiceStub.permissions.next(['one', 'two', 'three']);
      cmp.permissionConfig = {except: ['view', 'three']};

      fixure.detectChanges();

      expect(fixure.debugElement.query(By.css('#inTemplate'))).toBeFalsy();
    });

    describe('recalculate on config and permissions change', () => {
      it('should add the template once the permissions are removed', () => {
        authorizationServiceStub.permissions.next(['view', 'another']);
        cmp.permissionConfig = {except: 'view'};

        fixure.detectChanges();

        expect(fixure.debugElement.query(By.css('#inTemplate'))).toBeFalsy();

        authorizationServiceStub.permissions.next([]);
        fixure.detectChanges();

        expect(fixure.debugElement.query(By.css('#inTemplate'))).toBeTruthy();
      });

      it('should remove the template once the required permissions change', () => {
        authorizationServiceStub.permissions.next(['view', 'another']);
        cmp.permissionConfig = {except: 'user-not-have'};

        fixure.detectChanges();

        expect(fixure.debugElement.query(By.css('#inTemplate'))).toBeTruthy();

        cmp.permissionConfig = {except: 'view'};
        fixure.detectChanges();

        expect(fixure.debugElement.query(By.css('#inTemplate'))).toBeFalsy();
      });
    });
  });

});
