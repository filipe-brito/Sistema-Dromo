package com.dromo.sistema_dromo.dto;

// Se você usa Lombok (se não, faremos o construtor manual como fizemos antes)
// import lombok.AllArgsConstructor;
// import lombok.Data; // Para getters, setters, toString, equals, hashCode

// Esta classe representa a resposta que será enviada ao cliente após o login.
// Ela encapsula os dados do usuário (no formato DTO) e o token JWT.
public class LoginResponse {

    private UserDTO user; // Objeto UserDTO com os dados do usuário (sem senha)
    private String token; // O token JWT gerado

    // Construtor manual
    public LoginResponse(UserDTO user, String token) {
        this.user = user;
        this.token = token;
    }

    // Getters e Setters manuais (se não usar Lombok)
    // Se você estiver usando Lombok, pode usar @Data ou @Getter/@Setter
    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}