package com.dromo.sistema_dromo.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dromo.sistema_dromo.model.User;
import com.dromo.sistema_dromo.repository.UserRepository;

/*
 * Ela é chamada pelo controller para processar os dados e executar a lógica de negócio da aplicação. 
 * Como lida com dados, instancia objetos das classes em model (que representam os dados da aplicação), 
 * processa essas informações e as retorna para o controller. 
 */

@Service // Anotação Spring Boot. Declarada na classe para que o Spring trate ela como um service.
public class UserService {
	@Autowired // Anotação Spring Boot. Faz a injção automática do objeto imediatamente abaixo.
	private UserRepository userRepository;

	public List<User> listUsers() {
		return userRepository.findAll();
	}
}

