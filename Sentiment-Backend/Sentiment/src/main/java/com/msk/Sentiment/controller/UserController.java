package com.msk.Sentiment.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

//     get authenticated user
    @GetMapping("/user")
    public ResponseEntity<?> getAuthenticatedUser (@AuthenticationPrincipal OAuth2User principal) {
        var auth = principal.getAttributes();
        return ResponseEntity.ok().body(auth);
    }







}





