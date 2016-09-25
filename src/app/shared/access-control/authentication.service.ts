import { Observable, BehaviorSubject } from 'rxjs';
import { Profile } from './profile.model';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';


export const TOKEN_CACHE_KEY: string = 'ULT-USER-TOKEN';

@Injectable()
export class Authenticator {
  private _currentUser: BehaviorSubject<Profile>;
  private _loggedOut: BehaviorSubject<any>;

  constructor(private http: Http) {
    this._currentUser = new BehaviorSubject<Profile>(undefined);
    this._loggedOut = new BehaviorSubject<any>(undefined);
  }

  get currentUser(): Observable<Profile> {
    return this._currentUser.asObservable();
  };

  get isAuthorized(): Observable<boolean> {
    return this.currentUser.map((profile: Profile) => !!profile);
  }

  get loggedOut(): Observable<any> {
    return this._loggedOut.asObservable();
  }

  login(username: string, password: string) {
    // make http call to authorize
    // cache user in storage
    let user: Profile = {
      token: 'super-secret-token',
      firstName: 'voislav',
      lastName: 'Mishevski',
      username: 'voislav.mishevski',
      roles: ['users-view', 'users-edit']
    };

    Observable.of(user)
      .subscribe((profile: Profile) => {
        localStorage.setItem(TOKEN_CACHE_KEY, profile.token);
        this._currentUser.next(profile);
      });
  }

  logout(): void {
    // remove from storage
    localStorage.removeItem(TOKEN_CACHE_KEY);
    this._loggedOut.next(false);
  }

  restoreSession(): Promise<boolean> {
    // check storage for token
    let fromCache = localStorage.getItem(TOKEN_CACHE_KEY);
    if (!fromCache) {
      return Promise.resolve(false);
    }

    // make http for current profile

    return new Promise((resolve) => {
      this.getCurrentUserProfile()
        .subscribe((profile: Profile) => {
          this._currentUser.next(profile);

          resolve(!!profile);
        });
    });
  }

  private getCurrentUserProfile() {
    let profile: Profile = {
      token: 'super-secret-token',
      firstName: 'voislav',
      lastName: 'Mishevski',
      username: 'voislav.mishevski',
      roles: ['users-view', 'users-edit']
    };

    return Observable.of(profile);
  }
}
