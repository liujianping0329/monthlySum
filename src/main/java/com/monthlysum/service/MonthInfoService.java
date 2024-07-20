package com.monthlysum.service;

import com.monthlysum.entity.MonthInfo;
import com.monthlysum.repository.MonthInfoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MonthInfoService {

    private final MonthInfoRepository monthInfoRepository;

    public MonthInfoService(MonthInfoRepository monthInfoRepository) {
        this.monthInfoRepository = monthInfoRepository;
    }
    public List<MonthInfo> findAllItems() {
        return monthInfoRepository.findAll();
    }
}
