package com.kiruthiharan.websocket.service;

import com.kiruthiharan.websocket.model.ChartData;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Random;

@Component
public class RandomDataGenerator {

    private final Random random = new Random();
    private final int upperBound = 90;
    private final int lowerBound = 10;
    public ChartData getNextData(String currentDate){
        int randomInt = random.nextInt(upperBound) + lowerBound;
        return new ChartData(currentDate, randomInt);
    }
}
