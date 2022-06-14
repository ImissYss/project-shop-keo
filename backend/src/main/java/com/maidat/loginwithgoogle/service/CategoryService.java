package com.maidat.loginwithgoogle.service;


import com.maidat.loginwithgoogle.dto.CategoryDto;
import com.maidat.loginwithgoogle.model.ProductCategory;

public interface CategoryService {
    ProductCategory addCategory(CategoryDto categoryDto);
}
