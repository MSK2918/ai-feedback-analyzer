package com.msk.Sentiment.controller;


import com.msk.Sentiment.dto.FeedbackCountResponseDTO;
import com.msk.Sentiment.dto.FeedbackRequestDTO;
import com.msk.Sentiment.dto.FeedbackResponseDTO;
import com.msk.Sentiment.dto.MonthlySentimentDTO;
import com.msk.Sentiment.entity.Feedback;
import com.msk.Sentiment.service.FeedbackService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class FeedbackController {

    private final FeedbackService feedbackService;
    private static final Logger logger = LoggerFactory.getLogger(FeedbackController.class);

    @RequestMapping(path = "/feedback", method = RequestMethod.POST, name = "save feedback")
    public ResponseEntity<?> saveFeedback(@AuthenticationPrincipal OAuth2User principal, @RequestBody @Valid FeedbackRequestDTO feedback) {
        logger.info("Attempting to save feedback");
        logger.info("got feedbackRequestDTO in controller, now getting authenticated user's email");
        String email = principal.getAttribute("email");
        logger.info("Got user's email, now sending feedbackRequestDTO and user's email to FastAPI spring boot service");
        var feedbackResponse = feedbackService.sentFeedbackToFastApi(feedback, email);
        logger.info("got feedbackResponse from FastAPI spring boot service, now returning feedbackResponse to client");
        logger.info("Feedback saved successfully");
        return ResponseEntity.ok(feedbackResponse);
    }



    @RequestMapping(path = "/feedback", method = RequestMethod.GET, name = "get all feedbacks")
    public ResponseEntity<?> getAllFeedbacks(
            @AuthenticationPrincipal OAuth2User principal,
            @RequestParam int pageNo,
            @RequestParam int pageSize,
            @RequestParam(required = false, defaultValue = "all") String sentiment) {

        logger.info("Attempting to get paginated feedbacks for authenticated user with sentiment filter");

        logger.info("Extracting authenticated user's email");
        String email = principal.getAttribute("email");

        logger.info("Calling service with email={}, pageNo={}, pageSize={}, sentiment={}", email, pageNo, pageSize, sentiment);
        var feedbacks = feedbackService.getAllFeedbacksFromUser(email, pageNo, pageSize, sentiment);

        logger.info("Feedbacks fetched successfully, returning to client");
        return ResponseEntity.ok(feedbacks);
    }






    @RequestMapping(path = "/feedback/{feedbackId}", method = RequestMethod.GET, name = "get feedback by id")
    public ResponseEntity<FeedbackResponseDTO> getFeedbackById(@PathVariable UUID feedbackId) {
        logger.info("Attempting to get feedback by id");
        logger.info("getting feedback by id from FeedbackService");
        var feedback = feedbackService.getFeedbackById(feedbackId);
        logger.info("got feedback from FeedbackService, now returning feedback to client");
        logger.info("Feedback by Id fetched successfully");
        return ResponseEntity.ok().body(feedback);
    }


    @RequestMapping(path = "/feedback/{feedbackId}", method = RequestMethod.DELETE, name = "Delete feedback by id")
    public ResponseEntity<?> DeleteFeedbackById(@PathVariable UUID feedbackId) {
        logger.info("Attempting to delete feedback by id");
        logger.info("passing feedback id to FeedbackService");
        feedbackService.deleteFeedback(feedbackId);
        logger.info("Feedback by Id deleted successfully");
        return ResponseEntity
                .noContent()
                .build();
    }

    // get total feedbacks count of a specific user
    @RequestMapping(path = "/feedback/count", method = RequestMethod.GET, name = "get total feedbacks count of a specific user")
    public ResponseEntity<FeedbackCountResponseDTO> countFeedbacksByUserId(@AuthenticationPrincipal OAuth2User principal) {
        logger.info("Attempting to get total feedbacks count of a specific user");
        logger.info("getting authenticated user's email");
        String email = principal.getAttribute("email");
        logger.info("Got user's email, now sending user's email to FeedbackService");
        FeedbackCountResponseDTO count = feedbackService.countFeedbacksByUserId(email);
        logger.info("got total feedbacks count from FeedbackService, now returning total feedbacks count to client");
        logger.info("Total feedbacks count fetched successfully");
        return ResponseEntity.ok().body(count);
    }

    @RequestMapping(path = "/feedback", method = RequestMethod.DELETE, name = "Delete all feedbacks of a specific user")
    public ResponseEntity<?> deleteFeedbacksByUserId(@AuthenticationPrincipal OAuth2User principal) {
        logger.info("Attempting to delete all feedbacks of a specific user");
        logger.info("getting authenticated user's email");
        String email = principal.getAttribute("email");
        logger.info("Got user's email, now sending user's email to FeedbackService");
        feedbackService.deleteAllFeedbacks(email);
        logger.info("All feedbacks of a specific user deleted successfully");
        return ResponseEntity
                .noContent()
                .build();
    }


    @RequestMapping(path = "/feedback/monthly", method = RequestMethod.GET, name = "get total feedbacks count of a specific user in current month")
    public ResponseEntity<List<MonthlySentimentDTO>> getMonthlySentiment(@AuthenticationPrincipal OAuth2User principal) {
        logger.info("Attempting to get total feedbacks count of a specific user in current month");
        logger.info("getting authenticated user's email");
        String email = principal.getAttribute("email");
        logger.info("Got user's email, now sending user's email to FeedbackService");
        List<MonthlySentimentDTO> monthlySentiment = feedbackService.getMonthlySentiment(email);
        logger.info("got total feedbacks count from FeedbackService, now returning total feedbacks count to client");
        logger.info("Total feedbacks count fetched successfully");
        return ResponseEntity.ok().body(monthlySentiment);
    }
}















