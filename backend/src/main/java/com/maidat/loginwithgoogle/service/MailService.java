package com.maidat.loginwithgoogle.service;

import com.maidat.loginwithgoogle.model.User;

public interface MailService {
    void sendVerificationToken(String token, User user);
    void sendMailResetPassword(String token, User user);
}
