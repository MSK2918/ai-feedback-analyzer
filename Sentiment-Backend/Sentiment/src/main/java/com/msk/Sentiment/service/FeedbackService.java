package com.msk.Sentiment.service;


import com.msk.Sentiment.dto.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public interface FeedbackService {
    FeedbackResponseDTO sentFeedbackToFastApi(FeedbackRequestDTO feedback, String email);
    List<FeedbackListResponseDTO> getAllFeedbacksFromUser(String email, int pageNo, int pageSize, String sentiment);
    FeedbackResponseDTO getFeedbackById(UUID feedbackId);
    void deleteFeedback(UUID feedbackId);

    FeedbackCountResponseDTO countFeedbacksByUserId(String email);

    void deleteAllFeedbacks(String email);

    List<MonthlySentimentDTO> getMonthlySentiment(String email);



}
