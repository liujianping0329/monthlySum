package com.monthlysum.query;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class MonthInfoUpsertQuery {

    private Long id;

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date month;

    private BigDecimal jpMoney;

    private BigDecimal cnMoney;

    private BigDecimal rate;

}
