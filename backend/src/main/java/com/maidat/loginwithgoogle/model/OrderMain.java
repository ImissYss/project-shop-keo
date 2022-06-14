package com.maidat.loginwithgoogle.model;

import com.maidat.loginwithgoogle.enums.OrderStatusEnum;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Entity
@Data
@NoArgsConstructor
@DynamicUpdate
public class OrderMain implements Serializable {

    private static final long serialVersionUID = -3819883511505235030L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long orderId;

    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "orderMain")
    private List<ProductInOrder> products = new ArrayList<>();


    private String buyerEmail;

    private String buyerName;


    private String buyerPhone;

//    @ManyToOne(fetch = FetchType.LAZY)
//    private AddressUser address;
    private String cdw;

    private String userNameReceive;

    private String userPhoneReceive;


    private String specialAddress;

    @NotNull
    private BigDecimal orderAmount;

    @NotNull
    @ColumnDefault("0")
    private Integer orderStatus;

    @CreationTimestamp
    private LocalDateTime createTime;

    @UpdateTimestamp
    private LocalDateTime updateTime;

    public OrderMain(User buyer, AddressUser address) {
        this.buyerEmail = buyer.getEmail();
        this.buyerName = buyer.getDisplayName();
        if(buyer.getPhone() == null){
            this.buyerPhone = address.getPhone();
        }else{
            this.buyerPhone = buyer.getPhone();
        }
        this.userPhoneReceive = address.getPhone();
        this.userNameReceive = address.getUsername();
        this.cdw = address.getCdw();
        this.specialAddress = address.getSpecificAdd();
        this.orderAmount = buyer.getCart().getProducts().stream().filter(p -> p.getStatus()).map(item -> (item.getProductPrice().subtract(item.getProductPrice().multiply(BigDecimal.valueOf(item.getDiscount()).divide(BigDecimal.valueOf(100))))).multiply(new BigDecimal(item.getCount())))
                .reduce(BigDecimal::add)
                .orElse(new BigDecimal(0));
        this.orderStatus = OrderStatusEnum.NEW.getCode();
    }
}