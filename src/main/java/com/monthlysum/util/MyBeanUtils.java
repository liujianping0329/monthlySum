package com.monthlysum.util;

import lombok.SneakyThrows;

import java.lang.reflect.Field;

public class MyBeanUtils {

    @SneakyThrows
    public static void copyNonNullProperties(Object source, Object target){
        Field[] sourceFields = source.getClass().getDeclaredFields();
        Field[] targetFields = target.getClass().getDeclaredFields();

        for (Field sourceField : sourceFields) {
            sourceField.setAccessible(true);
            Object value = sourceField.get(source);
            if (value != null) {
                for (Field targetField : targetFields) {
                    if (targetField.getName().equals(sourceField.getName())) {
                        targetField.setAccessible(true);
                        targetField.set(target, value);
                        break;
                    }
                }
            }
        }
    }
}
