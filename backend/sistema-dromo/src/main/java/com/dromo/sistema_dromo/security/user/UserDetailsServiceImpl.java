package com.dromo.sistema_dromo.security.user;

import java.util.Collections;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.dromo.sistema_dromo.model.User; // Sua entidade User
import com.dromo.sistema_dromo.repository.UserRepository; // Seu UserRepository

@Service // 1. Diz ao Spring: "Esta é uma classe de serviço, gerencie-a!"
public class UserDetailsServiceImpl implements UserDetailsService { // 3. Implementa a interface UserDetailsService do
																	// Spring Security

	private final UserRepository userRepository; // 4. Aqui, injetamos seu UserRepository para acessar o banco de dados.

	// Construtor MANUAL para injetar UserRepository
	// O Spring Boot vai automaticamente encontrar o UserRepository e passá-lo para
	// este construtor.
	public UserDetailsServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override // 5. Este é o método que o Spring Security vai chamar!
	// Ele pede o 'username' (que para nós será o email do usuário)
	// e deve retornar um objeto UserDetails (o "cartão de identidade" do usuário
	// para o Spring Security)
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

		// 6. Busca o usuário no seu banco de dados usando o email fornecido.
		// O .orElseThrow() significa: se o usuário não for encontrado, lance uma
		// exceção 'UsernameNotFoundException'.
		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado com email: " + email));

		// 7. Converte seu objeto 'User' (que vem do seu modelo) para o formato
		// 'UserDetails' do Spring Security.
		// O Spring Security tem sua própria classe 'User' que implementa 'UserDetails'.
		return new org.springframework.security.core.userdetails.User(user.getEmail(), // Este é o "username" que o
																						// Spring Security espera (para
																						// nós, o email)
				user.getPasswordHash(), // Esta é a SENHA HASHEADA que o Spring Security vai usar para COMPARAR.
				// É CRÍTICO que user.getPassword() retorne a senha JÁ HASHEADA do seu BD.
				Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")) // Este é o lugar para as "autoridades" ou "papéis" (roles) do usuário, ex:
									// "ADMIN", "USER".
									// Por enquanto, uma lista vazia está OK.
		);
	}
}