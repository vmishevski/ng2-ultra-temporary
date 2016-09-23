import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { RestService } from '../shared/rest/rest.service';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from './user.model';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Component } from '@angular/core';

@Component({
  selector: 'user',
  template: `
    <ult-heading>
      <ult-heading-title>Single User</ult-heading-title>
      <ult-heading-actions>
        <button class="btn btn-primary">Actions</button>
      </ult-heading-actions>
    </ult-heading>
    <ult-page>
      <router-outlet>
        {{user | async | json}}
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
export class UserComponent {
  user: User;
  constructor (
    public restService: RestService,
    private route: ActivatedRoute
    ) {
    this.route.params.forEach((params: Params) => {
      let id = +params['id']; // (+) converts string 'id' to a number
      this.user = this.restService.get(id);
    });
  }

  ngOnInit() {
    console.log('hello `User` component');
  }
};