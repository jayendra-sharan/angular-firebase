import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { CoreModule } from './core/core.module';
import { RoutingModule } from './routing.module';
import { AngularFireModule } from "@angular/fire"
import { environment } from 'src/environments/environment';
import { PostModule } from './post/post.module';
import { ChatModule } from './chat/chat.module';
import { SharedModule } from './shared/shared.module';
import { GalleryModule } from './gallery/gallery.module';
import { RoutingGuard } from './routing.guard';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    SharedModule,
    CoreModule,
    RoutingModule,
    PostModule,
    GalleryModule,
    ChatModule
  ],
  providers: [RoutingGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
