package com.maidat.loginwithgoogle.dto;

import com.maidat.loginwithgoogle.model.MetaTagName;
import com.maidat.loginwithgoogle.model.MetaTags;
import com.maidat.loginwithgoogle.model.ProductCategory;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDto {

    private String categoryName;

    private String titleSeo;

    private List<MetaTags> metaTags;

    private List<MetaTagName> metaTagNames;

    private ProductCategory categoryParent;
}
