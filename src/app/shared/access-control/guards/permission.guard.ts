import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { RoutePermissionsConfig } from './route-permissions.model';
import { AuthorizationService } from '../authorization.service';

@Injectable()
export class PermissionGuard implements CanActivate, CanActivateChild {
  constructor(private authorizationService: AuthorizationService) {
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
        return this.hasAccess(permissionsConfig, permissions);
      })
      // Observable must complete:
      // https://github.com/angular/angular/issues/9613
      .take(1);
  }

  private hasAccess(routeConfig: RoutePermissionsConfig, allPermissions: string[]): boolean {
    if (!!routeConfig.only) {
      if (typeof routeConfig.only === 'string' && routeConfig.only.length) {
        if (!this.hasPermission(<string>routeConfig.only, allPermissions)) {
          return false;
        }
      } else {
        if (!this.hasPermissions(<string[]>routeConfig.only, allPermissions)) {
          return false;
        }
      }
    }

    if (!!routeConfig.except) {
      if (typeof routeConfig.except === 'string' && routeConfig.except.length) {
        if (this.hasPermission(<string>routeConfig.except, allPermissions)) {
          return false;
        } else {
          if (this.hasAnyPermission((<any>routeConfig.except), allPermissions)) {
            return false;
          }
        }
      }
    }

    return true;
  }

  private hasPermission(permission: string, allPermissions: string[]): boolean {
    return allPermissions.indexOf(permission) > -1;
  }

  private hasPermissions(permissions: string[], allPermissions: string[]): boolean {
    let hasAll: boolean = true;

    permissions.forEach((permission) => {
      if (!this.hasPermission(permission, allPermissions)) {
        hasAll = false;
      }
    });

    return hasAll;
  }

  private hasAnyPermission(permissions: string[], allPermissions: string[]): boolean {
    let hasAny: boolean = false;

    permissions.forEach((permission) => {
      if (this.hasPermission(permission, allPermissions)) {
        hasAny = true;
      }
    });

    return hasAny;
  }
}
