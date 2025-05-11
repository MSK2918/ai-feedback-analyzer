package com.msk.Sentiment.handler;


import com.fasterxml.jackson.databind.exc.UnrecognizedPropertyException;
import com.msk.Sentiment.exception.ErrorCode;
import com.msk.Sentiment.exception.ExceptionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashSet;
import java.util.Set;

@RestControllerAdvice
public class GlobalExceptionHandler {


    // for field validation exception messages
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponse> handleException(MethodArgumentNotValidException e) {
        Set<String> errors = new HashSet<>();
        e.getBindingResult().getAllErrors()
                .forEach(err -> {
                    var errorMessage = err.getDefaultMessage();
                    errors.add(errorMessage);
                });
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(
                        ExceptionResponse.builder()
                                .validationErrors(errors)
                                .build()
                );
    }

    @ExceptionHandler(UnrecognizedPropertyException.class)
    public ResponseEntity<ExceptionResponse> handleException(UnrecognizedPropertyException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(
                        ExceptionResponse.builder()
                                .errorCode(ErrorCode.UNKNOWN_ATTRIBUTE.getCode())
                                .errorDescription(ErrorCode.UNKNOWN_ATTRIBUTE.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }



    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionResponse> handleException(Exception e) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(
                ExceptionResponse.builder()
                        .errorDescription("Something went wrong!, Please try again later")
                        .build()
                );
    }
}
