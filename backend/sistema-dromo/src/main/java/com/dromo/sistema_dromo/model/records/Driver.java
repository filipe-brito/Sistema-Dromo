package com.dromo.sistema_dromo.model.records;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "drivers", schema = "records")
public class Driver {
	@Id // Define que esse atributo é uma chave primária
	// Diz ao Hibernate que é o Postgre que vai definir o valor desse id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "person_type", nullable = false)
	private String personType;
	
	/*
	 * Não é necessário definir a relação aqui, pois Driver só será carregado
	 * a partir de Individual. Então, a anotação OneToOne deve ser colocada em
	 * Individual
	 * 
	 * JoinColumn define que essa coluna guarda uma chave estrangeira. O parâmetro
	 * define a qual coluna esse atributo se refere
	 * 
	 */
	@OneToOne
	@JoinColumn(name = "individual_id")
	private Individual individualId;
	
	// Company nunca será Driver, mas implementei aqui e no banco como boa prática
	@OneToOne
	@JoinColumn(name = "company_id")
	private Company companyId;
	@Column(name = "license_number", nullable = false)
	private String licenseNumber;
	@Column(name = "license_type", nullable = false)
	private String licenseType;
	
	public Driver() {
	}
	
	public Driver(String personType) {
		this.personType = personType;
	}
	

	public Long getId() {
		return id;
	}

	public String getPersonType() {
		return personType;
	}

	public Individual getIndividualId() {
		return individualId;
	}

	public Company getCompanyId() {
		return companyId;
	}

	public String getLicenseNumber() {
		return licenseNumber;
	}

	public String getLicenseType() {
		return licenseType;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setPersonType(String personType) {
		this.personType = personType;
	}

	public void setIndividualId(Individual individualId) {
		this.individualId = individualId;
	}

	public void setCompanyId(Company companyId) {
		this.companyId = companyId;
	}

	public void setLicenseNumber(String licenseNumber) {
		this.licenseNumber = licenseNumber;
	}

	public void setLicenseType(String licenseType) {
		this.licenseType = licenseType;
	}
	
}
