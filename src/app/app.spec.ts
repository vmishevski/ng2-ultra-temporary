import {
  inject,
  TestBed
} from '@angular/core/testing';

// Load the implementations that should be tested
import { App } from './app.component';
import { AppState } from './app.service';
import { LayoutManager } from './layout/layout.service';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AppState,
      App,
      LayoutManager
    ]}));

  it('should compile', inject([ App ], (app) => {
    expect(true).toEqual(true);
  }));

});
