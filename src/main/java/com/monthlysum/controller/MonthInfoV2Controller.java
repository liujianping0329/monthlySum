package com.monthlysum.controller;

import com.monthlysum.entity.MonthInfo;
import com.monthlysum.query.MonthInfoQuery;
import com.monthlysum.service.MonthInfoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v2/monthInfo")
public class MonthInfoV2Controller {

    private final MonthInfoService monthInfoService;

    public MonthInfoV2Controller(MonthInfoService monthInfoService) {
        this.monthInfoService = monthInfoService;
    }

    @GetMapping
    public ResponseEntity<List<MonthInfo>> getAllMonthInfos() {
        List<MonthInfo> monthInfoList = monthInfoService.findAllItems();
        return ResponseEntity.ok(monthInfoList);
    }

    @PostMapping("/search")
    public ResponseEntity<List<MonthInfo>> getMonthInfoByConditions(@RequestBody MonthInfoQuery monthInfoQuery) {
        List<MonthInfo> monthInfoList = monthInfoService.findMonthInfoByConditions(monthInfoQuery);
        return ResponseEntity.ok(monthInfoList);
    }
    @GetMapping("/{id}")
    public ResponseEntity<MonthInfo> getItemById(@PathVariable("id") Long id) {
        Optional<MonthInfo> monthInfo = monthInfoService.findItemById(id);
        return monthInfo.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


//
//    @PostMapping
//    public ResponseEntity<Item> createItem(@RequestBody Item item) {
//        Item savedItem = itemService.saveItem(item);
//        return ResponseEntity.status(HttpStatus.CREATED).body(savedItem);
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<Item> updateItem(@PathVariable Long id, @RequestBody Item item) {
//        if (!itemService.itemExistsById(id)) {
//            return ResponseEntity.notFound().build();
//        }
//        item.setId(id);
//        Item updatedItem = itemService.saveItem(item);
//        return ResponseEntity.ok(updatedItem);
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
//        if (!itemService.itemExistsById(id)) {
//            return ResponseEntity.notFound().build();
//        }
//        itemService.deleteItemById(id);
//        return ResponseEntity.noContent().build();
//    }
}
