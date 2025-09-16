package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
public class App {

    /**
     * Main entry point for the Java Spring Boot application.
     *
     * @param args command-line arguments
     */
    public static void main(final String[] args) {
        SpringApplication.run(App.class, args);
    }

    /**
     * Calculates age in years based on the provided birthdate.
     *
     * @param name      Name of the person
     * @param birthdate Birthdate in ISO format (yyyy-MM-dd)
     * @return Map containing "name" and "age"
     */
    @GetMapping("/age")
    public Map<String, Object> calculateAge(
            final @RequestParam String name,
            final @RequestParam String birthdate) {

        final LocalDate dob = LocalDate.parse(birthdate);
        final int age = Period.between(dob, LocalDate.now()).getYears();

        final Map<String, Object> response = new HashMap<>();
        response.put("name", name);
        response.put("age", age);

        return response;
    }
}
