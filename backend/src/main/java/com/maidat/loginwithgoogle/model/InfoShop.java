package com.maidat.loginwithgoogle.model;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
public class InfoShop implements Serializable {

    private static final long serialVersionUID = 65981149872133526L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shop_id")
    private Long id;



    private String name;

    @OneToMany(cascade = CascadeType.REMOVE, fetch =FetchType.LAZY, mappedBy = "tpshop")
    private List<ImageProduct> logo;

    @OneToMany(cascade = CascadeType.REMOVE, fetch = FetchType.LAZY, mappedBy = "imgDescription")
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
