package com.maidat.loginwithgoogle.controller;

import com.maidat.loginwithgoogle.dto.InfoShopDTO;
import com.maidat.loginwithgoogle.enums.ImageStatus;
import com.maidat.loginwithgoogle.messages.ResponseMessage;
import com.maidat.loginwithgoogle.model.ImageProduct;
import com.maidat.loginwithgoogle.model.InfoShop;
import com.maidat.loginwithgoogle.repo.ImageRepository;
import com.maidat.loginwithgoogle.repo.ShopInfoRepository;
import com.maidat.loginwithgoogle.service.impl.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/infoShop")
public class InfoShopController {

    @Autowired
    ShopInfoRepository shopInfoRepository;

    @Autowired
    ProductServiceImpl productService;

    @Autowired
    ImageRepository imageRepository;

    @GetMapping("/getAllInfoShop")
    public ResponseEntity<?> getAllInfoShop(){
        return ResponseEntity.ok(shopInfoRepository.findAll());
    }

    @PostMapping("/createInfoShop")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> createInfoShop(@RequestBody InfoShopDTO infoShop){
        InfoShop infoShop1 = productService.createInfoShop(infoShop);
        return ResponseEntity.ok(infoShop1);
    }

    @PutMapping("/updateInfoShop")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateNews(@RequestBody InfoShop infoShop){
        List<ImageProduct> imageProducts = infoShop.getLogo();
        imageProducts.forEach(i -> {
            i.setTpshop(infoShop);
            i.setImageStatus(ImageStatus.DOWN.getCode());
            imageRepository.save(i);
        });
        List<ImageProduct> imgDescription = infoShop.getImgDescription();
        imgDescription.forEach(i -> {
            i.setImgDescription(infoShop);
            i.setImageStatus(ImageStatus.DOWN.getCode());
            imageRepository.save(i);
        });
        return ResponseEntity.ok(shopInfoRepository.save(infoShop));
    }
}
