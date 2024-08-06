package org.teampraxis.BarkBook_API.auth.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.teampraxis.BarkBook_API.models.User;
import org.teampraxis.BarkBook_API.repositories.UserRepository;
import org.teampraxis.BarkBook_API.auth.dto.LoginUserDTO;
import org.teampraxis.BarkBook_API.auth.dto.RegisterUserDTO;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public User register(RegisterUserDTO input) {

        Optional<User> existingUserOpt = userRepository.findByEmail(input.getEmail());

        if (existingUserOpt.isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }

        if (input.getPassword().equals(input.getVerifyPassword())) {
            User newUser = new User();
            String hashedPassword = passwordEncoder.encode(input.getPassword());

            newUser.setEmail(input.getEmail());
            newUser.setDisplayName(input.getDisplayName());
            newUser.setPassword(hashedPassword);

            return userRepository.save(newUser);
        } else {
            throw new IllegalArgumentException("Passwords do not match");
        }
    }

    public User authenticate(LoginUserDTO input) throws AuthenticationException {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );

        return userRepository.findByEmail(input.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found:" + input.getEmail())
        );
    }

    public Map<String, Object> buildLoginResponse(User user) {
        Map<String, Object> response = new HashMap<>();
        long expiration = jwtService.getExpirationTime();
        String token = jwtService.generateToken(user);
        user.setPassword(null);

        response.put("user", user);
        response.put("token", token);
        response.put("expiration", expiration);

        return response;
    }

}
