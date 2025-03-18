package com.dromo.sistema_dromo.controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dromo.sistema_dromo.model.User;
import com.dromo.sistema_dromo.service.UserService;



@RestController
@RequestMapping("/users")
public class UserController {
	@Autowired
	private UserService userService;

	@GetMapping
	public List<User> listUsers() {
		return userService.listUsers();
	}
}
