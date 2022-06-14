package com.maidat.loginwithgoogle.controller;

import com.maidat.loginwithgoogle.dto.ReviewDto;
import com.maidat.loginwithgoogle.model.ProductInfo;
import com.maidat.loginwithgoogle.model.Review;
import com.maidat.loginwithgoogle.service.ProductInfoService;
import com.maidat.loginwithgoogle.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    ProductInfoService productInfoService;

    @Autowired
    ReviewService reviewService;

    @PostMapping("/addReview/{product_id}")
    public ResponseEntity<?> addReview(@RequestBody ReviewDto reviewDto, @PathVariable("product_id") Long product_id, Principal principal){
        ProductInfo productInfo = productInfoService.getProductById(product_id);
        Review review = reviewService.addReview(reviewDto, principal, productInfo);
        return ResponseEntity.ok(review);
    }

    @GetMapping("/getAllReview")
    public ResponseEntity<?> getAllReview(){
        return ResponseEntity.ok(reviewService.getAllReview());
    }

    @GetMapping("/getReview/{review_id}")
    public ResponseEntity<?> getReview(@PathVariable("review_id") Long review_id){
        return ResponseEntity.ok(reviewService.getReview(review_id));
    }
}
