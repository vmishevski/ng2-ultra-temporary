import { Authenticator, TOKEN_CACHE_KEY } from './authentication.service';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { async } from '@angular/core/testing';
import { Profile } from './profile.model';

describe('authentication.service', () => {
  let authenticator: Authenticator;

  beforeEach(() => {
    authenticator = new Authenticator(new Http(new MockBackend(), new BaseRequestOptions()));
  });

  it('should remove token from cache on logout', () => {
    localStorage.setItem(TOKEN_CACHE_KEY, 'test-value');

    authenticator.logout();

    expect(localStorage.getItem(TOKEN_CACHE_KEY)).toBeFalsy();
  });

  describe('login', () => {
    it('should emmit new user on success login', (done) => {
      authenticator.currentUser
        .timeout(200)
        .subscribe(done);

      authenticator.login('voislav', 'super-secret-pass');
    });

    it('should save token in storage after success login', (done) => {
      localStorage.removeItem(TOKEN_CACHE_KEY);
      authenticator.currentUser
        .subscribe((profile: Profile) => {
          if (!!profile) {
            expect(localStorage.getItem(TOKEN_CACHE_KEY)).toBeTruthy();

            done();
          }
        });

      authenticator.login('voislav', 'super-secret-pass');
    });
  });
});
