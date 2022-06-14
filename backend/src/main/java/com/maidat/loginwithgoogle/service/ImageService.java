package com.maidat.loginwithgoogle.service;

import com.maidat.loginwithgoogle.model.ImageProduct;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ImageService {
    void init();

    void saveImage(MultipartFile file);
    ImageProduct save(ImageProduct imageProduct);

    Resource load(String filename);

    List<ImageProduct> loadAll();

    void deleteFile(String file) throws IOException;

    String deleteImage(Long image_id) throws IOException;

}
