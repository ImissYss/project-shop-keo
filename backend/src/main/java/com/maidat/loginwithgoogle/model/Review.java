package com.maidat.loginwithgoogle.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.maidat.loginwithgoogle.enums.ReviewStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String content;

    private int rating;

    @CreationTimestamp
    private Date createDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private ReviewStatus reviewStatus;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "review")
    private Set<ReviewComment> reviewComments = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnore
    private ProductInfo productInfo;

}
