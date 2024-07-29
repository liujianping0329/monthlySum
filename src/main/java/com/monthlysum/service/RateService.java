package com.monthlysum.service;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.client.RestTemplate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
public class RateService {

    @Value("${api.key}")
    private String API_KEY;

    public static String API_URL = String.format("http://op.juhe.cn/onebox/exchange/currency?from=%s&to=%s&version=&key=", "CNY", "JPY");

    private final RestTemplate restTemplate = new RestTemplate();

    public Double getRate() {
        CurrencyResVO response = restTemplate.getForObject(API_URL+ API_KEY, CurrencyResVO.class);
        return response != null ? response.getRate() : null;
    }

    @Data
    private static class CurrencyResVO {
        private static Double defaultRate;
        private int error_code;
        private List<CurrencyVO> result;
        @Data
        private static class CurrencyVO {
            private String currencyF;
            private Double exchange;
        }
        public Double getRate() {
            if(error_code==0){
                BigDecimal rate = new BigDecimal(result.get(0).exchange);
                defaultRate = rate.setScale(2, RoundingMode.HALF_UP).doubleValue();
            }
            return defaultRate;
        }
    }


}
