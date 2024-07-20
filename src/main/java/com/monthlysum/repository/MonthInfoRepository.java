package com.monthlysum.repository;

import com.monthlysum.entity.MonthInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MonthInfoRepository extends JpaRepository<MonthInfo, Long> {

}
