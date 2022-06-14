package com.maidat.loginwithgoogle.service;

import com.maidat.loginwithgoogle.dto.ReviewDto;
import com.maidat.loginwithgoogle.model.ProductInfo;
import com.maidat.loginwithgoogle.model.Review;

import java.security.Principal;
import java.util.List;

public interface ReviewService {
    Review addReview(ReviewDto reviewDto, Principal principal, ProductInfo productInfo);

    List<Review> getAllReview();

    Review getReview(Long review_id);
}
