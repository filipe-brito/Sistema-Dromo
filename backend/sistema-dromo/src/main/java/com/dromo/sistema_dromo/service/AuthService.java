package com.dromo.sistema_dromo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.dromo.sistema_dromo.dto.LoginRequest;
import com.dromo.sistema_dromo.dto.LoginResponse;
import com.dromo.sistema_dromo.dto.UserDTO;
import com.dromo.sistema_dromo.model.User;
import com.dromo.sistema_dromo.repository.UserRepository;
import com.dromo.sistema_dromo.security.JwtUtil;

@Service // Anotação Spring Boot. Declarada na classe para que o Spring trate ela como um
			// service.
public class AuthService {
	@Autowired // Anotação Spring Boot. Faz a injção automática do objeto imediatamente abaixo.
	private UserRepository userRepository; // Classe criada com JPA. Usa métodos nativos para consultas ao bd
	private final JwtUtil jwtUtil;
	private final AuthenticationManager authenticationManager;

	// O construtur abaixo é opcional já que usamos @Autowired no atributo.
	public AuthService(UserRepository userRepository, JwtUtil jwtUtil, AuthenticationManager authenticationManager) {
		this.userRepository = userRepository;
		this.jwtUtil = jwtUtil;
		this.authenticationManager = authenticationManager;
	}

	/*
	 * O método abaixo deva ser o primeiro ponto chave da autenticação no java. Esse
	 * método recebe o email e a senha enviado pelo cliente, faz a consulta no banco
	 * de dados e verifica se o usuário existe e se a senha bate com o que consta no
	 * bd. Caso esteja tudo certo, retorna para o controller os dados que constam no
	 * bd referentes a esse usuário.
	 */
	public LoginResponse authenticate(LoginRequest request) { // O método agora recebe um LoginRequest

		// 1. Tenta autenticar as credenciais do usuário usando o AuthenticationManager.
		// Se a autenticação falhar (usuário não encontrado, senha incorreta, etc.),
		// o AuthenticationManager lançará uma exceção (ex: BadCredentialsException,
		// UsernameNotFoundException).
		// Estas exceções devem ser tratadas pelo ControllerAdvice ou de outra forma no
		// seu projeto.
		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

		// 2. Se a linha acima não lançou uma exceção, significa que o usuário foi
		// autenticado com sucesso.
		// Agora, pegamos os detalhes do usuário autenticado do objeto 'authentication'.
		UserDetails userDetails = (UserDetails) authentication.getPrincipal();

		// 3. O 'userDetails' contém o email (que usamos como username) e a senha
		// hasheada.
		// Para construir o UserDTO de retorno, precisamos do objeto User completo
		// (nome, etc.) do nosso BD.
		User userEntity = userRepository.findByEmail(userDetails.getUsername()).orElseThrow(() -> new RuntimeException(
				"Erro interno: Usuário não encontrado no DB após autenticação bem-sucedida.")); // Isso deve ser muito
																								// raro

		// 4. Gera o token JWT usando o email do usuário.
		String token = jwtUtil.generateToken(userEntity.getEmail());

		// 5. Cria o UserDTO com os dados do usuário para enviar ao frontend.
		UserDTO userDTO = new UserDTO();
		userDTO.setName(userEntity.getName()); // Supondo que sua entidade User tenha um getName()
		userDTO.setEmail(userEntity.getEmail());
		// Adicione outros campos do UserDTO que você deseja retornar (ex: id)

		// 6. Monta o objeto LoginResponse com o UserDTO e o token.
		return new LoginResponse(userDTO, token);
	}

	// Método auxiliar para consultar todos os usuários do Banco de dados
	public List<User> listUsers() {
		return userRepository.findAll();
	}
}
