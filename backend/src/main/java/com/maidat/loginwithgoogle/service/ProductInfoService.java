package com.maidat.loginwithgoogle.service;

import com.maidat.loginwithgoogle.dto.InfoShopDTO;
import com.maidat.loginwithgoogle.dto.ProductDto;
import com.maidat.loginwithgoogle.dto.ProductOfListDTO;
import com.maidat.loginwithgoogle.model.InfoShop;
import com.maidat.loginwithgoogle.model.ProductInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ProductInfoService {
    ProductInfo addProduct(ProductDto productDto);
    ProductInfo getProductById(Long product_id);
    List<ProductOfListDTO> getProductByCategory(String category_id);
    Page<ProductOfListDTO> getAllProduct(Pageable pageable);
    ProductInfo updateReviewCount(ProductInfo productInfo, Integer rating);
    ProductInfo findOne(Long productId);
    void increaseStock(Long productId, int amount);
    void decreaseStock(Long productId, int amount);
    ProductInfo offSale(Long productId);
    ProductInfo onSale(Long productId);
    void soldProduct(Long productId, Integer soldCount);
    boolean checkProductEnough(Long productId, Integer quantity);
    Page<ProductOfListDTO> getProductsByCategoryParent(String categoryId, Pageable pageable, Long price1, Long price2);
    Page<ProductOfListDTO> getProductsByCategoryParentFilter(List<String> categories, Long price1, Long price2, Pageable pageable);
    List<ProductOfListDTO> getListProductSame(String categoryName);

    void deleteProduct(Long productId);

    // lấy ra 6 sản phẩm tìm kiếm phổ biến (có lượt xem nhiều nhất)
    List<ProductInfo> getSixProductBestView();

    Page<ProductOfListDTO> getProductSearchResult(String textSearch, Pageable pageable, Long price1, Long price2);

    //tạo thông tin cho shop
    InfoShop createInfoShop(InfoShopDTO infoShopDTO);
}
