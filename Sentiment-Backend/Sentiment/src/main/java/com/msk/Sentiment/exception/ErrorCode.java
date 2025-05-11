package com.msk.Sentiment.exception;


import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

    GET_FEEDBACKS(400, HttpStatus.BAD_REQUEST, "Failed to get feedbacks"),
    DELETE_FEEDBACK(400, HttpStatus.BAD_REQUEST, "Failed to delete feedback"),
    EMPTY_FEEDBACKS(400, HttpStatus.BAD_REQUEST, "No feedbacks found"),
    UNKNOWN_ATTRIBUTE(400, HttpStatus.BAD_REQUEST, "Please remove Unknown property");

    private final int code;
    private final HttpStatus httpStatus;
    private final String description;

    ErrorCode(int code, HttpStatus httpStatus, String description) {
        this.code = code;
        this.httpStatus = httpStatus;
        this.description = description;
    }
}
