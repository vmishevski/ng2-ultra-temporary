import { Directive, HostListener, Input } from '@angular/core';
import { LayoutManager } from '../../layout';

@Directive({
 selector: '[ult-page-size]'
})
export class PageSize {
  @Input('ult-page-size') pageSize: string;

  @HostListener('click') setPageSize() {
    console.log(this.pageSize);
    this.layoutManager.pageSize(this.pageSize);
  }

  constructor(
    public layoutManager: LayoutManager
  ) {}

  ngOnInit() {
  }
}
