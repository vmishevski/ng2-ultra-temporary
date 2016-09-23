import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { RestService } from '../shared/rest/rest.service';
import { ActivatedRoute } from '@angular/router';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Injectable()
export class UserService {
  constructor (private route: ActivatedRoute) {
    console.log(route.params);
  }
};