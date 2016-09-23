import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export interface ServiceConfig {
  url: string;
  resource: string;
  requestUrl?: string;
};

@Injectable()
export class RestService {
  constructor (
    protected http: Http,
    protected url: string,
    protected resource: string
  ) {
  }

  get(resource?: any, params?: any): any {
    let url = `${this.url}/${this.resource}`;
    if (resource) {
      url = `${this.url}/${this.resource}/${resource}`;
    }
    return this.http.get(url, params)
          .map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  };

  post(params?: any): any {
    let url = `${this.url}/${this.resource}`;
    return this.http.post(url, params)
          .map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  };
}