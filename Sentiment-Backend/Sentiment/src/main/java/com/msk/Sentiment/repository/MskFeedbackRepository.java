package com.msk.Sentiment.repository;

import com.msk.Sentiment.entity.Feedback;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.keyvalue.repository.KeyValueRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;


@Repository
public interface MskFeedbackRepository extends JpaRepository<Feedback, UUID>, PagingAndSortingRepository<Feedback, UUID> {

    @Query("SELECT f FROM Feedback f WHERE f.user.userId = :userId")
    List<Feedback> findFeedbacksByUserId(UUID userId, Pageable pageable);

    @Query("SELECT f FROM Feedback f WHERE f.user.userId = :userId AND f.sentiment = :sentiment")
    List<Feedback> findFeedbacksByUserIdAndSentiment(@Param("userId") UUID userId, @Param("sentiment") String sentiment, Pageable pageable);


    // total feedbacks of a specific user
    @Query("SELECT COUNT(f) FROM Feedback f WHERE f.user.userId = :userId")
    Integer countFeedbacksByUserId(@Param("userId") UUID userId);


    // total positive feedbacks of a specific user
    @Query("SELECT COUNT(f) FROM Feedback f WHERE f.sentiment = 'Positive' AND f.user.userId = :userId")
    Integer countPositiveFeedbacksByUserId(@Param("userId") UUID userId);


    // total negative feedbacks of a specific user
    @Query("SELECT COUNT(f) FROM Feedback f WHERE f.sentiment = 'Negative' AND f.user.userId = :userId")
    Integer countNegativeFeedbacksByUserId(@Param("userId") UUID userId);


    // total neutral feedbacks of a specific user
    @Query("SELECT COUNT(f) FROM Feedback f WHERE f.sentiment = 'Neutral' AND f.user.userId = :userId")
    Integer countNeutralFeedbacksByUserId(@Param("userId") UUID userId);


    // total feedbacks of a specific user in the current month
    @Query("""
                SELECT COUNT(f)
                FROM Feedback f
                WHERE FUNCTION('MONTH', f.createdAt) = FUNCTION('MONTH', CURRENT_DATE)
                  AND FUNCTION('YEAR', f.createdAt) = FUNCTION('YEAR', CURRENT_DATE)
                  AND f.user.userId = :userId
            """)
    Integer countFeedbacksByUserIdInCurrentMonth(@Param("userId") UUID userId);


    // delete all feedbacks by userId
    @Modifying
    @Transactional
    @Query("DELETE FROM Feedback f WHERE f.user.userId = :userId")
    int deleteFeedbacksByUserId(@Param("userId") UUID userId);


    //    total feedbacks count in a month by a specific user
    @Query("""
                SELECT COUNT(f) FROM Feedback f
                WHERE FUNCTION('MONTH', f.createdAt) = :month
                  AND FUNCTION('YEAR', f.createdAt) = :year
                  AND f.user.userId = :userId
            """)
    int countFeedbacksByUserIdInMonth(@Param("userId") UUID userId, @Param("month") int month, @Param("year") int year);


    // in a specific month count total number of pos, neg, neu feedbacks
    @Query("""
            SELECT COUNT(f) FROM Feedback f
            WHERE FUNCTION('MONTH', f.createdAt) = :month
              AND FUNCTION('YEAR', f.createdAt) = :year
              AND f.sentiment = :sentiment
              AND f.user.userId = :userId
            """)
    int countFeedbacksByUserIdInMonthAndSentiment(@Param("userId") UUID userId, @Param("month") int month, @Param("year") int year, @Param("sentiment") String sentiment);


}


