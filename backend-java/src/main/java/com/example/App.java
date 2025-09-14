package com.example.backendjava;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BackendController {

    @GetMapping("/java")
    public ResponseEntity<String> getMessage() {
        return ResponseEntity.ok("Hello from Java Backend!");
    }

    @GetMapping("/error")
    public ResponseEntity<String> getError() {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                             .body("Java Backend Error Triggered!");
    }
}