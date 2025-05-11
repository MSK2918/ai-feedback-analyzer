package com.msk.Sentiment.entity;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.msk.Sentiment.constants.Provider;
import com.msk.Sentiment.constants.Role;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "users")
@ToString
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID userId; // Add an ID for the User entity (primary key)
    private String name;
    private String email;
    private String profilePictureUrl;

    @Enumerated(EnumType.STRING)
    private Provider provider = Provider.GOOGLE;

    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;

    private LocalDateTime createdAt = LocalDateTime.now();
    // CascadeType.ALL ensures that if a user is deleted, all their feedbacks are also deleted
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Feedback> feedbacks;

}
