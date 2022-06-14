package com.maidat.loginwithgoogle.service;

import com.maidat.loginwithgoogle.dto.FormResetPassword;
import com.maidat.loginwithgoogle.dto.LocalUser;
import com.maidat.loginwithgoogle.dto.SignUpRequest;
import com.maidat.loginwithgoogle.exception.UserAlreadyExistAuthenticationException;
import com.maidat.loginwithgoogle.model.AddressUser;
import com.maidat.loginwithgoogle.model.User;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;

import java.security.Principal;
import java.util.Map;
import java.util.Optional;

public interface UserService {

    User registerNewUser(SignUpRequest signUpRequest) throws UserAlreadyExistAuthenticationException;

    User findUserByEmail(String email);

    Optional<User> findUserById(Long id);

    LocalUser processUserRegistration(String registrationId, Map<String, Object> attributes, OidcIdToken idToken, OidcUserInfo userInfo) throws UserAlreadyExistAuthenticationException;

    void createVerificationTokenForUser(User user, String token);

    boolean resendVerificationToken(String token);

    String validateVerificationToken(String token);

    String resetPasswordToken(FormResetPassword formResetPassword);


}
