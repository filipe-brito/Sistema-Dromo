package com.dromo.sistema_dromo.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dromo.sistema_dromo.model.User;
import com.dromo.sistema_dromo.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;

	public List<User> listUsers() {
		return userRepository.findAll();
	}
}

