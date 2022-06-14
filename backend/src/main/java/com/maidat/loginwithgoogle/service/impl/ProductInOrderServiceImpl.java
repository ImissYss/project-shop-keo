package com.maidat.loginwithgoogle.service.impl;


import com.maidat.loginwithgoogle.enums.ResultEnum;
import com.maidat.loginwithgoogle.exception.MyException;
import com.maidat.loginwithgoogle.model.Cart;
import com.maidat.loginwithgoogle.model.ProductInOrder;
import com.maidat.loginwithgoogle.model.ProductInfo;
import com.maidat.loginwithgoogle.model.User;
import com.maidat.loginwithgoogle.repo.ProductInOrderRepository;
import com.maidat.loginwithgoogle.service.ProductInOrderService;
import com.maidat.loginwithgoogle.service.ProductInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ProductInOrderServiceImpl implements ProductInOrderService {

    @Autowired
    ProductInOrderRepository productInOrderRepository;

    @Autowired
    ProductInfoService productInfoService;

    @Override
    public ProductInOrder updateQuantity(Long pId, Integer quantity, User user) {
        Cart cart = user.getCart();
        List<ProductInOrder> productInOrders = cart.getProducts();
        Optional<ProductInOrder> product = productInOrders.stream().filter(p -> p.getProductId().equals(pId)).findFirst();
        if (product.isPresent()){
            ProductInfo productInfo = productInfoService.findOne(product.get().getProductId());
            if (quantity > productInfo.getCount()){
                throw new MyException(ResultEnum.PRODUCT_NOT_ENOUGH);
            }else {
                product.get().setCount(quantity);
                productInOrderRepository.save(product.get());
            }
        }
        return product.get();
    }

    @Override
    public ProductInOrder updateStatus(Long pId, boolean status, User user) {
        Cart cart = user.getCart();
        List<ProductInOrder> productInOrders = cart.getProducts();
        Optional<ProductInOrder> product = productInOrders.stream().filter(p -> p.getProductId().equals(pId)).findFirst();
        if (product.isPresent()){
            product.get().setStatus(status);
            productInOrderRepository.save(product.get());
        }
        return product.get();
    }
}
