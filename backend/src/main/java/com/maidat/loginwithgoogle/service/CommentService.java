package com.maidat.loginwithgoogle.service;

import com.maidat.loginwithgoogle.dto.CommentDto;
import com.maidat.loginwithgoogle.model.ReviewComment;

import java.security.Principal;

public interface CommentService {
    ReviewComment addComment(CommentDto commentDto, Principal principal, Long review_id);
}
