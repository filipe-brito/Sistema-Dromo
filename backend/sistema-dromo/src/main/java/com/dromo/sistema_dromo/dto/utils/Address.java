package com.dromo.sistema_dromo.dto.utils;

public class Address {

	private String street;
	private String neighborhood;
	private String zipCode;
	private CitiesDTO city;

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
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

}
