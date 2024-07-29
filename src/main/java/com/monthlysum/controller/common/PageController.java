package com.monthlysum.controller.common;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PageController {
    @RequestMapping("/{page}")
    public String showPage(@PathVariable("page") String page, Model model) {
        model.addAttribute("pageName", page);
        return page; // 返回与路径变量同名的模板
    }
}
