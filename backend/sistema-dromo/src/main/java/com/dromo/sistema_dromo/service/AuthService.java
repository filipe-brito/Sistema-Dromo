package com.dromo.sistema_dromo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import com.dromo.sistema_dromo.model.User;
import com.dromo.sistema_dromo.repository.UserRepository;

@Service // Anotação Spring Boot. Declarada na classe para que o Spring trate ela como um
			// service.
public class AuthService {
	@Autowired // Anotação Spring Boot. Faz a injção automática do objeto imediatamente abaixo.
	private UserRepository userRepository; // Classe criada com JPA. Usa métodos nativos para consultas ao bd

	// O construtur abaixo é opcional já que usamos @Autowired no atributo.
	public AuthService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	/*
	 * O método abaixo deva ser o primeiro ponto chave da autenticação no java. Esse
	 * método recebe o email e a senha enviado pelo cliente, faz a consulta no banco
	 * de dados e verifica se o usuário existe e se a senha bate com o que consta no
	 * bd. Caso esteja tudo certo, retorna para o controller os dados que constam no
	 * bd referentes a esse usuário.
	 */
	public User authenticate(String email, String password) {
		// Optional é um Wrapper que previne o NullPointerException. Basicamente,
		// permite que o método retorno null
		// findByEmail faz a consulta no banco pelo email e guarda a resposta (registro
		// users
		// do bd) em uma entidade User do java
		Optional<User> response = userRepository.findByEmail(email);

		// Caso não seja encontrado um usuário com o email informado pelo cliente,
		// lançamos
		// uma exceção usando o método .isEmpty do Object, e o método authenicate para
		// de executar.
		if (response.isEmpty()) {
			throw new RuntimeException("Usuário não encontrado");
		}

		// Esse .get da classe Object retorna o conteúdo que foi guardado em response e
		// desserializa para um objeto User
		User user = response.get();

		/*
		 * Aqui acho que temos o segundo ponto chave da autenticação. A variável abaixo
		 * verifica se a senha enviada pelo cliente é a mesma do banco de dados. Essa
		 * variável usa o método .checkpw do BCrypt. Lembrando que a senha armazenada no
		 * banco de dados está criptografada. BCrypt é uma biblioteca Spring Boot que
		 * converte uma String pura (senha do cliente no primeiro argumento) para uma
		 * senha criptografada (hash) e compara com a senha armazenada no BD (segundo
		 * argumento que também é um hash).
		 */
		boolean validatePassword = BCrypt.checkpw(password, user.getPasswordHash());

		// Caso a verificação retorne false, lançamos uma exceção e a autenticação falha
		if (!validatePassword) {
			throw new RuntimeException("Senha incorreta");
		}
		;

		// Caso a verificação retorno true, retornamos a entidade com os dados
		return user;
	}

	// Método auxiliar para consultar todos os usuários do Banco de dados
	public List<User> listUsers() {
		return userRepository.findAll();
	}
}
