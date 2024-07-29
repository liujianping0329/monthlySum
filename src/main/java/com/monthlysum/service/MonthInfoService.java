package com.monthlysum.service;

import com.monthlysum.entity.MonthInfo;
import com.monthlysum.query.MonthInfoQuery;
import com.monthlysum.query.MonthInfoUpsertQuery;
import com.monthlysum.repository.MonthInfoRepository;
import com.monthlysum.util.MyBeanUtils;
import jakarta.persistence.criteria.Predicate;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
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

    public Boolean deleteMonthInfoById(Long id) {
        if (monthInfoRepository.existsById(id)){
            monthInfoRepository.deleteById(id);
            return true;
        }
        else return false;
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
        },Sort.by(Sort.Direction.DESC, "month"));
//        if (monthInfoQuery.getMonthStart() != null && monthInfoQuery.getMonthEnd() == null) {
//            return monthInfoRepository.findMonthInfosByMonthGreaterThan(monthInfoQuery.getMonthStart());
//        } else if (monthInfoQuery.getMonthStart() == null && monthInfoQuery.getMonthEnd() != null) {
//            return monthInfoRepository.findMonthInfosByMonthLessThan(monthInfoQuery.getMonthEnd());
//        } else if (monthInfoQuery.getMonthStart() != null && monthInfoQuery.getMonthEnd() != null) {
//            return monthInfoRepository.findMonthInfosByMonthBetween(monthInfoQuery.getMonthStart(), monthInfoQuery.getMonthEnd());
//        }
//            return monthInfoRepository.findAll();
    }

    public Long upsertMonthInfo(MonthInfoUpsertQuery monthInfoUpsertQuery) {
        if (monthInfoUpsertQuery.getId()  != null) {
            monthInfoRepository.findById(monthInfoUpsertQuery.getId()).ifPresent(monthInfo -> {
                MyBeanUtils.copyNonNullProperties(monthInfoUpsertQuery, monthInfo);
                calData(monthInfo);
                monthInfoUpsertQuery.setId(monthInfoRepository.save(monthInfo).getId());
            });
            return monthInfoUpsertQuery.getId();
        }else {
            MonthInfo monthInfo = new MonthInfo();
            //monthInfoUpsertQuery裡有很多屬性，若一個一個創建拷貝很麻煩
            //↓使用BeanUtils將monthInfoUpsertQuery裡的屬性COPY到monthInfo裡
            BeanUtils.copyProperties(monthInfoUpsertQuery, monthInfo);
            calData(monthInfo);
            return monthInfoRepository.save(monthInfo).getId();
        }
    }

    private void calData(MonthInfo monthInfo) {
        if(monthInfo.getJpMoney() == null || monthInfo.getCnMoney() == null) return;

        monthInfo.setSum(monthInfo.getJpMoney().add(monthInfo.getCnMoney().multiply(monthInfo.getRate())));

        List<MonthInfo> oneMonthAgo = monthInfoRepository.findMonthInfosByMonthLessThanOrderByMonthDesc(monthInfo.getMonth());
        BigDecimal oneMonthAgoTotal = new BigDecimal(0);
        if (!oneMonthAgo.isEmpty() && oneMonthAgo.get(0).getMonth() != null) {
            oneMonthAgoTotal = oneMonthAgo.get(0).getSum();
        }
        monthInfo.setIncrease(monthInfo.getSum().subtract(oneMonthAgoTotal));
    }
}
