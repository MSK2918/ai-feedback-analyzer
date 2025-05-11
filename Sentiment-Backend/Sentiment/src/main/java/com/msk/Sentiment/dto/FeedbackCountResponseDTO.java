package com.msk.Sentiment.dto;

public record FeedbackCountResponseDTO(
        Integer count,
        Integer positiveCount,
        Integer negativeCount,
        Integer neutralCount,
        Integer feedbackCountInCurrentMonth,

        double countPercentage
) {
}
