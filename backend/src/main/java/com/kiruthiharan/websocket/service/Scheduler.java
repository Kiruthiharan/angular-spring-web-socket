package com.kiruthiharan.websocket.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class Scheduler {
    @Autowired
    private SimpMessagingTemplate template;
    @Autowired
    private RandomDataGenerator dataGenerator;

    @Scheduled(fixedDelay=2000)
    public void publishUpdates(){
        template.convertAndSend("/topic/chart-data",
                dataGenerator.getNextData(String.valueOf(new Date().getTime())));
    }
}
