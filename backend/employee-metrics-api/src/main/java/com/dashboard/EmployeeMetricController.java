package com.dashboard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/metrics")
@CrossOrigin(origins = "http://localhost:3000") // Permite chamadas do frontend
public class EmployeeMetricController {

    @Autowired
    private EmployeeMetricRepository repository;

    @GetMapping
    public List<EmployeeMetric> getAllMetrics() {
        return repository.findAll();
    }

    @GetMapping("/count")
    public long getCount() {
        return repository.count();
    }

    @PostMapping
    public EmployeeMetric addMetric(@RequestBody EmployeeMetric metric) {
        return repository.save(metric);
    }

    @DeleteMapping("/metrics")
public ResponseEntity<Void> deleteAllMetrics() {
    repository.deleteAll();
    return ResponseEntity.noContent().build();
}

}
