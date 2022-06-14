package com.maidat.loginwithgoogle.dto;


import java.util.Date;

public interface ProductOfListDTO {
    Long getProductId();
    String getProductName();
    Integer getProductPrice();
    String getUrlImage();
    String getImageName();
    Integer getCountRating();
    float getRating();
    Date getCreateTime();
    Integer getSold();
    Integer getDiscount();
    Integer getViewCount();
}
