package com.kiruthiharan.websocket.controller;

import com.kiruthiharan.websocket.model.ChartData;
import com.kiruthiharan.websocket.service.RandomDataGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller
public class ChartController {
    @Autowired
    private SimpMessagingTemplate template;
    @Autowired
    private RandomDataGenerator dataGenerator;


    @MessageMapping("/chart-init")
    @SendTo("/topic/chart-data")
    public List<ChartData> greeting() throws Exception {
        List<ChartData> chartDataList = new ArrayList<>();
        chartDataList.add(new ChartData(String.valueOf(new Date(1612765800).getTime()), 0));
        chartDataList.add(new ChartData(String.valueOf(new Date(1612766400).getTime()), 0));
        return chartDataList;
    }

}