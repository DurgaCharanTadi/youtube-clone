import { Component } from '@angular/core';
import {VideoUploadService} from "../../services/video-upload.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.css']
})
export class VideoDetailsComponent {

  constructor(private videoUploadService: VideoUploadService,
              private activateRoute: ActivatedRoute,
              private matSnackBar: MatSnackBar,
              private router: Router) {
    this.videoId = this.activateRoute.snapshot.params['videoId'];
    this.videoUploadService.getVideoDetails(this.videoId).subscribe(
      data => {
        this.videoUrl = data.videoUrl
        this.thumbnailUrl = data.thumbnailUrl
        this.videoAvailable = true;
        this.videoTitle = data.title;
        this.videoDescription = data.description;
        console.log(this.videoUrl);
      }
    );
  }
  videoId: string;
  videoUrl!: string;
  thumbnailUrl!: string;
  videoAvailable: boolean = false;
  videoTitle!: string;
  videoDescription!: string;
}
