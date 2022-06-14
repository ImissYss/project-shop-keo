package com.maidat.loginwithgoogle.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.maidat.loginwithgoogle.util.StringPrefixedSequenceIdGenerator;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@DynamicUpdate
public class ProductCategory implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cate_seq")
    @GenericGenerator(
            name = "cate_seq",
            strategy = "com.maidat.loginwithgoogle.util.StringPrefixedSequenceIdGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = StringPrefixedSequenceIdGenerator.INCREMENT_PARAM, value = "1"),
                    @org.hibernate.annotations.Parameter(name = StringPrefixedSequenceIdGenerator.VALUE_PREFIX_PARAMETER, value = "c"),
                    @org.hibernate.annotations.Parameter(name = StringPrefixedSequenceIdGenerator.NUMBER_FORMAT_PARAMETER, value = "%05d")
            }
    )
    private String categoryId;

    private String categoryName;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "category")
    @JsonIgnore
    private Set<ProductInfo> productInfos = new HashSet<>();

    @CreationTimestamp
    private Date createTime;

    @UpdateTimestamp
    private Date updateTime;

    private String titleSeo;

    public ProductCategory() {
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "parent_id")
    private ProductCategory categoryParent;

    @OneToMany(fetch = FetchType.LAZY,mappedBy = "seoCategory", cascade = CascadeType.REMOVE)
    private List<MetaTagName> metaTagNames;

    @OneToMany(fetch = FetchType.LAZY,mappedBy = "seoCategory", cascade = CascadeType.REMOVE)
    private List<MetaTags> metaTags;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "categoryParent")
    private Set<ProductCategory> children = new HashSet<>();

    public ProductCategory(String categoryName) {
        this.categoryName = categoryName;
    }
}
