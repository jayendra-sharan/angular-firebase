import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: '', loadChildren: './auth/auth.module#AuthModule' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [ RouterModule ]
})
export class RoutingModule { }
