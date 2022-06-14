package com.maidat.loginwithgoogle.enums;

import lombok.Getter;

@Getter
public enum OrderStatusEnum implements CodeEnum{
    NEW(0, "New OrderMain"), //chờ xác nhận
    FINISHED(1, "Finished"), // đã hoàn thành
    CANCELED(2, "Canceled"); // đã hủy

    private int code;
    private String message;

    OrderStatusEnum(int code, String message) {
        this.code = code;
        this.message = message;
    }

    @Override
    public Integer getCode() {
        return code;
    }
}
