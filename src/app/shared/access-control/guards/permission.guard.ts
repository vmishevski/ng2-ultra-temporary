import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { RoutePermissionsConfig } from './route-permissions.model';
import { AuthorizationService } from '../authorization.service';
import { AccessCalculator } from '../has-access.service';

@Injectable()
export class PermissionGuard implements CanActivate, CanActivateChild {
  constructor(private authorizationService: AuthorizationService, private accessCalc: AccessCalculator) {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return this.isAuthorizedForRoute(childRoute, state);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return this.isAuthorizedForRoute(route, state);
  }

  private isAuthorizedForRoute(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let permissionsConfig: RoutePermissionsConfig = route.data['permissions'];
    if (!permissionsConfig) {
      // if no permissions provided in current route
      // user can access the route
      return Observable.of(true);
    }

    return this.authorizationService.permissions
      .map((permissions: string[]) => {
        return this.accessCalc.hasAccess(permissionsConfig, permissions);
      })
      // Observable must complete:
      // https://github.com/angular/angular/issues/9613
      .take(1);
  }
}
