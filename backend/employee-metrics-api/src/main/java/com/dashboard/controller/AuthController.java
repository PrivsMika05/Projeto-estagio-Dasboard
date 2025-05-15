package com.dashboard.controller;

import com.dashboard.model.User;
import com.dashboard.security.JwtUtil;
import com.dashboard.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import com.dashboard.dto.AuthResponse;
import java.util.Map;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user, HttpServletResponse response) {
        try {
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

            UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
            String token = jwtUtil.generateToken(userDetails);

            // Cria o cookie HTTP-only
            ResponseCookie cookie = ResponseCookie.from("jwt", token)
                    .httpOnly(true)
                    .secure(false) // usar true se for HTTPS
                    .path("/")
                    .maxAge(24 * 60 * 60) // 1 dia
                    .sameSite("Lax")
                    .build();

            response.addHeader("Set-Cookie", cookie.toString());

            String role = userDetailsService.getUserByUsername(user.getUsername()).getRole().name();

            return ResponseEntity.ok(new AuthResponse(token, role));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body("Credenciais inválidas");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0) // apaga o cookie
                .sameSite("Lax")
                .build();
        response.setHeader("Set-Cookie", cookie.toString());
        return ResponseEntity.ok("Logout feito com sucesso");
    }
    @GetMapping("/check")
public ResponseEntity<?> checkAuthentication(@CookieValue(name = "jwt", required = false) String token) {
    if (token == null || !jwtUtil.validateToken(token)) {
        return ResponseEntity.status(401).body("Token inválido ou ausente");
    }

    String username = jwtUtil.extractUsername(token);
    User user = userDetailsService.getUserByUsername(username);

    return ResponseEntity.ok().body(Map.of(
        "authenticated", true,
        "username", username,
        "role", user.getRole().name()
    ));
}

    
}
