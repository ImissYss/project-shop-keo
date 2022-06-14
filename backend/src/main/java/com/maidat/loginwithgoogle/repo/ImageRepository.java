package com.maidat.loginwithgoogle.repo;

import com.maidat.loginwithgoogle.model.ImageProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Repository
public interface ImageRepository extends JpaRepository<ImageProduct, Long> {

    Set<ImageProduct> findByIdIn(List<Long> ids);

    @Query(value = "select * from image_product where image_status = :status", nativeQuery = true)
    @Transactional
    Set<ImageProduct> findImageStatus(@Param("status") Integer status);
}