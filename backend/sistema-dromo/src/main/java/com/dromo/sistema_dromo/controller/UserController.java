package com.dromo.sistema_dromo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dromo.sistema_dromo.model.User;
import com.dromo.sistema_dromo.service.UserService;

/*
 * Essa é uma classe que cumpre o papel de Controller, seguindo o modelo MVC. 
 * O Controller é o componente responsável por gerenciar as requisições do usuário e coordenar a interação entre a View (interface do usuário) e o Model (dados e regras de negócio). 
 * Ele age como um intermediário, recebendo as entradas do usuário, processando-as e decidindo qual resposta deve ser enviada de volta. 
 */


@RestController // Anotação do Spring Boot. Define a classe como Controller que gerencia requisições REST (GET, POST, etc). Basicamente, cria uma API do sistema. Os métodos da classe retornam dados que serão automaticamente convertidos em JSON. O @RestController também cuida do tratamento de exceções.
@RequestMapping("/users") // Anotação do Spring Boot. Por estar em nível de classe, define um prefixo que o client deve inserir na URL da requisição para acessar todos os métodos dessa classe. Também pode ser declarado em nível de método.
public class UserController {
	@Autowired // Anotação do Spring Boot. É feito automaticamente uma injeção de dependência do objeto imediatamente abaixo, transferindo a responsabilidade de criar esse objeto para o Spring Boot.
	private UserService userService; // Classe que criamos para representar serviços e regras de negócio.

	@GetMapping // Anotação do Spring Boot. Está diretamente associada a classes com anotação @RestController e complementa a ação do @RequestMapping. Faz com que toda requisição GET enviada ao prefixo definido no @GetMapping execute o método imediatamente abaixo.
	public List<User> listUsers() { // Método que chama outro método homônimo da classe de serviço.
		return userService.listUsers();
	}
}
