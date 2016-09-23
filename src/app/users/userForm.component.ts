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
      <ult-heading-title>New User</ult-heading-title>
      <ult-heading-actions>
        <button class="btn btn-primary">Actions</button>
      </ult-heading-actions>
    </ult-heading>
    <ult-page>
      <form (submit)="save()">      
        <input type="text" [(ngModel)]="user.name" name="name" />
        <input type="submit" value="Save" />
      </form>
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
export class UserFormComponent {
  user: User = {};
  constructor (
    public restService: RestService,
    private route: ActivatedRoute
    ) {
  }

  save(): any {
    this.restService.post(this.user);
  };

  ngOnInit() {
  }
};