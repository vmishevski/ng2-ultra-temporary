import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { Authenticator } from '../authentication.service';

@Injectable()
export class AuthenticateGuard implements CanActivate, CanActivateChild {
  constructor(private authenticator: Authenticator) {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return this.isAuthorized();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return this.isAuthorized();
  }

  private isAuthorized(): Observable<boolean> {
    return this.authenticator.isAuthorized.take(1);
  }
}
