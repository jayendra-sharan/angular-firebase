import { NgModule } from '@angular/core';
import { GalleryListComponent } from './gallery-list/gallery-list.component';
import { GalleryDetailComponent } from './gallery-detail/gallery-detail.component';
import { GalleryService } from './gallery.service';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: 'gallery',
    component: GalleryListComponent,
  }, {
    path: 'gallery/:id',
    component: GalleryDetailComponent
  }, {
    path: 'users/:id/:id',
    component: GalleryDetailComponent
  }
];

@NgModule({
  declarations: [
    GalleryListComponent,
    GalleryDetailComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [GalleryService]
})
export class GalleryModule { }
