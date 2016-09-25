import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Authenticator } from '../authentication.service';

@Injectable()
export class RestoreUserGuard implements Resolve<any> {
  constructor(private authenticator: Authenticator) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
    return this.authenticator.restoreSession();
  }

}
