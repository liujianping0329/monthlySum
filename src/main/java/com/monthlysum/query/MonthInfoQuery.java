package com.monthlysum.query;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class MonthInfoQuery {

    @JsonFormat(pattern = "yyyyMMdd", timezone = "GMT+8")
    private Date monthStart;

    @JsonFormat(pattern = "yyyyMMdd", timezone = "GMT+8")
    private Date monthEnd;
}
