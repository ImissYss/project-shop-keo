package com.maidat.loginwithgoogle.enums;

import lombok.Getter;

@Getter
public enum NotificationStatusEnum {
    UP(1, "up"),
    DOWN(0, "down");

    private int code;
    private String message;


    NotificationStatusEnum(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
