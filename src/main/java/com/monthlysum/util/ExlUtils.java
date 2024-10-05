package com.monthlysum.util;

import com.alibaba.fastjson2.JSONArray;
import com.alibaba.fastjson2.JSONObject;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import java.io.InputStream;

import static org.apache.poi.ss.usermodel.CellType.STRING;

@Component
public class ExlUtils {

    private static final Logger logger = LoggerFactory.getLogger(ExlUtils.class);

    private final ResourceLoader resourceLoader;

    public ExlUtils(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    private static final String filePath = "classpath:recipeDataExl/recipeData.xlsx";

    public JSONObject readExcelFile() {
        JSONObject jsonObject = new JSONObject();
        try (InputStream inputStream = resourceLoader.getResource(filePath).getInputStream()) {
            Workbook workbook = new XSSFWorkbook(inputStream);

            for (int i = 0; i < workbook.getNumberOfSheets(); i++) {
                Sheet sheet = workbook.getSheetAt(i);
                JSONArray jsonObjectSheet = new JSONArray();
                jsonObject.put(sheet.getSheetName(), jsonObjectSheet);
                for (Row row : sheet) {
                    if (row.getRowNum() == 0) {
                        continue;
                    }
                    JSONObject jsonObjectRow = new JSONObject();
                    for (Cell cell : row) {
                        jsonObjectRow.put(sheet.getRow(0).getCell(cell.getColumnIndex()).getStringCellValue()
                                , cell.getCellType() == STRING ? cell.getStringCellValue() : cell.getNumericCellValue());
                    }
                    jsonObjectSheet.add(jsonObjectRow);
                }
            }
            workbook.close();
        } catch (Exception e) {
            logger.error("读取Excel文件时发生错误: {}", e.getMessage(), e);
        }
        return jsonObject;
    }

    public static void main(String[] args) throws Exception {
        // 创建 ResourceLoader 实例
        ResourceLoader resourceLoader = new DefaultResourceLoader();

        // 创建 ExlUtils 实例
        ExlUtils exlUtils = new ExlUtils(resourceLoader);

        // 调用读取 Excel 文件的方法，传入文件名
        JSONObject jsonObject = exlUtils.readExcelFile();// 替换为你的文件名
        System.out.println(jsonObject);
    }

}
