package com.maidat.loginwithgoogle.controller;

import com.maidat.loginwithgoogle.model.ImageProduct;
import com.maidat.loginwithgoogle.repo.ImageRepository;
import com.maidat.loginwithgoogle.service.ImageService;
import com.maidat.loginwithgoogle.service.StorageService;
import com.maidat.loginwithgoogle.util.response.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/image")
public class ImageController {

    @Autowired
    ImageService imageService;

    @Autowired
    ImageRepository imageRepository;
    @Autowired
    private StorageService service;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam(value = "file") MultipartFile file) {
        String fileName = service.uploadFile(file);
        ImageProduct imageProduct = new ImageProduct(fileName, "https://thucphamoishii.s3.amazonaws.com/" + fileName);

        return new ResponseEntity(imageRepository.save(imageProduct), HttpStatus.OK);
    }

    @GetMapping("/files")
    public ResponseEntity<List<ImageProduct>> getListFiles() {
        List<ImageProduct> fileInfos = imageService.loadAll();
        return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
    }

    @GetMapping("/getByStatus")
    public ResponseEntity<?> getImageByStatus(@RequestParam Integer status){
        Set<ImageProduct> imageProductSet = imageRepository.findImageStatus(status);
        if (imageProductSet.size() > 0){
            return ResponseEntity.ok(imageProductSet);
        }else{
            return ResponseEntity.ok(new ResponseMessage("Not found image"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleImg(@PathVariable("id") Long id){
        Optional<ImageProduct> imageProduct = imageRepository.findById(id);
        if (imageProduct.isPresent()){
            service.deleteFile(imageProduct.get().getName());
            imageRepository.deleteById(id);
        }else {
            throw new UsernameNotFoundException("not found image id: "+id);
        }
        return ResponseEntity.ok(new ResponseMessage("delete ok!"));
    }

}
