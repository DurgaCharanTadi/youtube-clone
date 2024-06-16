package com.dct.youtube_clone.controller;

import com.dct.youtube_clone.dto.UploadVideoResponse;
import com.dct.youtube_clone.dto.VideoDTO;
import com.dct.youtube_clone.service.VideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/videos")
@RequiredArgsConstructor
public class VideoController {

    private VideoService videoService;

    @Autowired
    public VideoController(VideoService videoService) {
        this.videoService = videoService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UploadVideoResponse uploadVideo(@RequestParam("file") MultipartFile data) throws IOException {
        return videoService.uploadVideo(data);
    }

    @PostMapping("/thumbnail")
    @ResponseStatus(HttpStatus.CREATED)
    public UploadVideoResponse uploadVideoThumbnail(@RequestParam("file") MultipartFile data, @RequestParam("videoId") String videoId) throws IOException {
        return videoService.uploadVideoThumbnail(data, videoId);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public VideoDTO editVideoMetaData(@RequestBody VideoDTO videoDTO){
        return videoService.editVideo(videoDTO);
    }

    @GetMapping("/{videoId}")
    @ResponseStatus(HttpStatus.OK)
    public VideoDTO getVideoById(@PathVariable String videoId){
        return videoService.getVideoDetails(videoId);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<VideoDTO> getAllVideos(){
        return videoService.getAllVideos();
    }

}
