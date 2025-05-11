package com.msk.Sentiment.dto;

import java.util.UUID;

public record FeedbackResponseDTO(
        UUID feedbackId,
        String feedbackText,
        String sentiment,
        Double sentimentScore,
        Double positiveScore,
        Double negativeScore,
        Double neutralScore,
        String timestamp
) {
}
