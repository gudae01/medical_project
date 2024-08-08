package com.example.demo.service;

import java.util.Date;
import java.util.function.Function;
import javax.crypto.SecretKey;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import com.example.demo.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParserBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secretKey;

    private SecretKey getSigningKey() {
        try {
            byte[] keyBytes = Decoders.BASE64.decode(secretKey);
            if (keyBytes.length < 32) {
                throw new IllegalArgumentException("The JWT secret key must be at least 256 bits (32 bytes)");
            }
            return Keys.hmacShaKeyFor(keyBytes);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid JWT secret key format", e);
        }
    }

    public String generateToken(User user) {
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        Date expiryDate = new Date(nowMillis + 86400000); // 1일

        return Jwts.builder()
                .subject(user.getUsername())
                .issuedAt(now)
                .expiration(expiryDate)
                .claim("role", user.getRole())
                .signWith(getSigningKey())  // 최신 메서드 사용
                .compact();
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        JwtParserBuilder parserBuilder = Jwts.parser()
                .verifyWith(getSigningKey());
        return parserBuilder.build().parseSignedClaims(token).getPayload();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
}
