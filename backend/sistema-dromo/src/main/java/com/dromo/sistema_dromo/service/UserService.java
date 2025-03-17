package com.dromo.sistema_dromo.service;

@Service
public class UsuerService {
	@Autowired
	private UserRepository usuarioRepository;

	public List<User> listarUsuarios() {
		return userRepository.findAll();
	}
}

