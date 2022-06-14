package com.maidat.loginwithgoogle.controller;


import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;

import com.maidat.loginwithgoogle.config.AppConstants;
import com.maidat.loginwithgoogle.config.CurrentUser;
import com.maidat.loginwithgoogle.dto.*;
import com.maidat.loginwithgoogle.model.User;
import com.maidat.loginwithgoogle.service.MailService;
import com.nimbusds.oauth2.sdk.pkce.CodeVerifier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.maidat.loginwithgoogle.exception.UserAlreadyExistAuthenticationException;
import com.maidat.loginwithgoogle.security.jwt.TokenProvider;
import com.maidat.loginwithgoogle.service.UserService;
import com.maidat.loginwithgoogle.util.GeneralUtils;

import lombok.extern.slf4j.Slf4j;

import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserService userService;

    @Autowired
    TokenProvider tokenProvider;

    @Autowired
    MailService mailService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.createToken(authentication);
        LocalUser localUser = (LocalUser) authentication.getPrincipal();
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt, GeneralUtils.buildUserInfo(localUser)));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        try {
            User user = userService.registerNewUser(signUpRequest);
            user.setEnabled(false);
            final String token = UUID.randomUUID().toString();
            userService.createVerificationTokenForUser(user, token);
            mailService.sendVerificationToken(token, user);

        } catch (UserAlreadyExistAuthenticationException e) {
            log.error("Exception Ocurred", e);
            return new ResponseEntity<>(new ApiResponse(false, "Email Address already in use!"), HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok().body(new ApiResponse(true, "User registered successfully"));
    }

    @PostMapping("/token/verify")
    public ResponseEntity<?> confirmRegistration(@NotEmpty @RequestBody String token){
        final String result = userService.validateVerificationToken(token);
        return ResponseEntity.ok().body(new ApiResponse(true, result));
    }

    @PostMapping("/token/resetPassword")
    public ResponseEntity<?> confirmResetPassword(@RequestBody FormResetPassword formResetPassword){
        System.out.println(formResetPassword);
        final String result = userService.resetPasswordToken(formResetPassword);
        return ResponseEntity.ok().body(new ApiResponse(true, result));
    }

    @PostMapping("/resetPassword")
    public ResponseEntity<?> resetPassword(@RequestBody ConfirmEmail email){
        System.out.println(email);
        User user = userService.findUserByEmail(email.getEmail());
        if (user == null){
            return new ResponseEntity<>(new ApiResponse(false, "Email Address not exists!" + email), HttpStatus.BAD_REQUEST);
        }
        final String token = UUID.randomUUID().toString();
        userService.createVerificationTokenForUser(user, token);
        mailService.sendMailResetPassword(token, user);
        return ResponseEntity.ok().body(new ApiResponse(true, "User reset password successfully"));

    }

    @PostMapping("/token/resend")
    @ResponseBody
    public ResponseEntity<?> resendRegistrationToken(@NotEmpty @RequestBody String expiredToken){
        if (!userService.resendVerificationToken(expiredToken)){
            return new ResponseEntity<>(new ApiResponse(false, "Token not found!"), HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok().body(new ApiResponse(true, AppConstants.SUCCESS));
    }
}
