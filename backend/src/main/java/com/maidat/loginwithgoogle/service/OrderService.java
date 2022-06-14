package com.maidat.loginwithgoogle.service;

import com.maidat.loginwithgoogle.model.OrderMain;
import org.aspectj.weaver.ast.Or;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.security.Principal;
import java.util.List;

public interface OrderService {
    OrderMain getOrder(Long orderId);
    List<OrderMain> getAllOrder(Principal principal);
    List<Long> getOrderIdByUser(String email);
    void confirmOrder(Long orderId);
    void cancelOrder(Long orderId);
}
