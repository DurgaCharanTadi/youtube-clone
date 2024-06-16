package com.dct.youtube_clone.service;

import com.dct.youtube_clone.dto.UploadVideoResponse;
import com.dct.youtube_clone.dto.VideoDTO;
import com.dct.youtube_clone.model.Video;
import com.dct.youtube_clone.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VideoService {

    private final S3Service s3Service;
    private final VideoRepository videoRepository;

    public UploadVideoResponse uploadVideo(MultipartFile multipartFile) throws IOException {
        //Upload to S3
        String videoURL = s3Service.uploadFile(multipartFile);
        var video = new Video();
        video.setVideoUrl(videoURL);

        System.out.println("videoURL: "+ video.getVideoUrl());

        //Save to Database
        var savedVideo = videoRepository.save(video);

        return new UploadVideoResponse(savedVideo.getId(), savedVideo.getVideoUrl());
    }

    public VideoDTO editVideo(VideoDTO videoDTO) {
        //Find the Video to Edit
        Video savedVideo = videoRepository.findById(videoDTO.getId())
                .orElseThrow(() -> new IllegalArgumentException("Cannot find the video with Id "+videoDTO.getId()));

        //Map all the required fields
        savedVideo.setTitle(videoDTO.getTitle());
        savedVideo.setDescription(videoDTO.getDescription());
        savedVideo.setTags(videoDTO.getTags());
        savedVideo.setVideoStatus(videoDTO.getVideoStatus());

        //save the video metadata
        videoRepository.save(savedVideo);

        System.out.println("Inside editVideo savedVideo: " + savedVideo);

        return videoDTO;
    }

    public UploadVideoResponse uploadVideoThumbnail(MultipartFile data, String videoId) throws IOException {
        //Find the Video to Edit
        Video savedVideo = videoRepository.findById(videoId)
                .orElseThrow(() -> new IllegalArgumentException("Cannot find the video with Id "+videoId));
        //Upload to S3
        String ThumbnailURL = s3Service.uploadFile(data);
        System.out.println("Inside uploadVideoThumbnail ThumbnailURL: " + ThumbnailURL);
        savedVideo.setThumbnailUrl(ThumbnailURL);

        System.out.println("savedVideo: " + savedVideo);

        //Save to Database
        videoRepository.save(savedVideo);

        return new UploadVideoResponse(savedVideo.getId(), savedVideo.getThumbnailUrl());
    }

    public VideoDTO getVideoDetails(String videoId) {
        Video savedVideo = videoRepository.findById(videoId)
                .orElseThrow(() -> new IllegalArgumentException("Cannot find the video with Id "+videoId));

        VideoDTO videoDTO = new VideoDTO();
        videoDTO.setId(savedVideo.getId());
        videoDTO.setTitle(savedVideo.getTitle());
        videoDTO.setDescription(savedVideo.getDescription());
        videoDTO.setTags(savedVideo.getTags());
        videoDTO.setThumbnailUrl(savedVideo.getThumbnailUrl());
        videoDTO.setVideoStatus(savedVideo.getVideoStatus());
        videoDTO.setVideoUrl(savedVideo.getVideoUrl());

        return videoDTO;
    }

    public List<VideoDTO> getAllVideos() {
        List<Video> videosList = videoRepository.findAll();
        List<VideoDTO> videoDTOList = new ArrayList<>();

        for (Video video : videosList) {
            VideoDTO videoDTO = new VideoDTO();

            videoDTO.setId(video.getId());
            videoDTO.setTitle(video.getTitle());
            videoDTO.setDescription(video.getDescription());
            videoDTO.setThumbnailUrl(video.getThumbnailUrl());
            videoDTO.setVideoStatus(video.getVideoStatus());
            videoDTO.setVideoUrl(video.getVideoUrl());

            videoDTOList.add(videoDTO);
        }

        return videoDTOList;
    }
}
