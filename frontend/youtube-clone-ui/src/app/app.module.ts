import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VideoUploadComponent } from './components/video-upload/video-upload.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgxFileDropModule} from "ngx-file-drop";
import {MatButtonModule} from "@angular/material/button";
import { SaveVideoDetailsComponent } from './components/save-video-details/save-video-details.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import {VgCoreModule} from "@videogular/ngx-videogular/core";
import {VgControlsModule} from "@videogular/ngx-videogular/controls";
import {VgOverlayPlayModule} from "@videogular/ngx-videogular/overlay-play";
import {VgBufferingModule} from "@videogular/ngx-videogular/buffering";
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { HeaderComponent } from './components/header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {AuthModule, StsConfigLoader} from "angular-auth-oidc-client";
import { VideoDetailsComponent } from './components/video-details/video-details.component';
import { HomeComponent } from './components/home/home.component';
import {MatCardModule} from "@angular/material/card";

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    VideoUploadComponent,
    SaveVideoDetailsComponent,
    VideoPlayerComponent,
    HeaderComponent,
    VideoDetailsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgxFileDropModule,
    MatButtonModule,
    FlexLayoutModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    MatSnackBarModule,
    MatToolbarModule,
    AuthModule.forRoot({
      config: {
        authority: 'https://dev-nxh607qdpzu4gfqp.us.auth0.com',
        redirectUrl: window.location.origin,
        clientId: 'N4zkiGisTAiM6sopqR225Js95ZBdzGVX',
        scope: 'openid profile offline_access',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true
      },
    }),
    MatCardModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
