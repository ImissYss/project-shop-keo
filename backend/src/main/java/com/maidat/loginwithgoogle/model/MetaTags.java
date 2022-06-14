package com.maidat.loginwithgoogle.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
public class MetaTags implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long tagId;

    private String property;

    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private ProductInfo seo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private ProductCategory seoCategory;
    public MetaTags(){

    }
}
