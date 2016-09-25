import { Routes, RouterModule } from '@angular/router';
import { Home } from './home';
import { About } from './about';
import { NoContent } from './no-content';

import { DataResolver } from './app.resolver';
import { PermissionGuard, LoginComponent, AuthenticateGuard } from './shared';

export const ROUTES: Routes = [
  {
    path: '',
    canActivateChild: [PermissionGuard],
    children: [
      { path: '',      component: Home },
      { path: 'home',  component: Home },
      { path: 'about', component: About },
      {
        path: 'detail', loadChildren: () => System.import('./+detail')
      },
      {
        path: 'users', loadChildren: () => System.import('./users')
      },
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'onlyauthorized', component: Home, canActivate: [AuthenticateGuard]
      },
      {
        path: 'haspermission', component: Home, data: {permissions: {only: 'users-view'}}
      },
      {
        path: 'notpermission', component: Home, data: {permissions: {only: 'trololo'}}
      },
      { path: '**',    component: NoContent }
    ]
  }
];
