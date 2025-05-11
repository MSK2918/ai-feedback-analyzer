package com.msk.Sentiment.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;


@Getter
@Setter
public class MonthlySentimentDTO {
    private String month;
    private Map<String, Double> data;

    public MonthlySentimentDTO(String month, Double positivePercent, Double negativePercent, Double neutralPercent) {
        this.month = month;
        this.data = Map.of(
            month.toLowerCase() + "PositivePercent", positivePercent,
            month.toLowerCase() + "NegativePercent", negativePercent,
            month.toLowerCase() + "NeutralPercent", neutralPercent
        );
    }
}
