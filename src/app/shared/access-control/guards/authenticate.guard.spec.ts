import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs';

import { Authenticator } from '../authentication.service';
import { async } from '@angular/core/testing';
import { AuthenticateGuard } from './authenticate.guard';

describe('authenticate.guard', () => {
  let authenticator: Authenticator;
  let guard: AuthenticateGuard;

  beforeEach(() => {
    authenticator = new Authenticator(new Http(new MockBackend(), new BaseRequestOptions()));
    guard = new AuthenticateGuard(authenticator);
  });

  it('should not be able to activate when not logged in', async(() => {
    let activate = <Observable<boolean>>guard.canActivate(null, null);
    activate.subscribe((canActivate: boolean) => {
      expect(canActivate).toEqual(false);
    });
  }));

  it('should activate when logged in', async(() => {
    authenticator.login('voislav', 'ok');

    let activate = <Observable<boolean>>guard.canActivate(null, null);
    activate.subscribe((canActivate: boolean) => {
      expect(canActivate).toEqual(true);
    });
  }));
});
