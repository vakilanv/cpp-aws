package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Main application class for the Java backend service.
 */
@SpringBootApplication
@RestController
public final class App {

    /**
     * Main entry point for the Java Spring Boot application.
     *
     * @param args command-line arguments
     */
    public static void main(final String[] args) {
        SpringApplication.run(App.class, args);
    }

    /**
     * Simple endpoint to return a greeting from the Java backend.
     *
     * @return greeting message
     */
    @GetMapping("/java")
    public String helloJava() {
        return "Hello from Java Service";
    }
}
