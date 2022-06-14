package com.maidat.loginwithgoogle.controller;

import com.maidat.loginwithgoogle.dto.*;
import com.maidat.loginwithgoogle.interfacesDto.CategoryChild;
import com.maidat.loginwithgoogle.messages.ResponseMessage;
import com.maidat.loginwithgoogle.model.ProductCategory;
import com.maidat.loginwithgoogle.repo.CategoryRepository;
import com.maidat.loginwithgoogle.repo.MetaTagNameRepo;
import com.maidat.loginwithgoogle.repo.MetaTagRepo;
import com.maidat.loginwithgoogle.repo.ProductInfoRepository;
import com.maidat.loginwithgoogle.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.*;

@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    ProductInfoRepository productInfoRepository;

    @Autowired
    CategoryService categoryService;

    @Autowired
    MetaTagRepo metaTagRepo;

    @Autowired
    MetaTagNameRepo metaTagNameRepo;

    @PostMapping("/addCategory")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> addCategroy(@RequestBody CategoryDto categoryDto){
        ProductCategory category = categoryService.addCategory(categoryDto);
        ProductCategory category1 = categoryRepository.save(category);
        return ResponseEntity.ok(category1);
    }

    @GetMapping("/getAllCategory")
    public ResponseEntity<?> getAllCategory(){
        List<CategoryForHeaderDTO> categories = new ArrayList<>();
        List<CategoryChild> categoryChildren = categoryRepository.getIdCategoryParent();
        categoryChildren.forEach(c -> {
            CategoryForHeaderDTO category = new CategoryForHeaderDTO();
            category.setCategoryId(c.getCategoryId());
            category.setCategoryName(c.getCategoryName());
            List<CategoryChild> categoryChildren1 = categoryRepository.getAllCategoryChild(c.getCategoryId());
            List<CategoryForHeaderDTO> category1 = new ArrayList<>();
            categoryChildren1.forEach(c1 -> {
                List<ProductOfCategoryDTO> product = productInfoRepository.getProductOfCategory(c1.getCategoryId());
                CategoryForHeaderDTO category2 = new CategoryForHeaderDTO(c1.getCategoryId(), c1.getCategoryName(), product);
                category1.add(category2);
            });
            category.setChildren(category1);
            categories.add(category);
        });
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/findAll")
    public ResponseEntity<?> getAllCate(){
        List<ProductCategory> categories = categoryRepository.findAll();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/getCategory/{categoryId}")
    public ResponseEntity<?> getCategoryById(@PathVariable("categoryId") String categoryId){
        return ResponseEntity.ok(categoryRepository.getAllCategoryChild(categoryId));
    }

    @GetMapping("/getAllCategoryParent")
    public ResponseEntity<?> getAllCategoryParent(){
        List<ProductCategory> categories = categoryRepository.getAllCategoryChildren();
        List<CategoryChildDto> categoryChildDtos = new ArrayList<>();
        categories.forEach(c -> {
            CategoryChildDto categoryChildDto = new CategoryChildDto(c.getCategoryId(), c.getCategoryName());
            categoryChildDtos.add(categoryChildDto);
        });
        return ResponseEntity.ok(categoryChildDtos);
    }

    @DeleteMapping("/deleteCategory/{categoryId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteCategory(@PathVariable("categoryId") String categoryId ){
        Optional<ProductCategory> category = categoryRepository.findByCategoryId(categoryId);
        if (!category.isPresent()){
            throw new UsernameNotFoundException("Not found category by id " + categoryId);
        }else{
            categoryRepository.deleteById(categoryId);
            return ResponseEntity.ok(new ResponseMessage("delete success"));
        }
    }

    @GetMapping("/getCategoryInfo")
    public ResponseEntity<?> getCategoryInfo(){
        List<CategoryChild> idsParent = categoryRepository.getIdCategoryParent();
        List<CategorySelectDto> categorySelectDtos = new ArrayList<>();
        idsParent.forEach(ip -> {
            List<CategoryChild> categoryChildren = categoryRepository.getAllInfoCategory(ip.getCategoryId());
            categorySelectDtos.add(new CategorySelectDto(ip.getCategoryName(), categoryChildren));
        });
        return ResponseEntity.ok(categorySelectDtos);
    }

    @GetMapping("/getAllCategoryForEdit")
    public ResponseEntity<?> getAllCategoryForEdit(){
        return ResponseEntity.ok(categoryRepository.findAll());
    }

    @PutMapping("/update")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateCategory(@RequestBody ProductCategory productCategory){
        productCategory.getMetaTags().forEach(m -> {
            m.setSeoCategory(productCategory);
            metaTagRepo.save(m);
        });
        productCategory.getMetaTagNames().forEach(m -> {
            m.setSeoCategory(productCategory);
            metaTagNameRepo.save(m);
        });
        return ResponseEntity.ok(categoryRepository.save(productCategory));
    }

    @GetMapping("/metaName/{category_id}")
    public ResponseEntity<?> getMetaTagNameForCate(@PathVariable("category_id") String category_id){
        return ResponseEntity.ok(categoryRepository.getMetaTagsNameForCate(category_id));
    }

    @GetMapping("/metaProperty/{category_id}")
    public ResponseEntity<?> getMetaTagProperty(@PathVariable("category_id") String category_id){
        return ResponseEntity.ok(categoryRepository.getMetaTagsProperty(category_id));
    }

}
