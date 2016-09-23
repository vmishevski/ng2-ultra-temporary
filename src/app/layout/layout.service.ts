import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class LayoutManager {
  width$: Observable<number>;
  height$: Observable<number>;

  state: any = {
    header: new BehaviorSubject<boolean>(true),
    sidebar: new BehaviorSubject<boolean>(false),
    page: new BehaviorSubject<string>('compact'),
    view: new BehaviorSubject<string>('grid'),
    breakpoint: new BehaviorSubject<string>('xs')
  };

  breakpoints: any = {
    xs: 320,
    sm: 544,
    md: 768,
    lg: 992,
    xl: 1200
  };

  constructor() {
    let windowSize$ = new BehaviorSubject(this.getWindowSize());
    this.width$ = (windowSize$.pluck('width') as Observable<number>).distinctUntilChanged();
    this.height$ = (windowSize$.pluck('height') as Observable<number>).distinctUntilChanged();

    Observable.fromEvent(window, 'resize')
      .map(this.getWindowSize)
      .subscribe(windowSize$);

    this.width$.subscribe(value => {
      this.setActiveBreakpoint();
    });

    let initialBreakpoint = this.getBreakpoint();
    this.state.breakpoint.next(initialBreakpoint);
    if (initialBreakpoint !== 'sm' && initialBreakpoint !== 'xs') {
      this.state.sidebar.next(true);
    }
  }

  toggle(name: string = 'sidebar'): void {
    this.state[name].next(!this.state[name].getValue());
  };

  pageSize(size: string): void {
    this.state.page.next(size);
  };

  pageView(type: string): void {
    this.state.view.next(type);
  };

  getWindowSize(): any {
    return {
      height: window.innerHeight,
      width: window.innerWidth
    };
  };

  getBreakpoint(): any {
    let viewportWidth = window.innerWidth;
    let activeBreakpoint;

    for (let breakpoint in this.breakpoints) {
      if (viewportWidth > this.breakpoints[breakpoint]) {
        activeBreakpoint = breakpoint;
      }
    };
    return activeBreakpoint;
  };

  setActiveBreakpoint(): any {
    this.state.breakpoint.next(this.getBreakpoint());
  };

  currentState(): any {
    return {
      sidebar: this.state.sidebar.getValue(),
      header: this.state.header.getValue(),
      page: this.state.page.getValue(),
      view: this.state.view.getValue()
    };
  };
}
