package com.dromo.sistema_dromo.security;

import java.util.Date;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

// A anotação Component define que esta classe deverá ser gerenciada pelo Spring
// Com isso, podemos injetá-la em outras classes usando a anotação Autowired
@Component
public class JwtUtil {

	/*
	 * A SECRET_KEY é usada para gerar uma assinatura do token, garantindo
	 * que ele não foi adulterado. Essa chave deve ser criptografada por um HMAC
	 * antes que seja gerada a assinatura. mínimo 32 caracteres
	 */
	private final String SECRET_KEY = "umasecretaextremamenteseguraparagerartokens123";
	// Define por quanto tempo o token é válido em milissegundos.
	// Após esse tempo, o token será considerado inválido e não poderá ser usado.
	private final long EXPIRATION_TIME_MS = 1000 * 60 * 60 * 10; // 10 horas

	/*
	 * Método auxiliar que converte a SECRET_KEY em um formato compatível para gerar
	 * a assinatura depois. SecretKey é um tipo específico do Java que representa
	 * uma chave criptográfica simétrica. Precisamos guardar a chave formatada com
	 * esse tipo, pois as bibliotecas jwts só utilizam esse tipo para criar a
	 * assinatura. hmacShaKeyFor é um método estático da classe Keys (biblioteca
	 * JJWT) que usa um algorítmo HMAC (Hash-based Message Authentication Code) para
	 * formatar a SECRET_KEY no formato adequado; e retorna essa chave formatada
	 * como um objeto SecretKey. Esse método só aceita dados em bytes como
	 * argumento. Sendo assim, usamos o método .getBytes que é nativo de String para
	 * converter a SECRET_KEY em bytes.
	 */
	private SecretKey getSigningKey() {
		return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
	}

	/*
	 * É o terceiro ponto-chave da autenticação JWT.
	 * Gera um token (JWT) com o "subject" (email do usuário enviado pelo cliente) e o
	 * retorna como String.
	 * Jwts é a classe principal da biblioteca JJWT para construir JWTs.
	 * Para construir um  JWT, vamos passar ao Jwts as seguintes "claims":
	 * subject (email, no caso): é um identificador do usuário que está solicitando o token;
	 * iat: momento em que o token foi criado em milissegundos e convertido para Date
	 * exp: momento de expiração do token. Será somado os milissegundos da varíavel
	 * EXPIRATION_TIME_MS com o currentTimeMillis (momento atual) e convertido em um Date.
	 * Além das Claims, o Jwts gera uma assinatura no token usando a chave formatada
	 */
	public String generateToken(String subject) {
		return Jwts.builder() // Principal método estático para gerar JWT 
				.subject(subject) // Define a claim sub (subject) usada para gerar o token
				.issuedAt(new Date()) // Define a claim iat, que é a data de criação do token
				// Abaixo será definido o vencimento do token
				.expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME_MS))
				.signWith(getSigningKey())  // instrui o builder a gerar a assinatura do JWT.
				// Pega o retorno de todos os métodos anteriores, codifica, compacta e
				// retorna o token completo em uma String
				.compact();  
	}
	
	/*
	 * Quarto ponto-chave da autenticação e o mais importante.
	 * Depois o token é gerado para o cliente, ele deverá ser autenticado por esse token
	 * em todas as requisições posteriores que ele fizer dentro do sistema.
	 * O método verifyWith é o responsável por verificar se a assinatura do token corresponde
	 * com a chave formatada que geramos antes.
	 * Para fazer a validação, esse método extrae todas as claims do JWT (parâmetro) e
	 * retorna um objeto Claims, que é uma interface da biblioteca JJWT com 
	 * métodos que fazem essa "extração" das claims.
	 */
	private Claims getAllClaims(String token) {
		return Jwts.parser()  // Inicia o processo de "parsing" (leitura e validação) do token
				// Compara a assinatura do token com a chave secreta que criamos antes.
				.verifyWith(getSigningKey())
				.build() //  Torna pronto para executar a operação de parsing.
				.parseSignedClaims(token) // Executa o parsing
				.getPayload(); // Pega todas as claims consolidadas em um objeto Claims
	}
	
	private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = getAllClaims(token);
		return claimsResolver.apply(claims);
	}
	
	/*
	 * Extrai o subject (email) do token
	 * Chama extractClaim, passando dois parâmetros: o token e uma função.
	 */
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
}
