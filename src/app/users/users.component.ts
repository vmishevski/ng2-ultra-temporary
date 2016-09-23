import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { RestService } from '../shared/rest/rest.service';
import { User } from './user.model';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Component } from '@angular/core';

@Component({
  selector: 'users',
  template: `
    <ult-heading>
      <ult-heading-title>Users</ult-heading-title>
      <ult-heading-actions>
        <button class="btn btn-primary">Actions</button>
      </ult-heading-actions>
    </ult-heading>
    <ult-page>
      <router-outlet>
        <div *ngFor="let user of users | async">
          {{user | json}}
        </div>
      </router-outlet>
    </ult-page>
  `,
  providers: [
    {
      provide: RestService,
      useFactory: (http: Http) => new RestService(http, 'http://localhost:3334', 'users'),
      deps: [Http]
    }
  ]
})
export class UsersComponent {
  users: Observable<User[]>;
  constructor(
    public restService: RestService
  ) {
  }
  ngOnInit() {
    this.users = this.restService.get();
  }

};