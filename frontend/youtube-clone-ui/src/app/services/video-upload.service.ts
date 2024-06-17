import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UploadVideoResponse} from "../components/video-upload/UploadVideoResponse";
import {videoDTO} from "../components/save-video-details/videoDTO";

@Injectable({
  providedIn: 'root'
})
export class VideoUploadService {

  constructor(private httpClient: HttpClient) { }

  videoUpload(file: File): Observable<UploadVideoResponse>{
    const formData = new FormData()
    formData.append('file', file, file.name);

    return this.httpClient.post<UploadVideoResponse>("https://youtube-clone-backend-mmfl.onrender.com/api/videos", formData);
  }

  thumbnailUpload(file: File, videoId: string): Observable<string>{
    console.log("Inside thumbnailUpload: " + videoId);
    const formData = new FormData()
    formData.append('file', file, file.name);
    formData.append('videoId', videoId);

    return this.httpClient.post("https://youtube-clone-backend-mmfl.onrender.com/api/videos/thumbnail", formData,{
      responseType: 'text'
    });
  }

  getVideoDetails(videoId: string): Observable<videoDTO>{
    return this.httpClient.get<videoDTO>("https://youtube-clone-backend-mmfl.onrender.com/api/videos/"+videoId);
  }

  saveVideoMetaData(videoMetaData: videoDTO): Observable<videoDTO> {
    return this.httpClient.put<videoDTO>("https://youtube-clone-backend-mmfl.onrender.com/api/videos", videoMetaData);
  }

  getAllVideos(): Observable<videoDTO[]>{
    return this.httpClient.get<videoDTO[]>("https://youtube-clone-backend-mmfl.onrender.com/api/videos");
  }
}
