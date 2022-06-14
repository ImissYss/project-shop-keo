package com.maidat.loginwithgoogle.repo;

import com.maidat.loginwithgoogle.model.User;
import com.maidat.loginwithgoogle.model.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
    VerificationToken findByToken(String token);

    VerificationToken findByUser(User user);
}
