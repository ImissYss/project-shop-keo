package com.maidat.loginwithgoogle.enums;

import lombok.Getter;

@Getter
public enum Option implements CodeEnum{
    TUTORIAL(0, "tutorial"),// hướng dẫn
    POLICY(1, "policy"); // chính sách bảo hành, đổi trả

    private int code;
    private String message;

    Option(int code, String message){
        this.code = code;
        this.message = message;
    }
    @Override
    public Integer getCode() {
        return code;
    }

}
