package com.maidat.loginwithgoogle.repo;

import com.maidat.loginwithgoogle.model.OrderMain;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderMainRepository extends JpaRepository<OrderMain, Long> {
    List<OrderMain> findByBuyerEmail(String email);

    @Query(value = "select * from order_main where order_status in :status ", nativeQuery = true)
    Page<OrderMain> findAllOrder(Pageable pageable, @Param("status") List<String> status);

    @Query(value = "select * from order_main where order_status in :status and DATE_FORMAT(create_time, '%Y-%m-%d') = :createTime", nativeQuery = true)
    Page<OrderMain> findAllOrderByDate(Pageable pageable, @Param("status") List<String> status,@Param("createTime") String createTime);

    @Query(value = "select order_id from order_main where buyer_email = ?1", nativeQuery = true)
    List<Long> findOrderIdByUser(String userEmail);

    @Modifying
    @Query(value = "update order_main set order_status = 1 where order_id = ?1", nativeQuery = true)
    void confirmOrder(Long orderId);

    @Modifying
    @Query(value = "update order_main set order_status = 2 where order_id = ?1", nativeQuery = true)
    void cancelOrder(Long orderId);



}
