package com.msk.Sentiment.api;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Map;

@Getter
@Setter
public class GreetResponse {
    @JsonProperty("original_text")
    private String originalText;
    @JsonProperty("translated_text")
    private String translatedText;
    @JsonProperty("sentiment")
    private String sentiment;

    @JsonProperty("scores")
    private Map<String, Double> scores;
    @JsonProperty("timestamp")
    private String timestamp;
}
