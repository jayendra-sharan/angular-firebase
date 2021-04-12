import { NgModule } from '@angular/core';
import { UserService } from './user.service';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserListItemComponent } from './user-list-item/user-list-item.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { PostModule } from '../post/post.module';

const routes: Routes = [
  {
    path: 'me',
    component: UserDashboardComponent,
    data: {
      title: 'My Profile'
    }
  },
  {
    path: 'users',
    component: UserListComponent,
    data: {
      title: 'Users'
    }
  },
  {
    path: 'users/:id',
    component: UserDetailComponent,
    data: {
      title: 'Profile'
    }
  },
]

@NgModule({
  declarations: [
    UserDashboardComponent,
    UserDetailComponent,
    UserListComponent,
    UserListItemComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    PostModule
  ],
  exports: [
    UserListItemComponent
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
