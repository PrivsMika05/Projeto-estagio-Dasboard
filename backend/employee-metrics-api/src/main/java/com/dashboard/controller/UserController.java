package com.dashboard.controller;

import com.dashboard.model.User;
import com.dashboard.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
// CORS é tratado globalmente
public class UserController {

    @Autowired
    private UserService userService;

    // Qualquer pessoa pode registar
    @PostMapping("/create")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User created = userService.createUser(user);
        return ResponseEntity.ok(created);
    }

    // Apenas ADMIN pode aceder
    
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }
    
    // Apenas ADMIN pode apagar utilizadores
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    // Para debug ou uso interno
    @GetMapping
    public ResponseEntity<List<User>> getUsers() {
        System.out.println("GET /users foi chamado");
        return ResponseEntity.ok(userService.getAllUsers());
    }
}
