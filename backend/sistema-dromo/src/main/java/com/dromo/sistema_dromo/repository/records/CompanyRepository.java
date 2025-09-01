package com.dromo.sistema_dromo.repository.records;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.dromo.sistema_dromo.dto.records.CompanySummaryDTO;
import com.dromo.sistema_dromo.model.records.Company;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Integer> {
	// @Query cria uma query customizada para o método imediatamente abaixo
	// O parâmetro é a query e o método abaixo é como a query deve ser chamada no
	// código Java

	/*
	 * ':param' é uma variável que será substituída pelo valor do argumento no
	 * método '@Param' faz o mapeamento entre o parâmetro do método Java e o
	 * parâmetro nomeado da query
	 * 
	 * Aqui invertemos a ordem do LIKE e do IS NULL para forçar o Hibernate 6 a
	 * tipar o parâmetro como texto, evitando o erro “function lower(bytea) does not
	 * exist” no PostgreSQL.
	 */

	// Abaixo, analogia da query reordenada:
	//
	// SELECT i FROM Individual i
	// SELECIONE e traga tudo de i / onde i é um apelido dado à entidade Individual
	// (que representa uma tabela no banco de dados).
	//
	// WHERE ( LOWER(i.fullName) LIKE LOWER(CONCAT('%', :fullName, '%')) OR
	// :fullName IS NULL )
	// ONDE: primeiro aplique o filtro de busca parcial insensitive-case
//           e, caso o parâmetro :fullName seja null, essa parte será true e o filtro será ignorado.
	//
	// AND ( i.cpf LIKE CONCAT('%', :cpf, '%') OR :cpf IS NULL )
//           aplique o filtro de CPF como contains; se :cpf for null, ignore-o.
	//
	// AND ( LOWER(i.email) LIKE LOWER(CONCAT('%', :email, '%')) OR :email IS NULL )
//           aplique o filtro de email insensitive-case; se :email for null, ignore-o.
	//

	@Query("""
			    SELECT new com.dromo.sistema_dromo.dto.records.CompanySummaryDTO(
 		    c.id, c.companyName, c.cnpj
     )  
     FROM Company c
			    WHERE ( LOWER(c.companyName) LIKE LOWER(CONCAT('%', :companyName, '%'))   OR :companyName IS NULL )
			      AND ( c.cnpj            LIKE       CONCAT('%', :cnpj, '%')         OR :cnpj      IS NULL )
			""")
	Page<CompanySummaryDTO> findByFilters(@Param("companyName") String companyName, @Param("cnpj") String cnpj,
			Pageable pageable);
}
