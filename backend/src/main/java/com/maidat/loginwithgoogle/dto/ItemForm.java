package com.maidat.loginwithgoogle.dto;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;

@Data
@NoArgsConstructor
public class ItemForm {

    @Min(value = 1)
    private Integer quantity;
    @NotEmpty
    private Long productId;
}
