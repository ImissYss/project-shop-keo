package com.maidat.loginwithgoogle.service.impl;

import com.maidat.loginwithgoogle.dto.InfoShopDTO;
import com.maidat.loginwithgoogle.dto.ProductDto;
import com.maidat.loginwithgoogle.dto.ProductOfListDTO;
import com.maidat.loginwithgoogle.enums.ImageStatus;
import com.maidat.loginwithgoogle.enums.NotificationStatusEnum;
import com.maidat.loginwithgoogle.enums.ProductStatusEnum;
import com.maidat.loginwithgoogle.enums.ResultEnum;
import com.maidat.loginwithgoogle.exception.MyException;
import com.maidat.loginwithgoogle.model.*;
import com.maidat.loginwithgoogle.repo.*;
import com.maidat.loginwithgoogle.service.LocalUserDetailService;
import com.maidat.loginwithgoogle.service.ProductInfoService;
import com.maidat.loginwithgoogle.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.*;

@Service
public class ProductServiceImpl implements ProductInfoService {
    @Autowired
    ProductInfoRepository productInfoRepository;

    @Autowired
    ImageRepository imageRepository;

    @Autowired
    MetaTagNameRepo metaTagNameRepo;

    @Autowired
    MetaTagRepo metaTagRepo;

    @Autowired
    NotificationRepository notificationRepository;

    @Autowired
    LocalUserDetailService localUserDetailService;

    @Autowired
    ImageServiceImpl imageService;

    @Autowired
    ShopInfoRepository shopInfoRepository;

    @Autowired
    StorageService service;

    @Override
    public ProductInfo addProduct(ProductDto productDto) {
        ProductInfo productInfo = new ProductInfo();
        productInfo.setProductName(productDto.getProductName());
        productInfo.setCode(productDto.getCode());
        productInfo.setProductPrice(new BigDecimal(productDto.getProductPrice()));
        productInfo.setProductDescription(productDto.getProductDescription());
        productInfo.setCategory(productDto.getCategory());
        productInfo.setDiscount(productDto.getDiscount());
        productInfo.setInformation(productDto.getInformation());
        productInfo.setCount(productDto.getCount());
        productInfo.setProductTutorial(productDto.getProductTutorial());
        productInfo.setMoreInformation(productDto.getMoreInformation());
        productInfo.setRating(5);
        productInfo.setSold(0);
        productInfo.setCountLike(0);
        productInfo.setViewCount(0);
        productInfo.setCountRating(1);
        productInfo.setCategoryName(productDto.getCategory().getCategoryName());
        productInfo.setMetaTagNames(productDto.getMetaTagNames());
        productInfo.setTitleSeo(productDto.getTitleSeo());
        productInfo.setMetaTags(productDto.getMetaTags());
        productInfo.setProductStatus(ProductStatusEnum.UP.getCode());

        productInfo.setImageProducts(productDto.getImageProducts());

        ProductInfo productInfo1 = productInfoRepository.save(productInfo);
        for (int i=0; i< productDto.getImageProducts().size(); i++){
            productDto.getImageProducts().get(i).setImageStatus(ImageStatus.DOWN.getCode());
            productDto.getImageProducts().get(i).setProduct(productInfo1);
            imageRepository.save(productDto.getImageProducts().get(i));
        }
        for (int i=0; i< productDto.getMetaTagNames().size();i++){
            MetaTagName metaTagName = new MetaTagName();
            productDto.getMetaTagNames().get(i).setSeo(productInfo1);
            metaTagNameRepo.save(productDto.getMetaTagNames().get(i));
        }
        for (int i=0; i< productDto.getMetaTags().size();i++){
            productDto.getMetaTags().get(i).setSeo(productInfo1);
            metaTagRepo.save(productDto.getMetaTags().get(i));
        }
        return productInfo1;
    }

    @Override
    public ProductInfo getProductById(Long product_id) {

        ProductInfo productInfo = productInfoRepository.findByProductId(product_id)
                .orElseThrow(() -> new UsernameNotFoundException("Not Found Product!"));

        productInfo.setViewCount(productInfo.getViewCount() + 1);
        productInfoRepository.save(productInfo);
        return productInfo;
    }

    @Override
    public List<ProductOfListDTO> getProductByCategory(String category_id) {
        return productInfoRepository.findByCategory(category_id);
    }

    @Override
    public Page<ProductOfListDTO> getAllProduct(Pageable pageable) {
        return productInfoRepository.findAllProduct(pageable);
    }

    @Override
    public ProductInfo updateReviewCount(ProductInfo productInfo, Integer rating) {
        productInfo.setCountRating(productInfo.getCountRating() + 1);
        productInfo.setRating((productInfo.getRating() + rating)/productInfo.getCountRating());
        ProductInfo productInfo1 = productInfoRepository.save(productInfo);
        return productInfo1;
    }

    @Override
    public ProductInfo findOne(Long productId) {
        ProductInfo productInfo = productInfoRepository.findByProductId(productId).orElseThrow(() -> new UsernameNotFoundException("not found"));

        return productInfo;
    }

    @Override
    public void increaseStock(Long productId, int amount) {
        ProductInfo productInfo = productInfoRepository.findByProductId(productId)
                .orElseThrow(() -> new UsernameNotFoundException("Not found"));

        productInfo.setCount(productInfo.getCount() + amount);
        productInfoRepository.save(productInfo);

    }

    @Override
    public void decreaseStock(Long productId, int amount) {
        ProductInfo productInfo = productInfoRepository.findByProductId(productId)
                .orElseThrow(() -> new UsernameNotFoundException("NOT FOUND"));
        if (amount > productInfo.getCount()){
            throw new MyException(ResultEnum.PRODUCT_NOT_ENOUGH);
        }

        if (productInfo.getCount() - amount <= 3){
            Notification notification = new Notification();
            User user = localUserDetailService.loadUserByUsername("phamtruong@gmail.com").getUser();
            notification.setContent("San pham " + productInfo.getProductName() + "sap het hang");
            notification.setTitle(productInfo.getProductName());
            notification.setStatus(NotificationStatusEnum.UP.getCode());
            notification.setUsers(Set.of(user));
            user.setNotifications(Set.of(notification));
            notificationRepository.save(notification);
        }
        productInfo.setCount(productInfo.getCount() - amount);
        productInfoRepository.save(productInfo);
    }

    @Override
    public ProductInfo offSale(Long productId) {
        ProductInfo productInfo = productInfoRepository.findByProductId(productId)
                .orElseThrow(() -> new UsernameNotFoundException("NOT FOUND"));
        if (productInfo.getProductStatus() == ProductStatusEnum.DOWN.getCode()){
            throw new MyException(ResultEnum.PRODUCT_STATUS_ERROR);
        }
        productInfo.setProductStatus(ProductStatusEnum.DOWN.getCode());
        return productInfoRepository.save(productInfo);
    }

    @Override
    public ProductInfo onSale(Long productId) {
        ProductInfo productInfo = productInfoRepository.findByProductId(productId)
                .orElseThrow(() -> new UsernameNotFoundException("Not found"));

        if (productInfo.getProductStatus() == ProductStatusEnum.UP.getCode()){
            throw new MyException(ResultEnum.PRODUCT_STATUS_ERROR);
        }
        productInfo.setProductStatus(ProductStatusEnum.UP.getCode());

        return productInfoRepository.save(productInfo);
    }

    @Override
    public void soldProduct(Long productId, Integer soldCount) {
        ProductInfo productInfo = productInfoRepository.findByProductId(productId)
                .orElseThrow(() -> new UsernameNotFoundException("Not Found"));
        productInfo.setSold(soldCount);
        productInfoRepository.save(productInfo);
    }

    @Override
    public boolean checkProductEnough(Long productId, Integer quantity) {
        ProductInfo productInfo = productInfoRepository.findByProductId(productId)
                .orElseThrow(() -> new UsernameNotFoundException("Not Found"));
        if (productInfo.getCount() < quantity){
            return false;
        }
        return true;
    }

    @Override
    public Page<ProductOfListDTO> getProductsByCategoryParent(String categoryId, Pageable pageable, Long price1, Long price2) {
        return productInfoRepository.findProductsByCategoryParent(categoryId, pageable, price1, price2);
    }

    @Override
    public Page<ProductOfListDTO> getProductsByCategoryParentFilter(List<String> categories, Long price1, Long price2, Pageable pageable) {
        return productInfoRepository.findProductsByCategoryParentFilter(categories, price1, price2,pageable);
    }

    @Override
    public List<ProductOfListDTO> getListProductSame(String categoryName) {
        return productInfoRepository.getListProductSame(categoryName);
    }

    @Override
    public void deleteProduct(Long productId) {
        ProductInfo productInfo = productInfoRepository.findByProductId(productId).orElseThrow(() -> new UsernameNotFoundException("no product has id "+productId));
        List<ImageProduct> imageProducts = productInfo.getImageProducts();
        imageProducts.forEach(image -> {
            service.deleteFile(image.getName());
        });
        productInfoRepository.deleteById(productId);
    }

    @Override
    public List<ProductInfo> getSixProductBestView() {
        return productInfoRepository.getSixProductBestView();
    }

    @Override
    public Page<ProductOfListDTO> getProductSearchResult(String textSearch, Pageable pageable, Long price1, Long price2) {
        return productInfoRepository.getProductSearchResult(textSearch, pageable, price1, price2);
    }

    @Override
    public InfoShop createInfoShop(InfoShopDTO infoShopDTO) {
        InfoShop infoShop = new InfoShop();
        infoShop.setName(infoShopDTO.getName());
        infoShop.setAddress(infoShopDTO.getAddress());
        infoShop.setDescription(infoShopDTO.getDescription());
        infoShop.setGmail(infoShopDTO.getGmail());
        infoShop.setIntroduce(infoShopDTO.getIntroduce());
        infoShop.setLinkShoppe(infoShopDTO.getLinkShoppe());
        infoShop.setLinkFanpage(infoShopDTO.getLinkFanpage());
        infoShop.setLinkMap(infoShopDTO.getLinkMap());
        infoShop.setPhone(infoShopDTO.getPhone());
        infoShop.setLinkZalo(infoShopDTO.getLinkZalo());
        infoShop.setLogo(infoShopDTO.getLogo());
        infoShop.setLinkMessage(infoShopDTO.getLinkMessage());
        infoShop.setLinkGoogleMap(infoShopDTO.getLinkGoogleMap());
        infoShop.setImgDescription(infoShopDTO.getImgDescription());

        InfoShop infoShop1 = shopInfoRepository.save(infoShop);
        for (int i=0; i< infoShopDTO.getLogo().size(); i++){
            infoShopDTO.getLogo().get(i).setImageStatus(ImageStatus.DOWN.getCode());
            infoShopDTO.getLogo().get(i).setTpshop(infoShop);
            imageRepository.save(infoShopDTO.getLogo().get(i));
        }

        for (int i=0; i< infoShopDTO.getImgDescription().size(); i++){
            infoShopDTO.getImgDescription().get(i).setImageStatus(ImageStatus.DOWN.getCode());
            infoShopDTO.getImgDescription().get(i).setImgDescription(infoShop);
            imageRepository.save(infoShopDTO.getImgDescription().get(i));
        }
        return infoShop1;
    }

}
