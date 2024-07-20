package com.monthlysum.entity;


import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;


@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class MonthSts extends BaseEntity{

    private Long monthInfoId;

    private Integer cnChange;

    private Integer jpChange;

    private Integer totalChange;

}
