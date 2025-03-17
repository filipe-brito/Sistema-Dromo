package com.dromo.sistema_dromo.controller;

@RestController
@RequestMapping("/users")
public class UserController {
	@Autowired
	private UserService usuarioService;

	@GetMapping
	public List<User> listUsers() {
		return userService.listUsers();
	}
}
