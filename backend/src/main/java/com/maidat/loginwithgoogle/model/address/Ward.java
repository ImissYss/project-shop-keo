package com.maidat.loginwithgoogle.model.address;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Ward {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String prefix;

    @ManyToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    private District district;

    @ManyToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    private Province province;
}
