package com.maidat.loginwithgoogle.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.maidat.loginwithgoogle.enums.ImageStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ImageProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String url;

    private Integer imageStatus;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    @JsonIgnore
    private ProductInfo product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shop_id")
    @JsonIgnore
    private InfoShop tpshop;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "description_id")
    @JsonIgnore
    private InfoShop imgDescription;

    public ImageProduct(String name, String url){
        this.name = name;
        this.url = url;
        this.imageStatus = ImageStatus.UP.getCode();
    }

    public ImageProduct(String id, String name, String url, String imageStatus){
        this.id = Long.parseLong(id);
        this.name = name;
        this.url = url;
        this.imageStatus = Integer.parseInt(imageStatus);
    }
}
