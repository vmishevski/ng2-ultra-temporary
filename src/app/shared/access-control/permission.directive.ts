import { Directive } from '@angular/core/src/metadata/directives';
import { Input, OnInit, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { RoutePermissionsConfig } from './guards/route-permissions.model';
import { AuthorizationService } from './authorization.service';
import { Subject, Observable, Subscription } from 'rxjs';
import { AccessCalculator } from './has-access.service';

@Directive({
  selector: '[ultPermission]'
})
export class PermissionDirective implements OnInit, OnDestroy {
  private requiredPermissions: Subject<RoutePermissionsConfig>;
  private calculationSubscription: Subscription;

  constructor(private authorizationService: AuthorizationService,
              private accessCalc: AccessCalculator,
              private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
    this.requiredPermissions = new Subject<RoutePermissionsConfig>();
  }

  @Input() set ultPermission(value: RoutePermissionsConfig) {
    this.requiredPermissions.next(value);
  }

  ngOnInit(): void {
    this.calculationSubscription = Observable.combineLatest(this.authorizationService.permissions, this.requiredPermissions)
      .map(([allPermissions, requiredPermissions]) => {
        return this.accessCalc.hasAccess(requiredPermissions, allPermissions);
      })
      .subscribe((hasAccess: boolean) => {
        if (hasAccess) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      });
  }

  ngOnDestroy(): void {
    this.calculationSubscription.unsubscribe();
  }
}
