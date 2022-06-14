package com.maidat.loginwithgoogle.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.maidat.loginwithgoogle.enums.SexEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "credit_user")
public class User implements Serializable  {
    private static final long serialVersionUID = 65981149772133526L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_ID")
    private Long id;

    private String phone;


    @Column(name = "PROVIDER_USER_ID")
    private String providerUserId;

    private String email;

    private SexEnum sex;

    private Date dateOfBirth;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<AddressUser> address;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "user")
    @JsonIgnore
    private Set<Review> reviews = new HashSet<>();

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private Cart cart;

    @Column(length = 1)
    private boolean enabled;

    @Column(name = "DISPLAY_NAME")
    private String displayName;

    @Column(name = "created_date", nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    protected Date createdDate;

    @Temporal(TemporalType.TIMESTAMP)
    protected Date modifiedDate;

    private String password;

    private String provider;

    @ManyToMany
    @JsonIgnore
    @JoinTable(name = "user_notification",
                joinColumns = {@JoinColumn(name = "USER_ID")},
                inverseJoinColumns = {@JoinColumn(name = "NOTIFICATION_ID")})
    private Set<Notification> notifications;

    @JsonIgnore
    @ManyToMany
    @JoinTable(name = "user_role", joinColumns = { @JoinColumn(name = "USER_ID") }, inverseJoinColumns = { @JoinColumn(name = "ROLE_ID") })
    private Set<Role> roles;
}
