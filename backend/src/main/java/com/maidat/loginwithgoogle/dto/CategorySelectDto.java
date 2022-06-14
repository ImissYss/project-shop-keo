package com.maidat.loginwithgoogle.dto;

import com.maidat.loginwithgoogle.interfacesDto.CategoryChild;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategorySelectDto {
    private String name;
    private List<CategoryChild> categoryChildren;


}
