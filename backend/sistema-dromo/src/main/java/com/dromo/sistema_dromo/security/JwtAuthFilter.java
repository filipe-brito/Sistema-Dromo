package com.dromo.sistema_dromo.security;

import java.io.IOException;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component // Indica que essa classe é um componente gerenciado pelo Spring (será um
			// "bean")
/*
 * O Spring Security utiliza filtros nas requisições HTTP que ele intercepta. JwtAuthFilter
 * é um filtro personalizado para extrair e validar o token. Esse filtro deve ser o primeiro 
 * a ser utilizado na cadeia de métodos da configuração do Spring Security
 */
public class JwtAuthFilter extends OncePerRequestFilter {
	
	private final JwtUtil jwtUtil; // Injeta a classe JwtUtil (validador de token)
	// NOVO: Injete seu UserDetailsService (o qual você já configurou com ROLE_USER)
	private final UserDetailsService userDetailsService;

	// Construtor para injeção de dependências
	public JwtAuthFilter(JwtUtil jwtUtil, UserDetailsService userDetailsService) {
		this.jwtUtil = jwtUtil;
		this.userDetailsService = userDetailsService;
	}

	@Override // Sobrescreve o método honônimo de OncePerRequestFilter
	/*
	 *  Método mais importante dessa classe e o principal agente na validação do token enviado
	 *  pelo cliente. O SecurityConfig chama essa método para fazer essa validação e definir
	 *  se o cliente estará autenticado ou não. Extendemos a classe OncePerRequestFilter para 
	 *  garantir que esse filtro seja aplicado somente uma vez por requisição.
	 *  
	 *  HttpServletRequest: os dados da requisição são representados por uma instância dessa classe
	 *  HttpServletResponse: Objeto que será retornado
	 *  FilterChain: É a cadeia de filtros que as requisições precisam passar. É através desses 
	 *  filtros que o Spring Security aplica as validações de autenticação
	 */
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		// Pega o cabeçalho "Authorization"
		final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

		// Condicional que verifica se o cabeçalho está ausente ou não possui "Bearer"
		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			filterChain.doFilter(request, response);
			return;
		}

		// Extrai o token JWT (remove "Bearer " dos primeiros 7 caracteres)
		final String token = authHeader.substring(7); // remove "Bearer "

		// Condicional que verifica se o token é valido e que ainda não está expirado
		if (!jwtUtil.isTokenValid(token)) {
			// Se o token for inválido, continua para o próximo filtro (sem autenticação)
			filterChain.doFilter(request, response);
			return;
		}

		// Extrai o email (subject) do token (que é o identificador do usuário)
		final String userEmail = jwtUtil.extractSubject(token);

		// Verifica se o email foi extraído do token E se o usuário ainda não está
		// autenticado no contexto
		// (A segunda parte é importante para evitar reautenticação desnecessária)
		if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {

			// 1. Carrega os detalhes completos do usuário, incluindo as autoridades
			// (roles),
			// usando sua implementação de UserDetailsService (UserDetailsServiceImpl).
			// Isso vai garantir que o Spring Security saiba quais roles o usuário tem.
			UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);

			// 2. Valida novamente o token (para garantir que não expirou entre a extração
			// do subject e agora)
			// E verifica se o email do UserDetails corresponde ao email do token (segurança
			// extra)
			if (jwtUtil.isTokenValid(token) && userDetails.getUsername().equals(userEmail)) {
				// 3. Cria o objeto de autenticação para o Spring Security.
				// AGORA, PASSAMOS as autoridades (roles) do userDetails para o authToken!
				UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, // O
																														// principal
																														// autenticado
																														// é
																														// o
																														// objeto
																														// UserDetails
																														// completo
						null, // Credenciais (senha) são nulas aqui, pois a autenticação já foi feita pelo
								// token
						userDetails.getAuthorities() // <--- ESTE É O PONTO CRÍTICO: PASSANDO AS AUTORIDADES!
				);

				// 4. Adiciona detalhes da requisição ao objeto de autenticação (endereço IP,
				// sessão ID, etc.)
				authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

				// 5. Define o objeto de autenticação no contexto de segurança do Spring.
				// É isso que "autentica" o usuário para esta requisição, permitindo acesso a
				// recursos protegidos.
				SecurityContextHolder.getContext().setAuthentication(authToken);
			}
		}
		
		filterChain.doFilter(request, response);
	}
}
