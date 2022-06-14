package com.maidat.loginwithgoogle.service.impl;

import com.maidat.loginwithgoogle.model.OrderMain;
import com.maidat.loginwithgoogle.model.User;
import com.maidat.loginwithgoogle.repo.OrderMainRepository;
import com.maidat.loginwithgoogle.service.LocalUserDetailService;
import com.maidat.loginwithgoogle.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderMainRepository orderMainRepository;
    @Autowired
    LocalUserDetailService localUserDetailService;
    @Override
    public OrderMain getOrder(Long orderId) {
        return orderMainRepository.findById(orderId).orElseThrow(() -> new UsernameNotFoundException("Not found order by id: " + orderId));
    }

    @Override
    public List<OrderMain> getAllOrder(Principal principal) {
        User user = localUserDetailService.loadUserByUsername(principal.getName()).getUser();
        return orderMainRepository.findByBuyerEmail(user.getEmail());
    }

    @Override
    public List<Long> getOrderIdByUser(String email) {
        return orderMainRepository.findOrderIdByUser(email);
    }

    @Override
    @Transactional
    public void confirmOrder(Long orderId) {
        orderMainRepository.confirmOrder(orderId);
    }

    @Override
    @Transactional
    public void cancelOrder(Long orderId) {
        orderMainRepository.cancelOrder(orderId);
    }
}
