package com.maidat.loginwithgoogle.controller;

import com.maidat.loginwithgoogle.messages.ResponseMessage;
import com.maidat.loginwithgoogle.model.OrderMain;
import com.maidat.loginwithgoogle.repo.OrderMainRepository;
import com.maidat.loginwithgoogle.service.MessageService;
import com.maidat.loginwithgoogle.service.OrderService;
import com.maidat.loginwithgoogle.service.impl.OrderServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.*;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    OrderServiceImpl orderService;
    @Autowired
    OrderMainRepository orderMainRepository;

    @GetMapping("/getAllOrder")
    public ResponseEntity<?> getAllOrder(){
        return ResponseEntity.ok(orderMainRepository.findAll());
    }

    @PutMapping("/confirmOrder/{orderId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> confirmOrder(@PathVariable("orderId") Long orderId){
        orderService.confirmOrder(orderId);
        return ResponseEntity.ok(new ResponseMessage("Confirm success"));
    }

    @PutMapping("/cancelOrder/{orderId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> cancelOrder(@PathVariable("orderId") Long orderId){
        orderService.cancelOrder(orderId);
        return ResponseEntity.ok(new ResponseMessage("cancel success"));
    }

    @DeleteMapping("/deleteOrder/{orderId}")
    public ResponseEntity<?> deleteOrder(@PathVariable("orderId") Long orderId){
        Optional<OrderMain> orderMain = orderMainRepository.findById(orderId);
        if (!orderMain.isPresent()){
            throw new UsernameNotFoundException("Not found order by id " + orderId);
        }else {
            orderMainRepository.deleteById(orderId);
            return ResponseEntity.ok(new ResponseMessage("Delete success"));
        }
    }


}
