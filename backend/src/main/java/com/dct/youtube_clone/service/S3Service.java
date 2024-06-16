package com.dct.youtube_clone.service;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.*;

@Service
@RequiredArgsConstructor
public class S3Service{

    private final static String ACCESS_KEY = "AKIA3FLDZQ7ZXBMNKRFV";
    private final static String SECRET_KEY = "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";
    private final static String BUCKET_NAME = "youtubeclone123";

    public String uploadFile(MultipartFile multipartFile) throws IOException {
        String fileName = multipartFile.getOriginalFilename();
        byte[] fileBytes = multipartFile.getBytes();

        return uploadNewVideo(fileName, fileBytes, ACCESS_KEY, SECRET_KEY, BUCKET_NAME);
    }

    public String uploadNewVideo(String FileName, byte[] fileBytes, String accessKey, String secretKey, String bucket){
        AmazonS3 s3Client = aws3ClientBuilder(accessKey,secretKey);

        File file = new File(FileName);

        try(OutputStream outputStream = new FileOutputStream(file)){
            outputStream.write(fileBytes);
        }catch(IOException e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "An Exception occurred while uploading a file");
        }

        s3Client.putObject(bucket, FileName, file);

        return s3Client.getUrl(BUCKET_NAME, FileName).toExternalForm();
    }

    private AmazonS3 aws3ClientBuilder(String accessKey, String secretKey) {
        return AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials(accessKey,secretKey)))
                .withRegion(Regions.US_EAST_1)
                .build();
    }

    private AWSCredentials awsCredentials(String accessKey, String secretKey) {
        return new BasicAWSCredentials(accessKey, secretKey);
    }
}
