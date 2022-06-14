package com.maidat.loginwithgoogle.controller;

import com.maidat.loginwithgoogle.dto.CommentDto;
import com.maidat.loginwithgoogle.model.ReviewComment;
import com.maidat.loginwithgoogle.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    CommentService commentService;

    @PostMapping("/addComment/{review_id}")
    public ResponseEntity<?> addComment(@RequestBody CommentDto commentDto,
                                        @PathVariable("review_id") Long review_id,
                                        Principal principal){
        ReviewComment reviewComment = commentService.addComment(commentDto, principal, review_id);
        return ResponseEntity.ok(reviewComment);
    }


}
