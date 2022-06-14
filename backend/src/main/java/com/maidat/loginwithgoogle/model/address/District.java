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
public class District {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String prefix;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private Province province;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "district")
    @JsonIgnore
    private List<Project> projects;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "district")
    @JsonIgnore
    private List<Street> streets;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "district")
    @JsonIgnore
    private List<Ward> wards;

}
