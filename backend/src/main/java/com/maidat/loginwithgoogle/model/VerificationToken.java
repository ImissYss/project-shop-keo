package com.maidat.loginwithgoogle.model;

import javax.persistence.Entity;

@Entity
public class VerificationToken extends AbstractToken{
    private static final long serialVersionUID = -6551160985498051566L;

    public VerificationToken(String token) {
        super(token);
    }

    public VerificationToken(String token, User user) {
        super(token, user);
    }

    public VerificationToken() {
        super();
    }
}
