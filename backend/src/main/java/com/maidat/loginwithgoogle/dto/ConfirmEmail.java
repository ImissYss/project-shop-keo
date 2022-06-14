package com.maidat.loginwithgoogle.dto;

import com.amazonaws.services.dynamodbv2.xspec.S;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ConfirmEmail {
    private String email;
}
