package com.maidat.loginwithgoogle.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class FormResetPassword {
    private String token;
    private String newPassword;

}
