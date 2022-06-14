package com.maidat.loginwithgoogle.enums;

import lombok.Getter;

@Getter
public enum ReviewStatus {
    OPEN(0, "OPEN"),
    APPROVE(1, "APPROVE"),
    REJECT(2, "REJECT");

    private int code;
    private String message;

    ReviewStatus(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
