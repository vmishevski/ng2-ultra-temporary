import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { async } from '@angular/core/testing';

import { Authenticator } from './authentication.service';
import { AuthorizationService, Permission } from './authorization.service';

describe('authorization.service', () => {
  let authenticator: Authenticator;
  let authorizationService: AuthorizationService;

  beforeEach(() => {
    let http = new Http(new MockBackend(), new BaseRequestOptions());
    authenticator = new Authenticator(http);
    authorizationService = new AuthorizationService(authenticator, http);
  });

  it('should load permissions of the authenticated user', async(() => {
    authenticator.login('voislav', 'ok');

    authorizationService.permissions.subscribe((permissions: Permission[]) => {
      expect(permissions.length).toBeGreaterThan(0);
    });
  }));
});
