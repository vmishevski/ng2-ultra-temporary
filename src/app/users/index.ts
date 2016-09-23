import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';

import { UsersComponent } from './users.component';
import { UserComponent } from './user.component';
import { UserFormComponent } from './userForm.component';

console.log('`Users` bundle loaded asynchronously');
export const routes = [
  { path: '', component: UsersComponent, pathMatch: 'full' },
  { path: 'create', component: UserFormComponent, pathMatch: 'full' },
  { path: ':id', component: UserComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    UsersComponent,
    UserComponent,
    UserFormComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export default class UsersModule {
  static routes = routes;
}
