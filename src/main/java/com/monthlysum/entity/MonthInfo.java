package com.monthlysum.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import java.math.BigDecimal;
import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MonthInfo extends BaseEntity {

    @Temporal(TemporalType.DATE)
    private Date month;

    @Column(precision = 10, scale = 2)
    private BigDecimal jpMoney;

    @Column(precision = 10, scale = 2)
    private BigDecimal cnMoney;

    @Column(precision = 10, scale = 2)
    private BigDecimal rate;

    @Column(precision = 10, scale = 2)
    private BigDecimal sum;

    @Column(precision = 10, scale = 2)
    private BigDecimal increase;

}
