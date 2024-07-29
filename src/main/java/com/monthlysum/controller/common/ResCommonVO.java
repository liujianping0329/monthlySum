package com.monthlysum.controller.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.http.ResponseEntity;

@Data
@AllArgsConstructor
public class ResCommonVO<T> {
    private int status;
    private String message;
    private T data;

    public ResCommonVO(T data) {
        this.status = 200;
        this.data = data;
    }

}
