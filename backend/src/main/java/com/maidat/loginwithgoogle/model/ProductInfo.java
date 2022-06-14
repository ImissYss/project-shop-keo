package com.maidat.loginwithgoogle.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import com.maidat.loginwithgoogle.enums.ProductStatusEnum;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.*;

@Entity
@Getter
@Setter
@DynamicUpdate
public class ProductInfo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    private String code;

    @NotNull
    private String productName;

    @NotNull
    private BigDecimal productPrice;

    private String productDescription;

    private String productTutorial;

    private String moreInformation;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE, mappedBy = "product")
    private List<ImageProduct> imageProducts = new ArrayList<>();

    private float rating;

    private String information;

    @ColumnDefault("0")
    private Integer discount;
    private Integer sold;

    private String titleSeo;

    @OneToMany(fetch = FetchType.LAZY,mappedBy = "seo", cascade = CascadeType.REMOVE)
    private List<MetaTagName> metaTagNames;

    @OneToMany(fetch = FetchType.LAZY,mappedBy = "seo", cascade = CascadeType.REMOVE)
    private List<MetaTags> metaTags;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "product")
    @JsonIgnore
    private Set<Rating> ratings = new HashSet<>();

    private Integer count;

    private Integer countRating;

    private Integer viewCount;

    private Integer productStatus;

    private Integer countLike;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    private ProductCategory category;

    private String categoryName;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "productInfo")
    private Collection<Review> reviews;

    @CreationTimestamp
    private Date createTime;

    @UpdateTimestamp
    private Date updateTime;

    public ProductInfo(){

    }
    @Override
    public String toString() {
        return "ProductInfo{" +
                "productId=" + productId +
                ", code='" + code + '\'' +
                ", productName='" + productName + '\'' +
                ", productPrice=" + productPrice +
                ", productDescription='" + productDescription + '\'' +
                ", rating=" + rating +
                ", information='" + information + '\'' +
                ", discount=" + discount +
                ", sold=" + sold +
                ", count=" + count +
                ", countRating=" + countRating +
                ", viewCount=" + viewCount +
                ", productStatus=" + productStatus +
                ",countLike=" + countLike +
                ", createTime=" + createTime +
                ", updateTime=" + updateTime +
                '}';
    }
}
