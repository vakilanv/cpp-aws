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

@SpringBootApplication
@RestController
public class App {

    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }

    @GetMapping("/age")
    public Map<String, Integer> calculateAge(@RequestParam String birthdate) {
        LocalDate dob = LocalDate.parse(birthdate);
        int age = Period.between(dob, LocalDate.now()).getYears();
        Map<String, Integer> response = new HashMap<>();
        response.put("age", age);
        return response;
    }
}
