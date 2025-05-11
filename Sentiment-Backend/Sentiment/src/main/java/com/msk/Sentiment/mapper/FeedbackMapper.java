package com.msk.Sentiment.mapper;


import com.msk.Sentiment.dto.FeedbackRequestDTO;
import com.msk.Sentiment.dto.FeedbackListResponseDTO;
import com.msk.Sentiment.dto.FeedbackResponseDTO;
import com.msk.Sentiment.entity.Feedback;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class FeedbackMapper {

    public Feedback feedbackDtoToFeedback (FeedbackRequestDTO feedbackRequestDTO) {

        if(feedbackRequestDTO == null) {
            throw new NullPointerException("Feedback DTO is null");
        }
        return new Feedback();
    }

    public FeedbackResponseDTO feedbackToFeedbackResponseDTO (Feedback feedback) {

        if (feedback == null) {
            throw new NullPointerException("Feedback is null");
        }
        return new FeedbackResponseDTO(
                feedback.getFeedbackId(),
                feedback.getFeedbackText(),
                feedback.getSentiment(),
                feedback.getSentimentScore(),
                feedback.getPositiveScore(),
                feedback.getNegativeScore(),
                feedback.getNeutralScore(),
                feedback.getTimestamp()
        );
    }


    public List<FeedbackListResponseDTO> feedbackToFeedbackResponseDTO(List<Feedback> feedbacks) {

        if (feedbacks == null) {
            throw new NullPointerException("Feedback list is null");
        }

        return feedbacks.stream()
                .map(feedback -> new FeedbackListResponseDTO(
                        feedback.getFeedbackId(),
                        feedback.getFeedbackText(),
                        feedback.getSentiment(),
                        feedback.getSentimentScore(),
                        feedback.getPositiveScore(),
                        feedback.getNegativeScore(),
                        feedback.getNeutralScore(),
                        feedback.getTimestamp(),
                        feedback.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }

}
