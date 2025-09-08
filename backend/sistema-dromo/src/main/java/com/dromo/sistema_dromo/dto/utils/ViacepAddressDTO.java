package com.dromo.sistema_dromo.dto.utils;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ViacepAddressDTO {

	@JsonProperty("cep")
	private String zipCode;
	@JsonProperty("logradouro")
	private String street;
	@JsonProperty("bairro")
	private String neighborhood;
	@JsonProperty("localidade")
	private String city;
	private String uf;
	@JsonProperty("estado")
	private String state;
	@JsonProperty("regiao")
	private String region;
	private Integer ibge;

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

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

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getUf() {
		return uf;
	}

	public void setUf(String uf) {
		this.uf = uf;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public Integer getIbge() {
		return ibge;
	}

	public void setIbgeCode(Integer ibge) {
		this.ibge = ibge;
	}
}
