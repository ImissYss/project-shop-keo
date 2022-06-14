package com.maidat.loginwithgoogle.enums;

import lombok.Getter;

@Getter
public enum ImageStatus implements CodeEnum{
    UP(0, "Availabel"),
    DOWN(1, "Unavailabel"),
    SHOP(2, "Shop");

    private Integer code;
    private String message;

    ImageStatus(Integer code, String message){
        this.code = code;
        this.message = message;
    }
    @Override
    public Integer getCode() {
        return code;
    }
}
