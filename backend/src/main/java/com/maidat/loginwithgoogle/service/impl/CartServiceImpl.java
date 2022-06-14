package com.maidat.loginwithgoogle.service.impl;

import com.maidat.loginwithgoogle.enums.ResultEnum;
import com.maidat.loginwithgoogle.exception.MyException;
import com.maidat.loginwithgoogle.exception.ResourceNotFoundException;
import com.maidat.loginwithgoogle.model.*;
import com.maidat.loginwithgoogle.repo.CartRepository;
import com.maidat.loginwithgoogle.repo.OrderMainRepository;
import com.maidat.loginwithgoogle.repo.ProductInOrderRepository;
import com.maidat.loginwithgoogle.repo.ProductInfoRepository;
import com.maidat.loginwithgoogle.service.CartService;
import com.maidat.loginwithgoogle.service.ProductInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;


@Service
public class CartServiceImpl implements CartService {

    @Autowired
    CartRepository cartRepository;

    @Autowired
    EmailSenderService emailSenderService;

    @Autowired
    ProductServiceImpl productService;

    @Autowired
    ProductInfoRepository productInfoRepository;

    @Autowired
    ProductInOrderRepository productInOrderRepository;

    @Autowired
    ProductInfoService productInfoService;

    @Autowired
    OrderMainRepository orderMainRepository;

    @Override
    public Cart getCart(User user) {
        return cartRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Not found cart", user.getDisplayName(), user));
    }

    @Override
    public Cart addToCart(ProductInOrder product, User user) {
        Cart cart = user.getCart();
        List<ProductInOrder> productInOrders = cart.getProducts();
        Optional<ProductInOrder> productInOrder = productInOrders.stream().filter(p -> p.getProductId().equals(product.getProductId())).findFirst();

        if (productInOrder.isPresent()){
            ProductInOrder product1 = productInOrder.get();
//            TODO: check xem trong kho còn đủ hàng không
            if (!productService.checkProductEnough(product1.getProductId(), product.getCount() + product1.getCount())) {
                throw new MyException(ResultEnum.PRODUCT_NOT_ENOUGH);
            }else {
                product1.setCount(product1.getCount() + product.getCount());
                productInOrderRepository.save(product1);
            }
        }else {
            product.setCart(cart);
            product.setStatus(false);
            cart.getProducts().add(product);
            productInOrderRepository.save(product);
            cartRepository.save(cart);
        }
        return cart;
    }

    @Override
    @Transactional
    public void delete(Long itemId, User user) {
        if (itemId.equals("") || user == null){
            throw new MyException(ResultEnum.ORDER_STATUS_ERROR);
        }

        var op = user.getCart().getProducts().stream().filter(p -> p.getProductId().equals(itemId)).findFirst();
        op.ifPresent(productInOrder -> {
//            productInOrder.setCart(null);
            productInOrderRepository.deleteByProductInOrderId(productInOrder.getId());
        });
    }

    @Override
    public Cart save(Cart cart) {
        return cartRepository.save(cart);
    }

    @Override
    public OrderMain createOrder(User user, AddressUser addressUser) {
        OrderMain orderMain = new OrderMain(user, addressUser);
        orderMainRepository.save(orderMain);
        user.getCart().getProducts().forEach(productInOrder -> {
            if (productInOrder.getStatus()){
                productInOrder.setCart(null);
                productInOrder.setOrderMain(orderMain);
                productService.decreaseStock(productInOrder.getProductId(), productInOrder.getCount());
                productService.soldProduct(productInOrder.getProductId(), productInOrder.getCount());
                productInOrderRepository.save(productInOrder);
                //emailSenderService.sendMail("dathust165955@gmail.com", "New order", "New Order" + orderMain);
            }
        });
        return orderMain;
    }
}
