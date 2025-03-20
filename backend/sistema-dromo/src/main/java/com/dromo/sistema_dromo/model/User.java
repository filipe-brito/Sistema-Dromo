package com.dromo.sistema_dromo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

/*
 * Model é o pacote com as classes que vão representar os dados da aplicação.
 * 
 * No caso do Spring Boot e o JPA, as classes desses pacotes devem ser mapeadas para representar tabelas no banco de dados.
 * 
 * É algo semelhante ao que é feito no Jackson, em que fazemos um de-para de tags de um JSON com classes e parâmetros no java. Isso significa que a classe representa uma tabela no banco de dados, e cada instância dessa classe representa uma linha na tabela.
 * 
 * Os atributos da classe representam uma coluna na tablea do banco de dados.
 */

@Entity // Anotação da biblioteca JPA. Essa anotação define a classe imediatamente abaixo como uma representação java de uma tabela no banco de dados.

@Table(name = "users") // Anotação da biblioteca JPA. Complemento do @Entity. Especifica à qual tabela do banco de dados essa classe está associada. Caso não tenha a anotação, o JPA associa o nome da classe mesmo por padrão.

@SequenceGenerator( // Anotação da biblioteca JPA. Define que a classe imediatamente abaixo utilizará um gerador de sequência do banco de dados (como o SEQUENCE no PostgreSQL).Se não for definida, o Hibernate compartilhará uma mesma sequência global para todas as entidades, o que não é recomendado.
		name = "user_seq", // Apelido da sequência dentro do Hibernate, usado pelo @GeneratedValue.
		sequenceName = "user_sequence", // Nome real da sequência no banco de dados (PostgreSQL, por exemplo).
		allocationSize = 1 // Define quantos IDs serão alocados de uma vez na memória para otimizar performance.
		)

public class User {
	@Id // Anotação da biblioteca JPA. Define o atributo imediatamente abaixo como uma chave-primária da entidade no banco de dados. É um ID de valor único que identifica aquela linha.
	
	@GeneratedValue( // Anotação da biblioteca JPA. Complemento de @Id. Define que o valor do atributo imediatamente abaixo será gerado pelo próprio banco de dados automaticamente (auto-incremento).
			strategy = GenerationType.SEQUENCE, // Critério para gerar o valor. No caso, será usado um sequence do banco de dados.
			generator = "user_seq" // Complemento de @SequenceGenerator. Associa o atributo à uma sequência específica do Hibernate, definido no atributo "name" de @SequenceGenerator.
			) 	
	private Long id;
	private String name;
	private String email;
	
	public Long getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	public String getEmail() {
		return email;
	}
	
	
}