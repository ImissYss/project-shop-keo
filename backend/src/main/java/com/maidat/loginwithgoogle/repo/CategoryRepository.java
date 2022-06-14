package com.maidat.loginwithgoogle.repo;

import com.maidat.loginwithgoogle.dto.CategoryChildDto;
import com.maidat.loginwithgoogle.interfacesDto.CategoryChild;
import com.maidat.loginwithgoogle.interfacesDto.MetaTagNameDto;
import com.maidat.loginwithgoogle.interfacesDto.MetaTagPropertyDto;
import com.maidat.loginwithgoogle.model.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.NamedNativeQuery;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<ProductCategory, String> {

    Optional<ProductCategory> findByCategoryId(String categoryId);

    @Query(value = "select * from product_category as p where p.parent_id is null", nativeQuery = true)
    List<ProductCategory> getAllCategoryChildren();

    @Query(value = "select category_id as categoryId,category_name as categoryName from product_category where parent_id = ?1", nativeQuery = true)
    List<CategoryChild> getAllInfoCategory(String categoryPrentId);

    @Query(value = "select category_id as categoryId,category_name as categoryName from product_category where parent_id is null", nativeQuery = true)
    List<CategoryChild> getIdCategoryParent();

//    @Query(value = "select category_id as categoryId, category_name as categoryName from product_category ", nativeQuery = true)
//    List<CategoryChild> getAllCateForEdit();

    @Query(value = "select category_id as categoryId, category_name as categoryName from product_category where parent_id = :parent_id", nativeQuery = true)
    List<CategoryChild> getAllCategoryChild(@Param("parent_id") String parent_id);

    @Query(value = "select pc.title_seo as titleSeo,mtn.name, mtn.content from meta_tag_name as mtn\n" +
            "join product_category as pc on pc.category_id = mtn.seo_category_category_id\n" +
            "where pc.category_id = :category_id", nativeQuery = true)
    List<MetaTagNameDto> getMetaTagsNameForCate(@Param("category_id") String category_id);

    @Query(value = "select mt.property, mt.content from meta_tags as mt\n" +
            "join product_category as pc on pc.category_id = mt.seo_category_category_id\n" +
            "where pc.category_id = :category_id", nativeQuery = true)
    List<MetaTagPropertyDto> getMetaTagsProperty(@Param("category_id") String category_id);




}
