package com.maidat.loginwithgoogle.enums;

import lombok.Getter;

@Getter
public enum ProductStatusEnum implements CodeEnum{
    UP(0, "Availabel"),
    DOWN(1, "Unavailabel")
    ;

    private Integer code;
    private String message;

    ProductStatusEnum(Integer code, String message) {
        this.code = code;
        this.message = message;
    }

    @Override
    public Integer getCode() {
        return code;
    }

    public String getStatus(Integer code){
        for (ProductStatusEnum statusEnum: ProductStatusEnum.values()){
            if (statusEnum.getCode() == code) return statusEnum.message;
        }
        return "";
    }
}
