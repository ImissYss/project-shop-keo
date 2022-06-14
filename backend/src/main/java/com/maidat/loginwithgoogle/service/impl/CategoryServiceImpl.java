package com.maidat.loginwithgoogle.service.impl;

import com.maidat.loginwithgoogle.dto.CategoryDto;
import com.maidat.loginwithgoogle.model.MetaTagName;
import com.maidat.loginwithgoogle.model.ProductCategory;
import com.maidat.loginwithgoogle.repo.CategoryRepository;
import com.maidat.loginwithgoogle.repo.MetaTagNameRepo;
import com.maidat.loginwithgoogle.repo.MetaTagRepo;
import com.maidat.loginwithgoogle.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    MetaTagNameRepo metaTagNameRepo;
    @Autowired
    MetaTagRepo metaTagRepo;
    @Override
    public ProductCategory addCategory(CategoryDto categoryDto) {
        ProductCategory category = new ProductCategory();
        category.setCategoryName(categoryDto.getCategoryName());
        category.setTitleSeo(categoryDto.getTitleSeo());
        if (categoryDto.getCategoryParent() != null){
            category.setCategoryParent(categoryDto.getCategoryParent());
        }
        category.setMetaTagNames(categoryDto.getMetaTagNames());
        category.setMetaTags(categoryDto.getMetaTags());
        ProductCategory category1 = categoryRepository.save(category);
        for (int i=0; i< categoryDto.getMetaTagNames().size();i++){
            MetaTagName metaTagName = new MetaTagName();
            categoryDto.getMetaTagNames().get(i).setSeoCategory(category1);
            metaTagNameRepo.save(categoryDto.getMetaTagNames().get(i));
        }
        for (int i=0; i< categoryDto.getMetaTags().size();i++){
            categoryDto.getMetaTags().get(i).setSeoCategory(category1);
            metaTagRepo.save(categoryDto.getMetaTags().get(i));
        }
        return category1;
    }
}
