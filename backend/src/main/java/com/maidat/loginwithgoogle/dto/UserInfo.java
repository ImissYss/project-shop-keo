package com.maidat.loginwithgoogle.dto;

import com.maidat.loginwithgoogle.enums.SexEnum;
import com.maidat.loginwithgoogle.model.AddressUser;
import lombok.Value;

import java.util.Date;
import java.util.List;


@Value
public class UserInfo {
    private String id, displayName, email;
    private SexEnum sex;
    private String phone;
    private Date dateOfBirth;
    private List<String> roles;
}
