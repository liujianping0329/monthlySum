package com.monthlysum.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;


@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class MonthSts extends BaseEntity {

    private Long monthInfoId;
    @Column(precision = 10, scale = 2)
    private BigDecimal cnChange;

    @Column(precision = 10, scale = 2)
    private BigDecimal jpChange;

    @Column(precision = 10, scale = 2)
    private BigDecimal totalChange;

}
