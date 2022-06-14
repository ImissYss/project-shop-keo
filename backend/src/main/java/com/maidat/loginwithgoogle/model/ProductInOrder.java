package com.maidat.loginwithgoogle.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.*;

@Entity
@Data
@NoArgsConstructor
public class ProductInOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private Cart cart;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id")
    @JsonIgnore
    private OrderMain orderMain;

    private Long productId;

    private String productCode;

    private String productName;

    private Integer discount;

    private String imageProducts;

    @NotNull
    private BigDecimal productPrice;

    @Min(1)
    private Integer count;

    private Boolean status;

    private Integer productStock;

    public ProductInOrder(ProductInfo productInfo, Integer quantity) {
        this.productId = productInfo.getProductId();
        this.productCode = productInfo.getCode();
        this.discount = productInfo.getDiscount();
        this.productStock = productInfo.getCount();
        this.productName = productInfo.getProductName();
        Optional<ImageProduct> image = productInfo.getImageProducts().stream().findFirst();
        if (image.isPresent()) {
            this.imageProducts = image.get().getUrl();
        }
        this.productPrice = productInfo.getProductPrice();
        this.count = quantity;
    }

    @Override
    public String toString() {
        return "ProductInOrder{" +
                "id=" + id +
                ", productId='" + productId + '\'' +
                ", productName='" + productName + '\'' +
                ", productIcon='" + imageProducts + '\'' +
                ", productPrice=" + productPrice +
                ", count=" + count +
                ", discount=" + discount +
                ", productStock=" + productStock +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        ProductInOrder that = (ProductInOrder) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(productId, that.productId) &&
                Objects.equals(productName, that.productName) &&
                Objects.equals(productPrice, that.productPrice)&&
                Objects.equals(discount, that.discount)&&
                Objects.equals(productStock, that.productStock);
    }

    @Override
    public int hashCode() {

        return Objects.hash(super.hashCode(), id, productId, productName, productPrice, discount, productStock);
    }
}