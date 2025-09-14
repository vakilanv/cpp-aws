package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.Period;
import java.util.HashMap;
import java.util.Map;

/**
 * Main application class for the Java backend service.
 * Provides an endpoint to calculate age from a birthdate.
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
     * Calculates the age in years based on the provided birthdate.
     *
     * @param birthdate birthdate in ISO format (yyyy-MM-dd)
     * @return a map containing the key "age"
     */
    @GetMapping("/age")
    public Map<String, Integer> calculateAge(final String birthdate) {
        final LocalDate dob = LocalDate.parse(birthdate);
        final int age = Period.between(dob, LocalDate.now()).getYears();

        final Map<String, Integer> response = new HashMap<>();
        response.put(
            "age",
            age
        );
        return response;
    }
}

