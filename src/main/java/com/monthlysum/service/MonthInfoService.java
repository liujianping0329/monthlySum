package com.monthlysum.service;

import com.monthlysum.entity.MonthInfo;
import com.monthlysum.query.MonthInfoQuery;
import com.monthlysum.repository.MonthInfoRepository;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static org.springframework.data.domain.ExampleMatcher.GenericPropertyMatchers.endsWith;

@Service
public class MonthInfoService {

    private final MonthInfoRepository monthInfoRepository;

    public MonthInfoService(MonthInfoRepository monthInfoRepository) {
        this.monthInfoRepository = monthInfoRepository;
    }

    public List<MonthInfo> findAllItems() {
        return monthInfoRepository.findAll();
    }

    public Optional<MonthInfo> findItemById(Long id) {
        return monthInfoRepository.findById(id);
    }

    public List<MonthInfo> findMonthInfoByConditions(MonthInfoQuery monthInfoQuery) {

        return monthInfoRepository.findAll((root, criteriaQuery, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();

            if(monthInfoQuery.getMonthStart() != null){
                predicate = criteriaBuilder.and(predicate,criteriaBuilder.greaterThanOrEqualTo(root.get("month"), monthInfoQuery.getMonthStart()));
            }
            if(monthInfoQuery.getMonthEnd() != null) {
                predicate = criteriaBuilder.and(predicate,criteriaBuilder.lessThanOrEqualTo(root.get("month"), monthInfoQuery.getMonthEnd()));
            }
            return predicate;
        });
//        if (monthInfoQuery.getMonthStart() != null && monthInfoQuery.getMonthEnd() == null) {
//            return monthInfoRepository.findMonthInfosByMonthGreaterThan(monthInfoQuery.getMonthStart());
//        } else if (monthInfoQuery.getMonthStart() == null && monthInfoQuery.getMonthEnd() != null) {
//            return monthInfoRepository.findMonthInfosByMonthLessThan(monthInfoQuery.getMonthEnd());
//        } else if (monthInfoQuery.getMonthStart() != null && monthInfoQuery.getMonthEnd() != null) {
//            return monthInfoRepository.findMonthInfosByMonthBetween(monthInfoQuery.getMonthStart(), monthInfoQuery.getMonthEnd());
//        }
//            return monthInfoRepository.findAll();
    }
}
