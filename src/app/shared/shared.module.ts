import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { FromNowPipe } from './from-now.pipe';
import { UploadComponent } from './upload/upload.component';
import { UploadService } from './upload/upload.service';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    FromNowPipe,
    UploadComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FromNowPipe,
    UploadComponent,
    NavbarComponent
  ],
  providers: [
    UploadService
  ]
})
export class SharedModule { }
