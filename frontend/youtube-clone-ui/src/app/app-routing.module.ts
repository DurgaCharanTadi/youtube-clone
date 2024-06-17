import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VideoUploadComponent} from "./components/video-upload/video-upload.component";
import {SaveVideoDetailsComponent} from "./components/save-video-details/save-video-details.component";
import {VideoDetailsComponent} from "./components/video-details/video-details.component";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'video-upload', component: VideoUploadComponent
  },
  {
    path: 'save-video-details/:videoId', component: SaveVideoDetailsComponent
  },
  {
    path: 'video-details/:videoId', component: VideoDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
