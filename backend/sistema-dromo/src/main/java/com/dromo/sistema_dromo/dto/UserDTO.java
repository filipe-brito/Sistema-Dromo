package com.dromo.sistema_dromo.dto;

import com.dromo.sistema_dromo.model.User;

/*
 * O pacote DTO (Data Transfer Object) é responsável por representar os dados que são transferidos entre as camadas da aplicação.
 * 
 * Os DTOs são usados para:
 * - Evitar expor diretamente as entidades do banco de dados (Model) para o cliente.
 * - Filtrar dados sensíveis ou desnecessários, garantindo a segurança e a otimização do desempenho.
 * - Adaptar os dados para diferentes necessidades, como formatar datas ou agregar informações de várias entidades.
 * 
 * Exemplo: Um DTO pode conter apenas o nome e o e-mail de um usuário, omitindo campos como senha ou dados internos.
 */

public class UserDTO {
	private String name;
	private String email;
	private boolean active;

	public UserDTO() {

	}

	public UserDTO(User user) {
		this.name = user.getName();
		this.email = user.getEmail();
		this.active = user.getActive();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}
}
