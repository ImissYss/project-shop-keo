package com.maidat.loginwithgoogle.dto;

import com.maidat.loginwithgoogle.model.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ProductDto {

    private String code;

    private String productName;

    private Integer productPrice;

    private List<ImageProduct> imageProducts;

    private String productDescription;

    private String productTutorial;

    private String moreInformation;

    private String information;

    private Integer discount;

    private Integer countLike;

    private Integer count;

    private ProductCategory category;

    private String titleSeo;

    private List<MetaTags> metaTags;

    private List<MetaTagName> metaTagNames;



}
