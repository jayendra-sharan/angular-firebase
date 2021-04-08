import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthModule } from '../auth/auth.module';
import { AuthService } from './auth.service';

import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireStorageModule } from "angularfire2/storage";
import { AngularFireAuthModule } from "angularfire2/auth";

@NgModule({
  imports: [
    AuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
  ],
  declarations: [],
  providers: [
    AuthService
  ]
})
export class CoreModule { }
