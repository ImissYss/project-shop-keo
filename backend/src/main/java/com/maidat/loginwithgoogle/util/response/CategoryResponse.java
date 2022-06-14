package com.maidat.loginwithgoogle.util.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class CategoryResponse {
    private Integer category_id;
    private String category_name;
    private List<Object> category_children;
}
