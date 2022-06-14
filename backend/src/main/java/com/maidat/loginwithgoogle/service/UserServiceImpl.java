package com.maidat.loginwithgoogle.service;

import com.maidat.loginwithgoogle.config.AppConstants;
import com.maidat.loginwithgoogle.dto.FormResetPassword;
import com.maidat.loginwithgoogle.dto.LocalUser;
import com.maidat.loginwithgoogle.dto.SignUpRequest;
import com.maidat.loginwithgoogle.dto.SocialProvider;
import com.maidat.loginwithgoogle.exception.OAuth2AuthenticationProcessingException;
import com.maidat.loginwithgoogle.exception.UserAlreadyExistAuthenticationException;
import com.maidat.loginwithgoogle.model.Cart;
import com.maidat.loginwithgoogle.model.Role;
import com.maidat.loginwithgoogle.model.User;
import com.maidat.loginwithgoogle.model.VerificationToken;
import com.maidat.loginwithgoogle.repo.CartRepository;
import com.maidat.loginwithgoogle.repo.RoleRepository;
import com.maidat.loginwithgoogle.repo.UserRepository;
import com.maidat.loginwithgoogle.repo.VerificationTokenRepository;
import com.maidat.loginwithgoogle.security.oauth2.user.OAuth2UserInfo;
import com.maidat.loginwithgoogle.security.oauth2.user.OAuth2UserInfoFactory;
import com.maidat.loginwithgoogle.util.GeneralUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.*;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    CartService cartService;

    @Autowired
    MailService mailService;

    @Autowired
    private VerificationTokenRepository tokenRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    @Transactional(value = "transactionManager")
    public User registerNewUser(SignUpRequest signUpRequest) throws UserAlreadyExistAuthenticationException {
        if (signUpRequest.getUserID() != null && userRepository.existsById(signUpRequest.getUserID())){
            throw new UserAlreadyExistAuthenticationException("User with User id " + signUpRequest.getUserID() + " already exist");
        }else if (userRepository.existsByEmail(signUpRequest.getEmail())){
            throw new UserAlreadyExistAuthenticationException("User with email id " + signUpRequest.getEmail() + " already exist");
        }
        User user = buildUser(signUpRequest);
        Date now = Calendar.getInstance().getTime();
        user.setCreatedDate(now);
        user.setModifiedDate(now);
        user = userRepository.save(user);
        Cart cart = new Cart();
        cart.setUser(user);
        cartService.save(cart);
        userRepository.flush();
        return user;

    }

    private User buildUser(final SignUpRequest formDTO){
        User user = new User();
        user.setDisplayName(formDTO.getDisplayName());
        user.setEmail(formDTO.getEmail());
        user.setPassword(passwordEncoder.encode(formDTO.getPassword()));
        final HashSet<Role> roles = new HashSet<Role>();
        roles.add(roleRepository.findByName(Role.ROLE_USER));
        user.setRoles(roles);
        if (formDTO.getSocialProvider() != null) {
            user.setProvider(formDTO.getSocialProvider().getProviderType());
        }else {
            user.setProvider(SocialProvider.LOCAL.getProviderType());
        }
//        user.setEnabled(false);
        return user;
    }

    @Override
    public User findUserByEmail(String email) {

        return userRepository.findByEmail(email);
    }

    @Override
    public Optional<User> findUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    @Transactional
    public LocalUser processUserRegistration(String registrationId, Map<String, Object> attributes, OidcIdToken idToken, OidcUserInfo userInfo) throws UserAlreadyExistAuthenticationException {

        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(registrationId, attributes);
        if (StringUtils.isEmpty(oAuth2UserInfo.getName())) {
            throw new OAuth2AuthenticationProcessingException("Name not found from OAuth2 provider");
        } else if (StringUtils.isEmpty(oAuth2UserInfo.getEmail())) {
            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
        }
        SignUpRequest userDetails = toUserRegistrationObject(registrationId, oAuth2UserInfo);
        User user = findUserByEmail(oAuth2UserInfo.getEmail());
        if (user != null) {
            if (!user.getProvider().equals(registrationId) && !user.getProvider().equals(SocialProvider.LOCAL.getProviderType())) {
                throw new OAuth2AuthenticationProcessingException(
                        "Looks like you're signed up with " + user.getProvider() + " account. Please use your " + user.getProvider() + " account to login.");
            }
            user = updateExistingUser(user, oAuth2UserInfo);
        } else {
            user = registerNewUser(userDetails);
            user.setEnabled(true);
        }

        return LocalUser.create(user, attributes, idToken, userInfo);
    }

    @Override
    public void createVerificationTokenForUser(final User user,final String token) {
        final VerificationToken myToken = new VerificationToken(token, user);
        tokenRepository.save(myToken);
    }

    @Override
    @Transactional
    public boolean resendVerificationToken(final String existingVerificationToken) {
        VerificationToken vToken = tokenRepository.findByToken(existingVerificationToken);
        if (vToken != null){
            vToken.updateToken(UUID.randomUUID().toString());
            vToken = tokenRepository.save(vToken);
            mailService.sendVerificationToken(vToken.getToken(), vToken.getUser());
            return true;
        }
        return false;
    }

    @Override
    public String validateVerificationToken(String token) {
        final VerificationToken verificationToken = tokenRepository.findByToken(token);
        if (verificationToken == null){
            return AppConstants.TOKEN_INVALID;
        }
        final User user = verificationToken.getUser();
        final Calendar cal = Calendar.getInstance();
        if ((verificationToken.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {
            return AppConstants.TOKEN_EXPIRED;
        }
        user.setEnabled(true);
        tokenRepository.delete(verificationToken);
        userRepository.save(user);
        return AppConstants.TOKEN_VALID;
    }

    @Override
    public String resetPasswordToken(FormResetPassword formResetPassword) {
        final VerificationToken verificationToken = tokenRepository.findByToken(formResetPassword.getToken());
        if (verificationToken == null){
            return AppConstants.TOKEN_INVALID;
        }
        final User user = verificationToken.getUser();
        user.setPassword(passwordEncoder.encode(formResetPassword.getNewPassword()));
        tokenRepository.delete(verificationToken);
        userRepository.save(user);
        return AppConstants.TOKEN_VALID;
    }

    private User updateExistingUser(User existingUser, OAuth2UserInfo oAuth2UserInfo) {
        existingUser.setDisplayName(oAuth2UserInfo.getName());
        return userRepository.save(existingUser);
    }

    private SignUpRequest toUserRegistrationObject(String registrationId, OAuth2UserInfo oAuth2UserInfo) {
        return SignUpRequest.getBuilder().addDisplayName(oAuth2UserInfo.getName()).addEmail(oAuth2UserInfo.getEmail())
                .addSocialProvider(GeneralUtils.toSocialProvider(registrationId)).addPassword("changeit").build();
    }


}
