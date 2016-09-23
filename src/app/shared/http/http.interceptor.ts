import { Injectable } from '@angular/core';
import { Http, XHRBackend, Request, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class HttpInterceptor extends Http {
  constructor(
    backend: XHRBackend,
    defaultOptions: RequestOptions
  ) {
    super(backend, defaultOptions);
    console.log('Interceptor initialized');
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    console.log('Before the request...');
    return super.request(url, options)
        .catch((err: any): any => {
          return Observable.empty();
        })
        .retryWhen(error => error.delay(500))
        .timeout(2000, new Error('delay exceeded'))
        .finally(() => {
          console.log('After the request...');
        });
  };
  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    console.log('get...');
    return super.get(url, options)
        .catch((err: any): any => {
          return Observable.empty();
        })
        .finally(() => {
          console.log('After the request...');
        })
  }
}