import {Component, inject, signal} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatChipEditedEvent, MatChipInputEvent} from "@angular/material/chips";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {VideoUploadService} from "../../services/video-upload.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {videoDTO} from "./videoDTO";

export interface tag {

}

@Component({
  selector: 'app-save-video-details',
  templateUrl: './save-video-details.component.html',
  styleUrls: ['./save-video-details.component.css']
})
export class SaveVideoDetailsComponent {

  constructor(private videoUploadService: VideoUploadService,
              private activateRoute: ActivatedRoute,
              private matSnackBar: MatSnackBar,
              private router:Router) {
    this.videoId = this.activateRoute.snapshot.params['videoId'];
    this.videoUploadService.getVideoDetails(this.videoId).subscribe(
      data => {
        this.videoUrl = data.videoUrl
        this.thumbnailUrl = data.thumbnailUrl
        this.videoAvailable = true;
        console.log(this.videoUrl);
      }
    );

    this.saveVideoDetailsForm = new FormGroup<any>({
      title : this.title,
      description: this.description,
      videoStatus: this.videoStatus
    })
  }
  saveVideoDetailsForm: FormGroup;

  title: FormControl = new FormControl('');
  description: FormControl = new FormControl('');
  videoStatus: FormControl = new FormControl('');

  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly tags = signal<tag[]>([]);
  readonly announcer = inject(LiveAnnouncer);

  selectedFile!: File;
  selectedFileName!: string;
  videoId!: string;
  videoUrl!: string;
  thumbnailUrl!: string;

  thumbnailSelected: boolean = false;
  videoAvailable: boolean = false;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      console.log("Inside add events");
      this.tags.update(tag => [...tag, value]);
    }

    // Clear the input value
   event.chipInput!.clear();
  }

  remove(tag: tag): void {
    this.tags.update(tags => {
      const index = tags.indexOf(tag);
      if (index < 0) {
        return tags;
      }

      tags.splice(index, 1);
      this.announcer.announce(`Removed ${tag}`);
      return [...tags];
    });
  }

  edit(fruit: tag, event: MatChipEditedEvent) {
    const value = event.value;

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(fruit);
      return;
    }

    // Edit existing fruit
    this.tags.update(tags => {
      const index = tags.indexOf(fruit);
      if (index >= 0) {
        tags[index] = value;
        return [...tags];
      }
      return tags;
    });
  }

  onFileSelected($event: Event) {
    // @ts-ignore
    this.selectedFile = $event.target.files[0];
    this.selectedFileName = this.selectedFile.name;

    this.thumbnailSelected = true;

    console.log(this.selectedFileName);
  }

  uploadThumbnail() {
    this.videoId = this.activateRoute.snapshot.params['videoId'];
    console.log("Inside uploadThumbnail(): "+this.videoId);
    this.videoUploadService.thumbnailUpload(this.selectedFile, this.videoId).subscribe(data=> {
      console.log(data);
      this.matSnackBar.open("Thumbnail uploaded successfully", "OK");
    });

  }

  saveVideoDetails() {
    console.log("this.thumbnailUrl: " + this.thumbnailUrl);
    // @ts-ignore
    const videoMetaData: videoDTO = {
      "id": this.videoId,
      "title": this.saveVideoDetailsForm.get('title')?.value,
      "description": this.saveVideoDetailsForm.get('description')?.value,
      "tags": this.tags,
      "videoUrl": this.videoUrl,
      "thumbnailUrl": this.thumbnailUrl,
      "videoStatus": this.saveVideoDetailsForm.get('videoStatus')?.value
    }
    this.videoUploadService.saveVideoMetaData(videoMetaData).subscribe(data => {
      this.matSnackBar.open("Video Metadata uploaded successfully", "OK");
      this.router.navigateByUrl("/video-details/"+data.id);
    });
  }
}
