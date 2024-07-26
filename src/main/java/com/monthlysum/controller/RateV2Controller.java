package com.monthlysum.controller;

import com.monthlysum.controller.common.ResCommonVO;
import com.monthlysum.entity.MonthInfo;
import com.monthlysum.query.MonthInfoQuery;
import com.monthlysum.query.MonthInfoUpsertQuery;
import com.monthlysum.service.MonthInfoService;
import com.monthlysum.service.RateService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v2/rate")
public class RateV2Controller {

    private final RateService rateService;

    public RateV2Controller(RateService rateService) {
        this.rateService = rateService;
    }

    @GetMapping
    public ResponseEntity<ResCommonVO<Double>> getRate() {
        return ResponseEntity.ok(new ResCommonVO<>(rateService.getRate()));
    }
}
