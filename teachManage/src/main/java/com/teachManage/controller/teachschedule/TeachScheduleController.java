package com.teachManage.controller.teachschedule;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("teachSchedule")
public class TeachScheduleController {

    @RequestMapping("teachSchedule")
    public String teachSchedule(){
        return "teachSchedule/teachschedule";
    }
}
