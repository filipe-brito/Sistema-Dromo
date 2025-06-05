package com.dromo.sistema_dromo.dto;

public class LoginRequest {
	
	// Para construir um objeto loginRequest, o cliente precisa enviar um email e uma senha,
	// que serão desserializados nos atributos abaixo
	private String email; // Guarda o email
	private String password; // Guarda a senha
	
	// Por ser um DTO simples, podemos usar o construtor implícito do java mesmo
	
	public String getEmail() {
		return email; // getter que retorna o email
	}
	
	// setter para alterar o valor do email. 
	//Jackson usa para jogar o valor recebido pelo cliente nesse atributo
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password; // getter que retorna a senha
	}
	
	// setter para alterar o valor da senha. 
	//Jackson usa para jogar o valor recebido pelo cliente nesse atributo
	public void setPassword(String password) {
		this.password = password; 
	}	
}
