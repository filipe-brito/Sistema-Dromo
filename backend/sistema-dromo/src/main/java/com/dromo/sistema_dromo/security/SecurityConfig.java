package com.dromo.sistema_dromo.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity; // Adicione se não tiver, para @PreAuthorize
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity; // Adicione se não tiver
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.dromo.sistema_dromo.security.user.UserDetailsServiceImpl; // Seu novo UserDetailsServiceImpl

@Configuration // Indica que essa é uma classe de configuração do Spring
@EnableWebSecurity // Habilita a segurança web do Spring Security
@EnableMethodSecurity // Habilita segurança em nível de método (ex: @PreAuthorize)
public class SecurityConfig {

	private final JwtAuthFilter jwtAuthFilter; // Filtro que vai validar o JWT em cada requisição
	private final UserDetailsServiceImpl userDetailsService; // NOVO: Injeta sua implementação de UserDetailsService
	// Construtor que injeta o JwtFilter

	public SecurityConfig(JwtAuthFilter jwtAuthFilter, UserDetailsServiceImpl userDetailsService) {
		this.jwtAuthFilter = jwtAuthFilter;
		this.userDetailsService = userDetailsService;
	}

	/*
	 * A anotação @Bean dentro de uma classe anotada com @Configuration configura
	 * esse método para retornar um objeto que será gerenciado pelo Spring Boot, ou
	 * seja, o próprio Spring executa o método, cria e injeta o objeto de retorno
	 * onde for preciso de forma automática. Em outras palavras, esse é um método
	 * necessário para a autenticação, porém, não precisamos chamá-lo e nem
	 * gerenciar o objeto de retorno em nenhuma outra classe, o próprio Spring Boot
	 * faz isso de forma automática ao iniciar a aplicação. O próprio Spring também
	 * fornece o HttpSecurity do parâmetro do método. Esse método vai retornar um
	 * SecurityFilterChain. É uma classe nativa do SpringSecurity que será
	 * gerenciada pelo próprio Spring. HttpSecurity contém métodos nativos para
	 * criar as "etapas de proteção do sistema" e retornar em um objeto
	 * SecurityFilterChain. Chamamos esses métodos em cadeia para definir como o
	 * SecurityFilterChain do retorno de http deve ser criado.
	 */
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable())
				.authorizeHttpRequests(
						auth -> auth.requestMatchers("/auth/**").permitAll().anyRequest().authenticated())
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authenticationProvider(authenticationProvider())
				.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
		
		/*
		 * ------------------ANÁLISE DOS MÉTODOS-------------------
		 * .csrf: método HttpSecurity para configuração da proteção CSRF. No caso, passamos 
		 * uma expressão lambda como argumento para desabilitar essa proteção, pois ela é 
		 * baseada em uma autenticação de estado, em que libera uma "sessão" para o cliente fazer 
		 * as requisições depois de autenticado; o que não é o nosso caso.
		 * 
		 * .authorizeHttpRequests: A partir desse método que definimos as regras de requisições 
		 * ao sistema.
		 */

		return http.build();
	}

	@Bean // Define o provedor de autenticação (como Spring Security vai buscar usuários e
			// validar senhas)
	public AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
		authProvider.setUserDetailsService(userDetailsService); // Usa seu UserDetailsService
		authProvider.setPasswordEncoder(passwordEncoder()); // Usa seu PasswordEncoder (o bean que vamos criar abaixo)
		return authProvider;
	}

	@Bean // Define o codificador de senhas (BCrypt para hashing)
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(); // Usa a implementação BCrypt para hashear e verificar senhas
	}

	// Bean necessário para autenticação se você for usar no AuthService5
	// futuramente
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}
}
