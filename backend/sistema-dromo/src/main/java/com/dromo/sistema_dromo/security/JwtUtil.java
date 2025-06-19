package com.dromo.sistema_dromo.security;

import java.util.Date;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;

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
	 * antes que seja gerada a assinatura. Mínimo 32 caracteres
	 * 
	 * A anotação @Value buscar um valor em application.properties e atribui 
	 * esse valor para a variável abaixo. Por padrão, o Spring vai procurar 
	 * pela propriedade definida dentro dos parênteses primeiramente nas variáveis 
	 * de ambiente, se não houver, ele procura no arquivo application.properties;
	 * se não houver em nenhuma das duas, ele dá erro
	 */
	@Value("${security.jwt.secretkey}")
	private String SECRET_KEY;

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
	 * iat: momento em que o token foi criado em milissegundos e convertido para Date;
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
	 * Esse método, basicamente extrai todas as claims de um token e os retorna em um objeto
	 * Claims.
	 * Depois o token é gerado para o cliente, o usuário deverá ser autenticado por esse token
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
	
	/*
	 * Aqui estamos aplicando o conceito de Generics no java.
	 * <T> declara que esse método se trata de um generic, ou seja,
	 * o tipo do retorno será definido por quem chamar o método.
	 * claimsResolver é um parâmetro que recebe uma função como valor, cuja a entrada desse função
	 * deve ser do tipo Claims e a saída será de um tipo ainda não definido.
	 * .apply é um método da interface Function que simplesmente executa a função.
	 */
	private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = getAllClaims(token); // Separa todas as claims do token
		return claimsResolver.apply(claims); // Executa claimsResolver passando as claims como parâmetro
	}
	
	/*
	 * Extrai o subject (email) do token
	 * Chama extractClaim, passando dois parâmetros: o token e a função Claim para extrair o subject.
	 * getSubject sempre retorna uma String, nesse ponto, definimos que o retorno de extractClaim 
	 * será uma String também.
	 * Claims::getSubject se trata de uma referência de método, onde precisamos informar objeto Claim
	 * como argumento para executar o método getSubject
	 */
	public String extractSubject(String token) {
		return extractClaim(token, Claims::getSubject);
	}

	/*
	 * Método de entrada da classe para validação do token.
	 * Valida se o token ainda é válido.
	 * A validação ocorre no método getExpiration de Claims, que extrai a claim exp do token.
	 * new Date() cria um novo objeto Date com a data atual do sistema.
	 * O método .after verifica se o Date da claim exp é posterior ao Date com a data atual.
	 * Caso true, significa que o token não está expirado ainda, caso false, o token já
	 * expirou e é inválido.
	 * Se algum erro ocorrer com getAllClaims, será lançada a exceção JwtException ou
	 * IllegalArgumentException, retornando false.
	 */
	public boolean isTokenValid(String token) {
		try {
			// Chama getAllClaims para extrair todas as claims do token
			Claims claims = getAllClaims(token);
			return claims.getExpiration().after(new Date());
		} 
		/*
		 *  Para capturar múltiplas exceções em um único bloco catch, usamos o multi-catch,
		 *  bastando separar as exceções por pipes "|"
		 */
		catch (JwtException | IllegalArgumentException e) {
			return false;
		}
	}
}
