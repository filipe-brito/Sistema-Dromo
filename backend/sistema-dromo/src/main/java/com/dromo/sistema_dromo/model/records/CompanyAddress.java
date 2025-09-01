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
@Table(name = "companies_addresses", schema = "records")
public class CompanyAddress {
	@Id // Define que esse atributo é uma chave primário no banco de dados
	/*
	 * GeneratedValue: define como os valores serão atribuídos nesse atributo
	 * 
	 * strategy = GenerationType.IDENTITY: Diz ao hibernate que o Postgre vai
	 * definir o valor desse id
	 */
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "company_id")
	private Long company;
	private String street;
	@Column(name = "street_number")
	private String streetNumber;
	private String neighborhood;
	@Column(name = "zip_code")
	private String zipCode;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "city_id") // Diz que esse atributo guarda uma chave estrangeira
	private Cities city;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getCompany() {
		return company;
	}

	public void setCompany(Long company) {
		this.company = company;
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
}
