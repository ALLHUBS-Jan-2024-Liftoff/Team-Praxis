package org.teampraxis.BarkBook_API.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.teampraxis.BarkBook_API.models.Image;
import org.teampraxis.BarkBook_API.repositories.ImageRepository;
import org.teampraxis.BarkBook_API.util.ImageUtils;

import java.io.IOException;
import java.util.Optional;

@Service
public class StorageService {

    @Autowired
    private ImageRepository imageRepository;


    // uploads and compresses image before storing to DB
    public String uploadImage(MultipartFile file) throws IOException {
        Image image = imageRepository.save(Image.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .imageData(ImageUtils.compressImage(file.getBytes())).build());
        return "file uploaded successfully : " + file.getOriginalFilename();
    }

    // downloads and decompresses image
    public byte[] downloadImage(String fileName) {
        Optional<Image> dbImage = imageRepository.findByName(fileName);
        byte[] images=ImageUtils.decompressImage(dbImage.get().getImageData());
        return images;
    }
}
