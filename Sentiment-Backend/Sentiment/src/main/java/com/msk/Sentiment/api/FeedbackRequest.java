package com.msk.Sentiment.api;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FeedbackRequest {
    @JsonProperty("feedback_text")
    private String feedbackText;

}
