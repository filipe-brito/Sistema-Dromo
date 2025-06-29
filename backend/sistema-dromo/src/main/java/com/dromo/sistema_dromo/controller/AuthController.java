package com.dromo.sistema_dromo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dromo.sistema_dromo.dto.LoginRequest;
import com.dromo.sistema_dromo.dto.LoginResponse;
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

	public AuthController(AuthService authService) {
		this.authService = authService;

	}

	/* 
	  * Define o parâmetro extra para essa requisição em específico.
	  * No caso, essa requisição exige um método post e
	  * um corpo que será mapeado para um objeto java.
	*/
	@PostMapping("/login")
	//Criamos LoginRequest para desserializar o corpo enviado pelo cliente
	public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
		
		// ADICIONE A LINHA ABAIXO: O AuthService agora vai fazer todo o trabalho e retornar o AuthResponse.
	    LoginResponse authResponse = authService.authenticate(request); // <-- ALTERAR CHAMADA E TIPO DE RETORNO DO authService

		// Retorna os dados do usuário, o token gerado e o status "ok" para o cliente
		return ResponseEntity.ok(authResponse);
	}
}
