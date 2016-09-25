import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, BehaviorSubject } from 'rxjs';
import { Authenticator } from './authentication.service';
import { Profile } from './profile.model';
import { Http } from '@angular/http';

@Injectable()
export class AuthorizationService {
  private _permissions: BehaviorSubject<Permission[]>;

  constructor(private authenticator: Authenticator,
              private http: Http) {
    this._permissions = new BehaviorSubject<Permission[]>([]);
    authenticator.currentUser.subscribe(() =>
      this.getPermissions()
        .subscribe((permissions: Permission[]) => this._permissions.next(permissions))
    );
  }

  get permissions(): Observable<Permission[]> {
    return this._permissions.asObservable();
  }

  protected getPermissions(): Observable<Permission[]> {
    return this.authenticator.currentUser.map((profile: Profile) => {
      if (!profile) {
        return [];
      }

      return profile.roles;
    });
  }
}

export interface Permission extends String {

}
