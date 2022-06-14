package com.maidat.loginwithgoogle.repo;

import com.maidat.loginwithgoogle.model.ProductInOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface ProductInOrderRepository extends JpaRepository<ProductInOrder, Long> {
    @Modifying
    @Query(value = "delete from product_in_order where id = ?1", nativeQuery = true)
    void deleteByProductInOrderId(Long productInOrderId);
}
