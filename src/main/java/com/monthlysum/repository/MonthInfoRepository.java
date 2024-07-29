package com.monthlysum.repository;

import com.monthlysum.entity.MonthInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Date;
import java.util.List;

public interface MonthInfoRepository extends JpaRepository<MonthInfo, Long> , JpaSpecificationExecutor<MonthInfo> {

    List<MonthInfo> findMonthInfosByMonthBetween(Date monthStart, Date monthEnd);

    List<MonthInfo> findMonthInfosByMonthGreaterThan(Date monthStart);

    List<MonthInfo> findMonthInfosByMonthLessThanOrderByMonthDesc(Date monthEnd);
}
