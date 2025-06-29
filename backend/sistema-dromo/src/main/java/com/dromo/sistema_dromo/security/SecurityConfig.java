package com.dromo.sistema_dromo.security;

import java.util.List;

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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

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
				.cors(cors -> cors.configurationSource(corsConfigurationSource()))
				.authorizeHttpRequests(
						auth -> auth.requestMatchers("/auth/login").permitAll()
						.anyRequest().authenticated())
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authenticationProvider(authenticationProvider())
				.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
		
		/*
		 * ------------------ANÁLISE DA CADEIA DE MÉTODOS----------
		 * .csrf: método HttpSecurity para configuração da proteção CSRF. No caso, passamos 
		 * uma expressão lambda como argumento para desabilitar essa proteção, pois ela é 
		 * baseada em uma autenticação de estado, em que libera uma "sessão" para o cliente fazer 
		 * as requisições depois de autenticado; o que não é o nosso caso.
		 * 
		 * --------------------------------------------------------
		 * 
		 * .authorizeHttpRequests: A partir desse método que definimos as regras de requisições 
		 * ao sistema. Passamos uma expressão lambda e os métodos que definem as regras.
		 * auth: parâmetro que será criado e gerenciado pelo Spring
		 * 
		 * .requestMatchers: passamos como argumento as rotas que queremos configurar com o método
		 * seguinte
		 * 
		 * .permitAll: Regra que será aplicada nas rotas definidas em requestMatchers. No caso,
		 * permitAll não impõe nenhuma restrição e a rota é definida como "pública".
		 * 
		 * .anyRequest: método que seleciona todas as requisições feitas nas rotas não mencionadas 
		 * em requestMatchers para aplicarmos a regra do método seguinte
		 * 
		 * .authenticated: quinto ponto chave da autenticação. Define para o anyRequest que todas
		 *  as requisições para todas as rotas não mencionandas em requestMatchers devem estar 
		 *  autorizadas.
		 *  
		 *  ------------------------------------------------------
		 *  
		 *  sessionManagement: Método para configurar "sessões HTTP" no Spring Security.
		 *  session: objeto configurador criado e gerenciado pelo Spring Security no início da 
		 *  aplicação.
		 *  sessionCreationPolicy: método de session para definir a política de criação de sessão
		 *  SessionCreationPolicy.STATELESS: o STATELESS define que não teremos "sessões" HTTP, já 
		 *  que esse procedimento não é aplicável em autenticação JWT.
		 *  
		 *  .authenticationProvider: Sexto ponto chave. Aqui nós definimos quem será o responsável
		 *  por autenticar a requisição. Passamos para esse método o método bean 
		 *  authenticationProvider que criamos nessa classe. Lá passamos o userDetailsService que
		 *  contém a lógica para buscar os dados do cliente no banco de dados (novamente).
		 *  
		 *  .addFilterBefore: Sétimo ponto chave e um dos principais. Essa método que inclui a 
		 *  nossa lógica de validação do token (JwtAuthFilter) na cadeia de autenticação do 
		 *  Spring Security.
		 *  .jwtAuthFilter: Filtro que pega as claims do token da requisição e verifica tudo 
		 *  (o usuário, expiração, data de criação). Se estiver tudo certo, o objeto Autentication 
		 *  será true. Passamos ele como primeiro argumento para que seja executado antes dos 
		 *  filtros padrão do Spring Security.
		 *  UsernamePasswordAuthenticationFilter.class: Filtro padrão do Spring Security. 
		 */

		return http.build(); // Devolve um SecurityFilterChain com as configurações acima aplicadas
	}
	
	/*
	 * O próprio Sring Boot executa esse método e cria a instância de AuthenticationProvider 
	 * para usar no securityFilterChain.
	 * Esse método que importa a lógica de validação da senha nesta classe de configuração.
	 * AuthenticationProvider é justamente uma interface do Spring Security que recebe essa lógica,
	 * executa e aplica nas configurações com base nas credenciais (login e senha) informados 
	 * pelo cliente na requisição.
	 * O DaoAuthenticationProvider é quem cria o objeto concreto usando userDetailService (busca
	 *  os dados do usuário) e passwordEncoder ("comparador" de senhas hasheadas).
	 */
	@Bean 	
	public AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
		authProvider.setUserDetailsService(userDetailsService); // Usa seu UserDetailsService
		authProvider.setPasswordEncoder(passwordEncoder()); // Usa seu PasswordEncoder (o bean que vamos criar abaixo)
		return authProvider;
		
		/*
		 * AuthenticationProvider: Interface para definir o contrato do objeto que vai fazer
		 * a autenticação do usuário e da senha.
		 * DaoAuthenticationProvider: Objeto concreto com métodos específicos para verificar 
		 * o usuário e a senha.
		 * .setUserDetailsService: Método da classe DaoAuthenticationProvider para buscar 
		 * os dados do usuário.
		 * userDetailsService: argumento do setUserDetailsService. É a classe que criamos para
		 * buscar os dados do usuário no banco de dados. O Spring Boot injeta esse objeto
		 * automaticamente.
		 * .setPasswordEncoder: Método do DaoAuthenticationProvider que recebe a senha do cliente 
		 * que será comparada a senha que consta no banco de dados. Lembrando que esse senha é 
		 * hasheada, então, o setPasswordEncoder aplica o hash na senha bruta do cliente para 
		 * hash e comparada com o hash do banco de dados.
		 * passwordEncoder(): é o método que passamos ao setPasswordEncoder. Ele contém a lógica 
		 * para comparar a senha bruta recebida do cliente com a senha buscada no banco de dados. 
		 * Se os "hash" da senha do usuário no banco de dados bater com a senha fornecida pelo 
		 * cliente, retorna true.
		 */
	}
	
	@Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173", "https://dromo.filipixel.com"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

	@Bean // Define o codificador de senhas (BCrypt para hashing)
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(); // Usa a implementação BCrypt para hashear e verificar senhas
	}

	// Bean necessário para autenticação se você for usar no AuthService futuramente
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}
}
