package com.dromo.sistema_dromo.dto.records;

import com.dromo.sistema_dromo.dto.utils.CitiesDTO;

public class IndividualAddressDTO {
	private Long id;
	/*
	 * individual é uma FK dessa tabela, mas só precisamos do id nesse atributo. Então,
	 * Definimos ele como Long para que seja retornado o id ao invés de um objeto
	 * serializado.
	 */
	private Long individual;
	private String street;
	private String streetNumber;
	private String neighborhood;
	private String zipCode;
	private CitiesDTO city;

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

	public CitiesDTO getCity() {
		return city;
	}

	public void setCity(CitiesDTO city) {
		this.city = city;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
}
