package com.msk.Sentiment.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record FeedbackListResponseDTO(
        UUID feedbackId,
        String feedbackText,
        String sentiment,
        Double sentimentScore,
        Double positiveScore,
        Double negativeScore,
        Double neutralScore,
        String timestamp,

        LocalDateTime createdAt
) {
}
