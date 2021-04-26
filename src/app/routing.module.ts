import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full'},
  { path: '', loadChildren: './chat/chat.module#ChatModule'},
  { path: '', loadChildren: './gallery/gallery.module#GalleryModule'},
  { path: '', loadChildren: './auth/auth.module#AuthModule' },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [ RouterModule ]
})
export class RoutingModule { }
