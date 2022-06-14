package com.maidat.loginwithgoogle.dto;

import com.maidat.loginwithgoogle.model.ImageProduct;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import java.util.List;


@Getter
@Setter

public class InfoShopDTO {

    private String name;

    private List<ImageProduct> logo;

    private List<ImageProduct> imgDescription;

    private String description;

    private String introduce;

    private String phone;

    private String gmail;

    private String address;

    private String linkFanpage;

    private String linkMessage;

    private String linkGoogleMap;

    private String linkShoppe;

    private String linkMap;

    private String linkZalo;
}
