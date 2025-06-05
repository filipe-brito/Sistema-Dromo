package com.dromo.sistema_dromo.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dromo.sistema_dromo.dto.LoginRequest;
import com.dromo.sistema_dromo.dto.UserDTO;
import com.dromo.sistema_dromo.model.User;
import com.dromo.sistema_dromo.security.JwtUtil;
import com.dromo.sistema_dromo.service.AuthService;

/*	*Essa é a porta de entrada do sistema. As rotas definidas aqui farão a autenticação do usuário.
	*A autenticação será feita com JWT (JSON Web Token), que é uma padrão para a criação de tokens seguros.
	*Quando a requisição é feita, deve-se enviar no corpo o email e a senha, será retornado um token JWT.
	*Uma vez que o cliente recebe o JWT, ele deve incluí-lo em todas as requisições subsequentes para rotas 
	que exigem autenticação.
	* O backend então intercepta essa requisição, valida o JWT (verifica a assinatura, a expiração, etc.) 
	e, se válido, permite o acesso à rota.
*/

@RestController // Spring Boot definirá essa classe como um controller
@RequestMapping("/auth") // define o parâmetro da url para requisitar à esse controller
public class AuthController {
	@Autowired // Spring Boot fará a injeção de dependência desses atributos automaticamente
	private final AuthService authService;
	private final JwtUtil jwtUtil;

	public AuthController(AuthService authService, JwtUtil jwtUtil) {
		this.authService = authService;
		this.jwtUtil = jwtUtil;
	}

	/* 
	 * Define o parâmetro extra para essa requisição em específico.
	  *No caso, essa requisição exige um método post e
	  *um corpo que será mapeado para um objeto java.
	*/
	@PostMapping("/login")
	//Criamos LoginRequest para desserializar o corpo enviado pelo cliente
	public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest request) {
		// Cria um objeto User
		User user = authService.authenticate(request.getEmail(), request.getPassword());

		// Classe utilitária que gera o token JWT usando o email enviado pelo cliente
		String token = jwtUtil.generateToken(user.getEmail());

		// Desserializa objetos JSON em um map java que separa pares de chave/valor
		// para montar a resposta da requisição
		Map<String, Object> response = new HashMap<>();
		// Insere "user" como chave e um object (json) no valor com os dados buscados no
		// bd
		// Como serão dados servidos ao cliente, enviamos um DTO da entidade
		response.put("user", new UserDTO(user));
		// Insere "token" como chave e um token no valor. O token foi gerado pelo
		// jwtUtil
		response.put("token", token);

		// Retorna os dados do usuário, o token gerado e o status "ok" para o cliente
		return ResponseEntity.ok(response);
	}
}
