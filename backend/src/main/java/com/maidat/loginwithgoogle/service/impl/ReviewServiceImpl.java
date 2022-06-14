package com.maidat.loginwithgoogle.service.impl;

import com.maidat.loginwithgoogle.dto.ReviewDto;
import com.maidat.loginwithgoogle.enums.ReviewStatus;
import com.maidat.loginwithgoogle.model.ProductInfo;
import com.maidat.loginwithgoogle.model.Rating;
import com.maidat.loginwithgoogle.model.Review;
import com.maidat.loginwithgoogle.model.User;
import com.maidat.loginwithgoogle.repo.RatingRepository;
import com.maidat.loginwithgoogle.repo.ReviewRepository;
import com.maidat.loginwithgoogle.repo.UserRepository;
import com.maidat.loginwithgoogle.service.LocalUserDetailService;
import com.maidat.loginwithgoogle.service.ProductInfoService;
import com.maidat.loginwithgoogle.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    LocalUserDetailService localUserDetailService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    RatingRepository ratingRepository;

    @Autowired
    ProductInfoService productInfoService;

    @Override
    public Review addReview(ReviewDto reviewDto, Principal principal, ProductInfo productInfo) {
        Review review = new Review();
        Rating rating = new Rating();
        review.setContent(reviewDto.getContent());
        review.setTitle(reviewDto.getTitle());
        review.setRating(reviewDto.getRating());
        User user = localUserDetailService.loadUserByUsername(principal.getName()).getUser();
        review.setUser(user);
        review.setProductInfo(productInfo);
        review.setReviewStatus(ReviewStatus.APPROVE);
        productInfoService.updateReviewCount(productInfo, reviewDto.getRating());

        rating.setRating(reviewDto.getRating());
        rating.setProduct(productInfo);
        ratingRepository.save(rating);
        return reviewRepository.save(review);
    }

    @Override
    public List<Review> getAllReview() {
        return reviewRepository.findAll();
    }

    @Override
    public Review getReview(Long review_id) {
        return reviewRepository.findById(review_id).orElseThrow(() -> new UsernameNotFoundException("Not Found Review!"));
    }
}
