package com.maidat.loginwithgoogle.controller;

import com.maidat.loginwithgoogle.dto.ProductDto;
import com.maidat.loginwithgoogle.dto.ProductOfListDTO;
import com.maidat.loginwithgoogle.enums.ImageStatus;
import com.maidat.loginwithgoogle.messages.ResponseMessage;
import com.maidat.loginwithgoogle.model.*;
import com.maidat.loginwithgoogle.repo.*;
import com.maidat.loginwithgoogle.service.ProductInfoService;
import com.maidat.loginwithgoogle.service.impl.ImageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ReflectionUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.util.*;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    ProductInfoRepository productInfoRepository;

    @Autowired
    OptionLinkRepository optionLinkRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    ShopInfoRepository shopInfoRepository;

    @Autowired
    MetaTagRepo metaTagRepo;

    @Autowired
    MetaTagNameRepo metaTagNameRepo;

    @Autowired
    ImageServiceImpl imageService;

    @Autowired
    ProductInfoService productInfoService;

    @Autowired
    ImageRepository imageRepository;


    // lấy ra danh sách tất cả các sản phẩm cho trang home
    @GetMapping("/getAllProduct")
    public ResponseEntity<?> getAllProduct(@RequestParam(defaultValue = "18", required = false) int size,
                                           @RequestParam(defaultValue = "0", required = false) int page,
                                           @RequestParam String sort){
        List<ProductOfListDTO> productInfos = new ArrayList<>();
        List<Sort.Order> orders = new ArrayList<>();
        String[] _sort = sort.split(",");
        orders.add(new Sort.Order(getSortDirection(_sort[1]), _sort[0]));
        Pageable pageable = PageRequest.of(page, size, Sort.by(orders));
        Page<ProductOfListDTO> productInfoPage = productInfoService.getAllProduct(pageable);
        productInfos = productInfoPage.getContent();
        Map<String, Object> response = new HashMap<>();
        response.put("products", productInfos);
        response.put("currentPage", productInfoPage.getNumber());
        response.put("totalItems", productInfoPage.getTotalElements());
        response.put("totalPages", productInfoPage.getTotalPages());
        return ResponseEntity.ok(response);
    }

//    @GetMapping("/getAllProductForUser")
//    public ResponseEntity<?> getAllProductForUser(@RequestParam(defaultValue = "18", required = false) int size,
//                                           @RequestParam(defaultValue = "0", required = false) int page,
//                                           @RequestParam String sort){
//        List<ProductOfListDTO> productInfos = new ArrayList<>();
//        List<Sort.Order> orders = new ArrayList<>();
//        String[] _sort = sort.split(",");
//        orders.add(new Sort.Order(getSortDirection(_sort[1]), _sort[0]));
//        Pageable pageable = PageRequest.of(page, size, Sort.by(orders));
//        Page<ProductOfListDTO> productInfoPage = productInfoRepository.findAllProductForUser(pageable);
//        productInfos = productInfoPage.getContent();
//        Map<String, Object> response = new HashMap<>();
//        response.put("products", productInfos);
//        response.put("currentPage", productInfoPage.getNumber());
//        response.put("totalItems", productInfoPage.getTotalElements());
//        response.put("totalPages", productInfoPage.getTotalPages());
//        return ResponseEntity.ok(response);
//    }

    // thêm mới 1 sản phẩm
    @PostMapping("/addProduct")
    public ResponseEntity<?> addProduct(@RequestBody ProductDto productDto){
        ProductInfo productInfo = productInfoService.addProduct(productDto);
        return ResponseEntity.ok(productInfo);
    }

    // lấy ra thông tin sản phẩm theo id
    @GetMapping("/getProduct/{product_id}")
    public ResponseEntity<?> getProduct(@PathVariable("product_id") Long product_id){
        ProductInfo productInfo = productInfoService.getProductById(product_id);
        return ResponseEntity.ok(productInfo);
    }

    // lấy ra danh sách sản phẩm thuộc cùng 1 category con
    @GetMapping("/getProductByCategory/{category_id}")
    public ResponseEntity<?> getProductByCategory(@PathVariable("category_id") String category_id){
        List<ProductOfListDTO> productInfos = productInfoService.getProductByCategory(category_id);
        return ResponseEntity.ok(productInfos);
    }

    // chỉnh sửa thông tin sản phẩm
    @PutMapping(value = "/update")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateProduct(@RequestBody ProductInfo productInfo){
        List<ImageProduct> imageProducts = productInfo.getImageProducts();
        productInfo.getMetaTagNames().forEach(m -> {
            m.setSeo(productInfo);
            metaTagNameRepo.save(m);
        });
        productInfo.getMetaTags().forEach(m -> {
            m.setSeo(productInfo);
            metaTagRepo.save(m);
        });
        imageProducts.forEach(i -> {
            i.setProduct(productInfo);
            i.setImageStatus(ImageStatus.DOWN.getCode());
            imageRepository.save(i);
        });
        return ResponseEntity.ok(productInfoRepository.save(productInfo));
    }

    // lấy ra danh sách các sản phẩm của 1 category tổ tiên
    @GetMapping("/getProductsByCategoryParent/{category_id}")
    public ResponseEntity<?> getProductsByCategoryParent(@PathVariable("category_id") String category_id,
                                                         @RequestParam(defaultValue = "18") int size,
                                                         @RequestParam(defaultValue = "0") int page,
                                                         @RequestParam(defaultValue = "product_price, desc") String sort,
                                                         @RequestParam(required = false) List<String> categories,
                                                         @RequestParam(defaultValue = "0") Long price1,
                                                         @RequestParam(defaultValue = "50000000") Long price2){
        Optional<ProductCategory> category = categoryRepository.findByCategoryId(category_id);
        if (!category.isPresent()){
            throw new UsernameNotFoundException("not category found by id" + category_id);
        }
        List<ProductOfListDTO> productInfos = new ArrayList<>();
        List<Sort.Order> orders = new ArrayList<>();
        String[] _sort = sort.split(",");
        orders.add(new Sort.Order(getSortDirection(_sort[1]), _sort[0]));

        Pageable pageable = PageRequest.of(page, size, Sort.by(orders));
        Page<ProductOfListDTO> productInfoPage = null;
        if (categories == null || categories.isEmpty()) {
            productInfoPage = productInfoService.getProductsByCategoryParent(category_id, pageable, price1, price2);
        }else {
            productInfoPage = productInfoService.getProductsByCategoryParentFilter(categories, price1,price2,pageable);
        }
        productInfos = productInfoPage.getContent();
        Map<String, Object> response = new HashMap<>();
        response.put("products", productInfos);
        response.put("currentPage", productInfoPage.getNumber());
        response.put("totalItems", productInfoPage.getTotalElements());
        response.put("totalPages", productInfoPage.getTotalPages());
        return ResponseEntity.ok(response);

    }

    private Sort.Direction getSortDirection(String direction){
        if (direction.equals("asc")){
            return Sort.Direction.ASC;
        }else if (direction.equals("desc")){
            return Sort.Direction.DESC;
        }

        return Sort.Direction.ASC;
    }

    // lấy ra danh sách các sản phẩm có cùng danh mục với sản phẩm hiện tại
    @GetMapping("/getListProductSame")
    public ResponseEntity<?> getListProductSameS(@RequestParam("categoryName") String  categoryName){
        return ResponseEntity.ok(productInfoService.getListProductSame(categoryName));
    }

    // lấy ra đường dẫn đến sản phẩm hiện tại
    @GetMapping("/getBreakCrumb/{product_id}")
    public ResponseEntity<?> getBreakCrumb(@PathVariable("product_id") Long product_id){
        return ResponseEntity.ok(productInfoRepository.breakCrumb(product_id));
    }

    // lấy ra danh sách các sản phẩm
    @GetMapping("/getAllProductByAdmin")
    public ResponseEntity<?> getAllProductByAdmin(){
        return ResponseEntity.ok(productInfoRepository.findAllByOrderByCreateTimeDesc());
    }

    // xóa 1 product
    @DeleteMapping("/deleteProduct/{productId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteProduct(@PathVariable("productId") Long productId){
        productInfoService.deleteProduct(productId);
        return ResponseEntity.ok(new ResponseMessage("delete success"));
    }

    // Xóa file
    @DeleteMapping("/deleteFile")
    public ResponseEntity<?> deleteFile(@RequestParam("file") String fileName) throws IOException {
        imageService.deleteFile(fileName);
        return ResponseEntity.ok(new ResponseMessage("delete file name success"));
    }

    // lấy ra 6 sản phẩm tìm kiếm phổ biến cho thanh search
    @GetMapping("/getSixProductBestView")
    public ResponseEntity<?> getSixProductBestView(){
        return ResponseEntity.ok(productInfoService.getSixProductBestView());
    }


    @GetMapping("/getProductSearch")
    public ResponseEntity<?> getProductSearch(@RequestParam("textSearch") String textSearch,
                                              @RequestParam(defaultValue = "18") int size,
                                              @RequestParam(defaultValue = "0") int page,
                                              @RequestParam(required = false) String sort,
                                              @RequestParam(defaultValue = "0") Long price1,
                                              @RequestParam(defaultValue = "50000000") Long price2,
                                              @RequestParam(required = false) List<String> categories){
        List<Sort.Order> orders = new ArrayList<>();
        String textSearchNew = textSearch.replace(" ","|");
        Pageable pageable = null;
        if (sort.indexOf(",") == -1) {
            pageable = PageRequest.of(page, size);
        }else{
            String[] _sort = sort.split(",");
            orders.add(new Sort.Order(getSortDirection(_sort[1]), _sort[0]));
            pageable = PageRequest.of(page, size, Sort.by(orders));

        }
        Page<ProductOfListDTO> productInfoPage = null;
        if (categories.isEmpty() || categories == null){
            productInfoPage = productInfoService.getProductSearchResult(textSearchNew, pageable,price1, price2);
        }else{
            productInfoPage = productInfoRepository.getProductSearchResultFilterCategory(textSearchNew,pageable, price1, price2, categories);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("products", productInfoPage.getContent());
        response.put("currentPage", productInfoPage.getNumber());
        response.put("totalItems", productInfoPage.getTotalElements());
        response.put("totalPages", productInfoPage.getTotalPages());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getCategoryForSearch/{product_id}")
    public ResponseEntity<?> getCategoryForSearch(@PathVariable("product_id") Long product_id){
        return ResponseEntity.ok(productInfoRepository.getCategoryForSearch(product_id));
    }

    // lấy ra thông tin chính sách bảo hành, đổi trả
    @GetMapping("/getPolicy")
    public ResponseEntity<?> getPolicy(@RequestParam Integer status){
        OptionLink optionLink = optionLinkRepository.getOptionLink(status);
        return ResponseEntity.ok(optionLink);
    }

    @DeleteMapping("/delete/metaTagName/{id}")
    public ResponseEntity<?> deleteMetaTagName(@PathVariable("id") Long id){
        metaTagNameRepo.deleteById(id);
        return ResponseEntity.ok("xóa meta thành công");
    }

    @DeleteMapping("/delete/metaTag/{id}")
    public ResponseEntity<?> deleteMetaTag(@PathVariable("id") Long id){
        metaTagRepo.deleteById(id);
        return ResponseEntity.ok("xóa meta thành công");
    }

    @DeleteMapping("/de/{id}")
    public ResponseEntity<?> del(@PathVariable("id") Long id){
        productInfoRepository.deleteById(id);
        return ResponseEntity.ok(new ResponseMessage("delete ok"));
    }

    @GetMapping("/metaName/{product_id}")
    public ResponseEntity<?> getMetaName(@PathVariable("product_id") Long product_id){
        return ResponseEntity.ok(productInfoRepository.getMetaTagsNameForProduct(product_id));
    }

    @GetMapping("/metaProperty/{product_id}")
    public ResponseEntity<?> getMetaProperty(@PathVariable("product_id") Long product_id){
        return ResponseEntity.ok(productInfoRepository.getMetaTagsPropertyProduct(product_id));
    }


}
