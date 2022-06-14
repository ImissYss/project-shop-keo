package com.maidat.loginwithgoogle.model.address;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Province {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String code;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "province")
    @JsonIgnore
    private List<District> districts;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "province")
    @JsonIgnore
    private List<Project> projects;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "province")
    @JsonIgnore
    private List<Street> streets;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "province")
    @JsonIgnore
    private List<Ward> wards;
}
