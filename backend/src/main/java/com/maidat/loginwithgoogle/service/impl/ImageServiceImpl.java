package com.maidat.loginwithgoogle.service.impl;

import com.maidat.loginwithgoogle.model.ImageProduct;
import com.maidat.loginwithgoogle.repo.ImageRepository;
import com.maidat.loginwithgoogle.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class ImageServiceImpl implements ImageService {

    @Autowired
    ImageRepository imageRepository;

    private final Path root = Paths.get("uploads");

    @Override
    public void init() {
        try{
            if (Files.notExists(root)) {
                Files.createDirectory(root);
            }
        }catch (IOException e){
            throw new RuntimeException("Could not initialize folder for upload!");
        }

    }

    @Override
    public void saveImage(MultipartFile file) {
        try{
            Files.copy(file.getInputStream(), this.root.resolve(file.getOriginalFilename()));

        }catch (Exception e){
            throw new RuntimeException("Could not store the file. Error: " +  e.getMessage());
        }

    }

    @Override
    public ImageProduct save(ImageProduct imageProduct) {
        return imageRepository.save(imageProduct);
    }

    @Override
    public Resource load(String filename) {
        try {
            Path file = root.resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @Override
    public List<ImageProduct> loadAll() {
        return imageRepository.findAll();
    }

    @Override
    public void deleteFile(String fileName) throws IOException {
        Path file = root.resolve(fileName);
        FileSystemUtils.deleteRecursively(file);
    }

    @Override
    public String deleteImage(Long image_id) throws IOException {
        String message = "";
        Optional<ImageProduct> imageProduct = imageRepository.findById(image_id);
        if (imageProduct.isPresent()){
            deleteFile(imageProduct.get().getName());
            imageRepository.deleteById(image_id);
            message = "delete image thành công";
        }else {
            message = "ảnh đã cho không tồn tại";
        }
        return message;
    }
}
