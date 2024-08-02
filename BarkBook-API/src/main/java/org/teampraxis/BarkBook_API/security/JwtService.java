package org.teampraxis.BarkBook_API.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import javax.crypto.SecretKey;
import java.util.Date;

import org.springframework.stereotype.Service;
import org.teampraxis.BarkBook_API.models.User;

@Service
public class JwtService {

    private SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    @Value("${jwt.secret}")
    private String secretKeyBase64;

    @Value("${jwt.expiration}")
    private long expirationTime;

    public JwtService() {
        if (secretKeyBase64 != null && !secretKeyBase64.isEmpty()) {
            byte[] keyBytes = java.util.Base64.getDecoder().decode(secretKeyBase64);
            this.secretKey = Keys.hmacShaKeyFor(keyBytes);
        }
    }

    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getEmail())
                // .claim("role", user.getRole()) // add if we want roles
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(secretKey)
                .compact();
    }

    public Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    public boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }

    public boolean validateToken(String token, User user) {
        String username = extractUsername(token);
        return (username.equals(user.getEmail()) && !isTokenExpired(token));
    }

}
