package com.maidat.loginwithgoogle.controller;

import com.maidat.loginwithgoogle.dto.ItemForm;
import com.maidat.loginwithgoogle.messages.ResponseMessage;
import com.maidat.loginwithgoogle.model.*;
import com.maidat.loginwithgoogle.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    CartService cartService;

    @Autowired
    ProductInOrderService productInOrderService;

    @Autowired
    ProductInfoService productInfoService;

    @Autowired
    OrderService orderService;

    @Autowired
    LocalUserDetailService localUserDetailService;

    @GetMapping("")
    public Cart getCart(Principal principal){
        User user = localUserDetailService.loadUserByUsername(principal.getName()).getUser();

        return cartService.getCart(user);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody ItemForm itemForm, Principal principal){
        User user = localUserDetailService.loadUserByUsername(principal.getName()).getUser();
        ProductInfo productInfo = productInfoService.findOne(itemForm.getProductId());
        ProductInOrder productInOrder = new ProductInOrder(productInfo, itemForm.getQuantity());

        Cart cart = cartService.addToCart(productInOrder, user);
        return ResponseEntity.ok(cart);
    }

    @PutMapping("/update/{product_in_order_id}")
    public ResponseEntity<?> updateCart(@PathVariable("product_in_order_id") Long product_in_order_id,@RequestBody Integer quantity, Principal principal){
        User user = localUserDetailService.loadUserByUsername(principal.getName()).getUser();
        ProductInOrder product = productInOrderService.updateQuantity(product_in_order_id, quantity, user);
        return ResponseEntity.ok(product);
    }

    @PutMapping("/updateStatus/{product_in_order_id}")
    public ResponseEntity<?> updateStatusCart(@PathVariable("product_in_order_id") Long product_in_order_id,@RequestBody Boolean status, Principal principal){
        User user = localUserDetailService.loadUserByUsername(principal.getName()).getUser();
        ProductInOrder product = productInOrderService.updateStatus(product_in_order_id, status, user);
        return ResponseEntity.ok(product);
    }

    @DeleteMapping("/{product_in_order_id}")
    public void deleteProductInOrder(@PathVariable("product_in_order_id") Long product_in_order_id, Principal principal){
        User user = localUserDetailService.loadUserByUsername(principal.getName()).getUser();
        cartService.delete(product_in_order_id, user);
    }

    @PostMapping("/createOrder")
    public ResponseEntity<?> createOrder(Principal principal, @RequestBody AddressUser addressUser){
        User user = localUserDetailService.loadUserByUsername(principal.getName()).getUser();
        if (addressUser == null){
            return ResponseEntity.badRequest().body(new ResponseMessage("Address can't null"));
        }
        OrderMain orderMain = cartService.createOrder(user, addressUser);
        return ResponseEntity.ok(orderMain);
    }

    @GetMapping("/getOrder/{orderId}")
    public ResponseEntity<?> getOrder(@PathVariable("orderId") Long orderId, Principal principal){
        User user = localUserDetailService.loadUserByUsername(principal.getName()).getUser();
        if (user.getRoles().stream().anyMatch(r -> r.getName().equals("ROLE_ADMIN"))){
            return ResponseEntity.ok(orderService.getOrder(orderId));
        }else if (user.getRoles().stream().anyMatch(r -> r.getName().equals("ROLE_USER"))){
            List<Long> ids = orderService.getOrderIdByUser(user.getEmail());
            if (ids.indexOf(orderId) != -1){
                return ResponseEntity.ok(orderService.getOrder(orderId));
            }else{
                return ResponseEntity.badRequest().body(new ResponseMessage("This order not contain!!!"));
            }
        }
        return ResponseEntity.badRequest().body(new ResponseMessage("You don't customer???"));

    }

    @GetMapping("/getAllOrder")
    public ResponseEntity<?> getAllOrder(Principal principal){
        return ResponseEntity.ok(orderService.getAllOrder(principal));
    }



}
