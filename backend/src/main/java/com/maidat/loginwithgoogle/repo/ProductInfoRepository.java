package com.maidat.loginwithgoogle.repo;

import com.maidat.loginwithgoogle.dto.ProductOfCategoryDTO;
import com.maidat.loginwithgoogle.dto.ProductOfListDTO;
import com.maidat.loginwithgoogle.interfacesDto.CategoryChild;
import com.maidat.loginwithgoogle.interfacesDto.MetaTagNameDto;
import com.maidat.loginwithgoogle.interfacesDto.MetaTagPropertyDto;
import com.maidat.loginwithgoogle.model.ProductInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductInfoRepository extends JpaRepository<ProductInfo, Long> {

    Optional<ProductInfo> findByProductId(Long product_id);

    @Query(value = "select pi.product_id as productId,pi.product_price as productPrice,\n" +
            "            pi.rating as rating,\n" +
            "            pi.view_count as viewCount, pi.sold as sold,pi.discount as discount, pi.count_rating as countRating,\n" +
            "            pi.create_time as createTime, pi.product_name as productName,\n" +
            "            mg.name as imageName, mg.url as urlImage from product_info as pi\n" +
            "            join image_product as mg on pi.product_id = mg.product_id \n" +
            "\t\t\tand mg.id = (select max(id) from image_product as mg2 where mg2.product_id = pi.product_id )",
            countQuery = "select count(*) from (select pi.product_id as productId,pi.product_price as productPrice,\n" +
                    "            pi.rating as rating,\n" +
                    "            pi.view_count as viewCount, pi.sold as sold,pi.discount as discount, pi.count_rating as countRating,\n" +
                    "            pi.create_time as createTime, pi.product_name as productName,\n" +
                    "            mg.name as imageName, mg.url as urlImage from product_info as pi\n" +
                    "            join image_product as mg on pi.product_id = mg.product_id \n" +
                    "\t\t\tand mg.id = (select max(id) from image_product as mg2 where mg2.product_id = pi.product_id ))as dt",
            nativeQuery = true)
    Page<ProductOfListDTO> findAllProduct(Pageable pageable);

    List<ProductInfo> findAllByOrderByCreateTimeDesc();

    @Query(value = "select pi.product_id as productId,pi.product_price as productPrice,\n" +
            "            pi.rating as rating,\n" +
            "            pi.view_count as viewCount, pi.sold as sold,pi.discount as discount, pi.count_rating as countRating,\n" +
            "            pi.create_time as createTime, pi.product_name as productName,\n" +
            "            mg.id as imageId, mg.url as urlImage from product_info as pi\n" +
            "            join image_product as mg on pi.product_id = mg.product_id \n" +
            "\t\t\tand mg.id = (select max(id) from image_product as mg2 where mg2.product_id = pi.product_id )\n" +
            "\t\t\twhere pi.category_id = :category_id", nativeQuery = true)
    List<ProductOfListDTO> findByCategory(String category_id);

    @Query(value =
            "select pi.product_id as productId,pi.product_price as productPrice,\n" +
                    "            pi.rating as rating,\n" +
                    "            pi.view_count as viewCount, pi.sold as sold,pi.discount as discount, pi.count_rating as countRating,\n" +
                    "            pi.create_time as createTime, pi.product_name as productName,\n" +
                    "            mg.id as imageId, mg.url as urlImage from product_info as pi\n" +
                    "            join image_product as mg on pi.product_id = mg.product_id\n" +
                    "            and mg.id = (select max(id) from image_product as mg2 where mg2.product_id = pi.product_id )\n" +
                    "    where pi.category_id in (select category_id from product_category\n" +
                    "            where product_category.parent_id = :categoryId or product_category.category_id = :categoryId)and product_price between :price1 and :price2",
    countQuery = "select count(*) from (select pi.product_id as productId,pi.product_price as productPrice,\n" +
            "            pi.rating as rating,\n" +
            "            pi.view_count as viewCount, pi.sold as sold,pi.discount as discount, pi.count_rating as countRating,\n" +
            "            pi.create_time as createTime, pi.product_name as productName,\n" +
            "            mg.id as imageId, mg.url as urlImage from product_info as pi\n" +
            "            join image_product as mg on pi.product_id = mg.product_id \n" +
            "\t\t\tand mg.id = (select max(id) from image_product as mg2 where mg2.product_id = pi.product_id )\n" +
            "\t\t\twhere pi.category_id in (select category_id from product_category\n" +
            "            where product_category.parent_id = :categoryId or product_category.category_id = :categoryId)and product_price between :price1 and :price2)as pd",
    nativeQuery = true)
    Page<ProductOfListDTO> findProductsByCategoryParent(@Param("categoryId") String categoryId, Pageable pageable, @Param("price1")Long price1, @Param("price2") Long price2);


    @Query(value =
            "select pi.product_id as productId,pi.product_price as productPrice,\n" +
                    "            pi.rating as rating,\n" +
                    "            pi.view_count as viewCount, pi.sold as sold,pi.discount as discount, pi.count_rating as countRating,\n" +
                    "            pi.create_time as createTime, pi.product_name as productName,\n" +
                    "            mg.id as imageId, mg.url as urlImage from product_info as pi\n" +
                    "            join image_product as mg on pi.product_id = mg.product_id \n" +
                    "\t\t\tand mg.id = (select max(id) from image_product as mg2 where mg2.product_id = pi.product_id )\n" +
                    "\t\t\twhere pi.category_id in :categories and pi.product_price between :price1 and :price2",
            countQuery = "select count(*) from (select pi.product_id as productId,pi.product_price as productPrice,\n" +
                    "            pi.rating as rating,\n" +
                    "            pi.view_count as viewCount, pi.sold as sold,pi.discount as discount, pi.count_rating as countRating,\n" +
                    "            pi.create_time as createTime, pi.product_name as productName,\n" +
                    "            mg.id as imageId, mg.url as urlImage from product_info as pi\n" +
                    "            join image_product as mg on pi.product_id = mg.product_id \n" +
                    "\t\t\tand mg.id = (select max(id) from image_product as mg2 where mg2.product_id = pi.product_id )\n" +
                    "\t\t\twhere pi.category_id in :categories and pi.product_price between :price1 and :price2) as pd",
            nativeQuery = true)
    Page<ProductOfListDTO> findProductsByCategoryParentFilter(
                                                         @Param("categories") List<String> categories,
                                                         @Param("price1") Long price1,
                                                         @Param("price2") Long price2,
                                                         Pageable pageable);


    @Query(value = "select pi.product_id as productId,pi.product_price as productPrice,\n" +
            "            pi.rating as rating,\n" +
            "            pi.view_count as viewCount, pi.sold as sold,pi.discount as discount, pi.count_rating as countRating,\n" +
            "            pi.create_time as createTime, pi.product_name as productName,\n" +
            "            mg.name as imageName, mg.url as urlImage from product_info as pi\n" +
            "            join image_product as mg on pi.product_id = mg.product_id \n" +
            "\t\t\tand mg.id = (select max(id) from image_product as mg2 where mg2.product_id = pi.product_id ) where pi.category_name = :categoryName ", nativeQuery = true)
    List<ProductOfListDTO> getListProductSame(@Param("categoryName") String categoryName);

    @Query(value = "select p.product_id, p.product_name, pc1.category_id as  cateChildId, pc1.category_name as cateChildName, pc2.category_id as cateParentId, pc2.category_name as cateParentName\n" +
            "from product_info as p\n" +
            "join product_category as pc1 on pc1.category_id =  p.category_id\n" +
            "left join product_category as pc2 on pc2.category_id = pc1.parent_id\n" +
            "where p.product_id = ?1", nativeQuery = true)
    Object breakCrumb(Long product_id);

    @Query(value = "select * from product_info order by view_count desc limit 0, 6;", nativeQuery = true)
    List<ProductInfo> getSixProductBestView();


    @Query(value = "select pi.product_id as productId,pi.product_price as productPrice,\n" +
            "                               pi.rating as rating,\n" +
            "                               pi.view_count as viewCount, pi.sold as sold,pi.discount as discount, pi.count_rating as countRating,\n" +
            "                               pi.create_time as createTime, pi.product_name as productName,\n" +
            "                               mg.id as imageId, mg.url as urlImage from product_info as pi\n" +
            "                              join image_product as mg on pi.product_id = mg.product_id\n" +
            "                             and mg.id = (select max(id) from image_product as mg2 where mg2.product_id = pi.product_id )\n" +
            "\t\t\t\t\t\t\t where pi.tsv @@ to_tsquery(:textSearch) and pi.product_price between :price1 and :price2\n" +
            "order by ts_rank(tsv, to_tsquery(:textSearch)) desc",
            countQuery = "select count (*) from (select pi.product_id as productId,pi.product_price as productPrice,\n" +
                    "                               pi.rating as rating,\n" +
                    "                               pi.view_count as viewCount, pi.sold as sold,pi.discount as discount, pi.count_rating as countRating,\n" +
                    "                               pi.create_time as createTime, pi.product_name as productName,\n" +
                    "                               mg.id as imageId, mg.url as urlImage from product_info as pi\n" +
                    "                              join image_product as mg on pi.product_id = mg.product_id\n" +
                    "                             and mg.id = (select max(id) from image_product as mg2 where mg2.product_id = pi.product_id )\n" +
                    "\t\t\t\t\t\t\t where pi.tsv @@ to_tsquery(:textSearch) and pi.product_price between :price1 and :price2\n" +
                    "order by ts_rank(tsv, to_tsquery(:textSearch)) desc) as ps",
            nativeQuery = true)
    Page<ProductOfListDTO> getProductSearchResult(@Param("textSearch") String textSearch, Pageable pageable,
                                             @Param("price1")Long price1, @Param("price2") Long price2
                                             );

    @Query(value = "select pi.product_id as productId,pi.product_price as productPrice,\n" +
            "                               pi.rating as rating,\n" +
            "                               pi.view_count as viewCount, pi.sold as sold,pi.discount as discount, pi.count_rating as countRating,\n" +
            "                               pi.create_time as createTime, pi.product_name as productName,\n" +
            "                               mg.id as imageId, mg.url as urlImage from product_info as pi\n" +
            "                              join image_product as mg on pi.product_id = mg.product_id\n" +
            "                             and mg.id = (select max(id) from image_product as mg2 where mg2.product_id = pi.product_id )\n" +
            "\t\t\t\t\t\t\t where pi.tsv @@ to_tsquery(:textSearch) and pi.category_id in :categories and pi.product_price between :price1 and :price2\n" +
            "order by ts_rank(tsv, to_tsquery(:textSearch)) desc",
            countQuery = "select count(*) from (select pi.product_id as productId,pi.product_price as productPrice,\n" +
                    "                               pi.rating as rating,\n" +
                    "                               pi.view_count as viewCount, pi.sold as sold,pi.discount as discount, pi.count_rating as countRating,\n" +
                    "                               pi.create_time as createTime, pi.product_name as productName,\n" +
                    "                               mg.id as imageId, mg.url as urlImage from product_info as pi\n" +
                    "                              join image_product as mg on pi.product_id = mg.product_id\n" +
                    "                             and mg.id = (select max(id) from image_product as mg2 where mg2.product_id = pi.product_id )\n" +
                    "\t\t\t\t\t\t\t where pi.tsv @@ to_tsquery(:textSearch) and pi.category_id in :categories and pi.product_price between :price1 and :price2\n" +
                    "order by ts_rank(tsv, to_tsquery(:textSearch)) desc) as ps"
            ,
            nativeQuery = true)
    Page<ProductOfListDTO> getProductSearchResultFilterCategory(@Param("textSearch") String textSearch, Pageable pageable,
                                             @Param("price1")Long price1, @Param("price2") Long price2,
                                                           @Param("categories") List<String> categories);

    @Query(value = "select category_id as categoryId, category_name as categoryName from product_category\n" +
            "where category_id in (select category_id from product_category where parent_id = \n" +
            "(select parent_id from product_category where category_id = (select category_id from product_info where product_id = :product_id)))", nativeQuery = true)
    List<CategoryChild> getCategoryForSearch(@Param("product_id") Long product_id);

    @Query(value = "select product_id as productId, product_name as productName from product_info where category_id = :categoryId", nativeQuery = true)
    List<ProductOfCategoryDTO> getProductOfCategory(@Param("categoryId") String categoryId);

    @Query(value = "select pi.title_seo as titleSeo,mtn.name, mtn.content from meta_tag_name as mtn\n" +
            "join product_info as pi on pi.product_id = mtn.seo_product_id\n" +
            "where pi.product_id = :product_id", nativeQuery = true)
    List<MetaTagNameDto> getMetaTagsNameForProduct(@Param("product_id") Long product_id);

    @Query(value = "select mt.property, mt.content from meta_tags as mt\n" +
            "join product_info as pi on pi.product_id = mt.seo_product_id\n" +
            "where pi.product_id = :product_id", nativeQuery = true)
    List<MetaTagPropertyDto> getMetaTagsPropertyProduct(@Param("product_id") Long product_id);

}
