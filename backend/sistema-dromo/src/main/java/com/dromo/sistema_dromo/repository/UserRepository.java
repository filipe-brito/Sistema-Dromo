package com.dromo.sistema_dromo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dromo.sistema_dromo.model.User;

/*
 * O pacote repository é o responsável por fazer a comunicação direta com o banco de dados.
 * 
 * Nesse pacote, usamos somente interfaces. Para cada entidade, deverá ser criada uma 
 * interface que herda de JpaRepository.
 * A interface JpaRepository, da biblioteca Spring Data JPA, facilita muito o processo. 
 * Com ela, não precisamos configurar queries SQL diretamente, pois já temos métodos prontos
 * para operações básicas de CRUD (Create, Read, Update, Delete).
 * 
 * Como estamos usando a biblioteca Spring Data JPA, não precisamos usar a anotação @Repository.
 * O Spring já reconhece automaticamente interfaces que estendem JpaRepository como repositórios.
 */

/*
 * A interface JpaRepository recebe dois parâmetros:
 * User: entidade que foi criada e
 * Long: tipo de valor da chave primária.
 */
@Repository // Anotação opcional para indicar que esta interface é um repositório.
public interface UserRepository extends JpaRepository<User, Long> { 
	// Métodos personalizados podem ser adicionados aqui.
}