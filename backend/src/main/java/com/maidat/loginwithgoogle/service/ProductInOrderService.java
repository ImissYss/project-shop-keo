package com.maidat.loginwithgoogle.service;

import com.maidat.loginwithgoogle.model.ProductInOrder;
import com.maidat.loginwithgoogle.model.User;

public interface ProductInOrderService {
    ProductInOrder updateQuantity(Long pId, Integer quantity, User user);
    ProductInOrder updateStatus(Long pId, boolean status, User user);
}
