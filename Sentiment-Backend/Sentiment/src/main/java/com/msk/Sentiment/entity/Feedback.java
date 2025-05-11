package com.msk.Sentiment.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "feedbacks")
@JsonIgnoreProperties(ignoreUnknown = false)
public class Feedback implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID feedbackId;
    private String feedbackText;
    private String sentiment; // happy, sad, neutral, etc.
    private Double sentimentScore; // optional
    private Double positiveScore;
    private Double negativeScore;
    private Double neutralScore;
    private String timestamp;
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();


    // Many feedbacks belong to one user, hence the ManyToOne relationship
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "userId")  // Ensure proper foreign key reference
    @JsonBackReference
    private User user;

}


