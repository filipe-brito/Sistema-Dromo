package com.dromo.sistema_dromo.model.records;

import com.dromo.sistema_dromo.model.utils.Cities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "individuals_addresses", schema = "records")
public class IndividualAddress {
	@Id // Define que esse atributo é uma chave primária
	@GeneratedValue(strategy = GenerationType.IDENTITY) // Diz ao Hibernate que é o Postgre que vai definir o valor
														// desse id
	private Long id;
	/*
	 * Relação "muitos-para-um", no caso, muitos IndividualAddresses pertencem a um
	 * único Individual
	 * 
	 * FetchType.LAZY diz ao Hibernate para não carregar o registro inteiro de
	 * individual, mas somente o id. Caso precise de todos os dados de Individual,
	 * deve chamar um getIndividual explicitamente.
	 * 
	 * JoinColumn define que essa coluna guarda uma chave estrangeira
	 * 
	 * =============================================================================
	 * ==
	 * 
	 * Alteramos a lógica acima por causa de uma inconsistência que pode acontecer
	 * nesse caso, chamada "referência circular". Isso pode fazer o JACKSON entrar
	 * em um loop infinito. Sendo assim, alteramos o tipo para "long" e agora esse
	 * atributo vai guardar somente o id de Individual
	 */
	@Column(name = "individual_id")
	private Long individual;
	private String street;
	@Column(name = "street_number")
	private String streetNumber;
	private String neighborhood;
	@Column(name = "zip_code")
	private String zipCode;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "city_id")
	private Cities city;

	public Long getIndividual() {
		return individual;
	}

	public void setIndividual(Long individual) {
		this.individual = individual;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getStreetNumber() {
		return streetNumber;
	}

	public void setStreetNumber(String streetNumber) {
		this.streetNumber = streetNumber;
	}

	public String getNeighborhood() {
		return neighborhood;
	}

	public void setNeighborhood(String neighborhood) {
		this.neighborhood = neighborhood;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

	public Cities getCity() {
		return city;
	}

	public void setCity(Cities city) {
		this.city = city;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
}
