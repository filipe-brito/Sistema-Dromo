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

    @Bean // Define a cadeia de filtros de segurança HTTP
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Desabilita CSRF para APIs RESTful sem estado
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/**").permitAll() // Permite acesso público ao endpoint de autenticação
                .anyRequest().authenticated() // Todas as outras requisições exigem autenticação
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Configura a sessão como stateless (sem estado)
            )
            .authenticationProvider(authenticationProvider()) // NOVO: Usa o provedor de autenticação que configuramos
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class); // Adiciona o filtro JWT antes do filtro padrão de username/password

        return http.build();
    }

    
    @Bean // Define o provedor de autenticação (como Spring Security vai buscar usuários e validar senhas)
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

    // Bean necessário para autenticação se você for usar no AuthService5 futuramente
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
