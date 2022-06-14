package com.maidat.loginwithgoogle.repo;

import com.maidat.loginwithgoogle.model.ReviewComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<ReviewComment, Long> {
}
