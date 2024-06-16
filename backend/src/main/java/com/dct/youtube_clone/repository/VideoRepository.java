package com.dct.youtube_clone.repository;

import com.dct.youtube_clone.model.Video;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface VideoRepository extends MongoRepository<Video, String> {
}
