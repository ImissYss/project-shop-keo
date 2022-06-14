package com.maidat.loginwithgoogle.dto;

import com.maidat.loginwithgoogle.interfacesDto.CategoryChild;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class CategoryForHeaderDTO {
    private String categoryId;
    private String categoryName;
    private List<CategoryForHeaderDTO> children;
    private List<ProductOfCategoryDTO> productInfos;

    public CategoryForHeaderDTO(String categoryId, String categoryName, List<ProductOfCategoryDTO> productInfos){
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.productInfos = productInfos;
    }

}
