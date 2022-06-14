package com.maidat.loginwithgoogle.dto;

import com.maidat.loginwithgoogle.model.ImageProduct;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.OneToMany;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ReviewDto {

    private String title;

    private String content;

    private Integer rating;

    private List<ImageProduct> imageProducts;
}
