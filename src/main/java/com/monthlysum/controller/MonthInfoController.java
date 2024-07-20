package com.monthlysum.controller;

import com.monthlysum.entity.MonthInfo;
import com.monthlysum.service.MonthInfoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/monthInfo")
public class MonthInfoController {

    private final MonthInfoService monthInfoService;

    public MonthInfoController(MonthInfoService monthInfoService) {
        this.monthInfoService = monthInfoService;
    }

    @GetMapping
    public ResponseEntity<List<MonthInfo>> getAllMonthInfos() {
        List<MonthInfo> monthInfoList = monthInfoService.findAllItems();
        return ResponseEntity.ok(monthInfoList);
    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<Item> getItemById(@PathVariable Long id) {
//        Optional<Item> item = itemService.findItemById(id);
//        return item.map(ResponseEntity::ok)
//                .orElseGet(() -> ResponseEntity.notFound().build());
//    }
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
