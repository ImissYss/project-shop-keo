package com.maidat.loginwithgoogle.service;

import com.maidat.loginwithgoogle.model.*;

import java.util.Collection;
import java.util.List;
import java.util.Set;

public interface CartService {
    Cart getCart(User user);

    Cart addToCart(ProductInOrder product, User user);

    void delete(Long itemId, User user);

    Cart save(Cart cart);

    OrderMain createOrder(User user, AddressUser addressUser);


}
