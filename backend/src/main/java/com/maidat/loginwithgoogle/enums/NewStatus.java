package com.maidat.loginwithgoogle.enums;

import lombok.Getter;

@Getter
public enum NewStatus implements CodeEnum{
    OF(0, "off new"),
    ON(1, "publish new");

    private Integer code;
    private String message;

    NewStatus(Integer code, String message){
        this.code = code;
        this.message = message;
    }
    @Override
    public Integer getCode() {
        return code;
    }
}
