package com.dromo.sistema_dromo.security;

import java.util.Date;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

	private final String SECRET_KEY = "umasecretaextremamenteseguraparagerartokens123"; // mínimo 32 caracteres
	private final long EXPIRATION_TIME_MS = 1000 * 60 * 60 * 10; // 10 horas

	private SecretKey getSigningKey() {
		return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
	}

	// Gera um token com o "subject" (geralmente o ID ou email do usuário)
	public String generateToken(String subject) {
		return Jwts.builder().subject(subject).issuedAt(new Date())
				.expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME_MS)).signWith(getSigningKey())
				.compact();
	}

	// Extrai o subject do token
	public String extractSubject(String token) {
		return extractClaim(token, Claims::getSubject);
	}

	// Valida se o token ainda é válido
	public boolean isTokenValid(String token) {
		try {
			Claims claims = getAllClaims(token);
			return claims.getExpiration().after(new Date());
		} catch (JwtException | IllegalArgumentException e) {
			return false;
		}
	}

	// Utilitários internos

	private Claims getAllClaims(String token) {
		return Jwts.parser().verifyWith(getSigningKey()).build().parseSignedClaims(token).getPayload();
	}

	private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = getAllClaims(token);
		return claimsResolver.apply(claims);
	}
}
