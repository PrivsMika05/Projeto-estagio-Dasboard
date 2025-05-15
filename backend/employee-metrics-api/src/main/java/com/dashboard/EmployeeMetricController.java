package com.dashboard;


import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/metrics")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // Permitir cookies e headers
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

    // NOVO: Apagar uma métrica específica por ID
    @DeleteMapping("/{id}")
    @RolesAllowed("ADMIN") // Apenas ADMIN pode apagar métricas
    public ResponseEntity<Void> deleteMetricById(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Já existente: Apagar todas as métricas
    @DeleteMapping
    @RolesAllowed("ADMIN")
    public ResponseEntity<Void> deleteAllMetrics() {
        repository.deleteAll();
        return ResponseEntity.noContent().build();
    }
}
