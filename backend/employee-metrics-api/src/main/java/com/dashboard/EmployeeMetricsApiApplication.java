package com.dashboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EmployeeMetricsApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(EmployeeMetricsApiApplication.class, args);
        System.out.println("API Employee Metrics está rodando!");
    }
}
