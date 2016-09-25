import { Injectable } from '@angular/core';
import { RoutePermissionsConfig } from './guards/route-permissions.model';

@Injectable()
export class AccessCalculator {
  hasAccess(routeConfig: RoutePermissionsConfig, allPermissions: string[]): boolean {
    if (!!routeConfig.only) {
      if (typeof routeConfig.only === 'string' && routeConfig.only.length) {
        if (!this.hasPermission(<string>routeConfig.only, allPermissions)) {
          return false;
        }
      } else {
        if (!this.hasAnyPermission(<string[]>routeConfig.only, allPermissions)) {
          return false;
        }
      }
    }

    if (!!routeConfig.except) {
      if (typeof routeConfig.except === 'string' && routeConfig.except.length) {
        if (this.hasPermission(<string>routeConfig.except, allPermissions)) {
          return false;
        }
      } else {
        if (this.hasAnyPermission((<any>routeConfig.except), allPermissions)) {
          return false;
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
