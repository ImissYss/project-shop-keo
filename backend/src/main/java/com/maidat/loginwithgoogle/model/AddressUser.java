package com.maidat.loginwithgoogle.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class AddressUser implements Serializable {
    private static final long serialVersionUID = -3919883511505235030L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String cdw;
    private String specificAdd;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User user;

    private String username;

    private String phone;

//    @OneToMany(fetch = FetchType.LAZY, mappedBy = "address")
//    @JsonIgnore
//    private List<OrderMain> orderMains;

}
