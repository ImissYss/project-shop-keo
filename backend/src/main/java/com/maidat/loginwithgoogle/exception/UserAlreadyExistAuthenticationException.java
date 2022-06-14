package com.maidat.loginwithgoogle.exception;

import org.apache.tomcat.websocket.AuthenticationException;

public class UserAlreadyExistAuthenticationException extends AuthenticationException {

    private static final long serialVersionUID = 5570981880007077317L;

    public UserAlreadyExistAuthenticationException(String message) {
        super(message);
    }
}
