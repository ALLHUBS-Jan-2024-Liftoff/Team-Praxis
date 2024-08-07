package org.teampraxis.BarkBook_API.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.teampraxis.BarkBook_API.models.User;
import org.teampraxis.BarkBook_API.auth.dto.LoginUserDTO;
import org.teampraxis.BarkBook_API.auth.dto.RegisterUserDTO;
import org.teampraxis.BarkBook_API.auth.service.AuthService;

import java.util.Map;
@RequestMapping("auth")
@RestController
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody RegisterUserDTO registerUserDto) {
        User user = authService.register(registerUserDto);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody LoginUserDTO loginUserDto) {
        User user = authService.authenticate(loginUserDto);
        Map<String, Object> response = authService.buildLoginResponse(user);

        return ResponseEntity.ok(response);
    }

}
