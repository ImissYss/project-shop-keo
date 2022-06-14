package com.maidat.loginwithgoogle.service.impl;

import com.maidat.loginwithgoogle.dto.CommentDto;
import com.maidat.loginwithgoogle.enums.CommentStatus;
import com.maidat.loginwithgoogle.model.Review;
import com.maidat.loginwithgoogle.model.ReviewComment;
import com.maidat.loginwithgoogle.model.User;
import com.maidat.loginwithgoogle.repo.CommentRepository;
import com.maidat.loginwithgoogle.repo.ReviewRepository;
import com.maidat.loginwithgoogle.repo.UserRepository;
import com.maidat.loginwithgoogle.service.CommentService;
import com.maidat.loginwithgoogle.service.LocalUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
public class CommentServiceImpl implements CommentService {

        @Autowired
        CommentRepository commentRepository;

        @Autowired
        LocalUserDetailService localUserDetailService;

        @Autowired
        UserRepository userRepository;

        @Autowired
        ReviewRepository reviewRepository;

        @Override
        public ReviewComment addComment(CommentDto commentDto, Principal principal, Long review_id) {
            ReviewComment reviewComment = new ReviewComment();
            reviewComment.setContent(commentDto.getContent());
            User user = localUserDetailService.loadUserByUsername(principal.getName()).getUser();
            reviewComment.setUser(user);
            Review review = reviewRepository.findById(review_id).orElseThrow(() -> new UsernameNotFoundException("Not Found Review"));
            reviewComment.setReview(review);
            reviewComment.setCommentStatus(CommentStatus.APPROVE);
            return commentRepository.save(reviewComment);
        }

}
