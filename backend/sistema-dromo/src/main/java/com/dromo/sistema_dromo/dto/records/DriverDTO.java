package com.dromo.sistema_dromo.dto.records;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;

public class DriverDTO {
	private Long id;
	private String personType;
	private Integer individualId;
	private Integer companyId;
	@NotEmpty(message = "CNH é obrigatório")
	private String licenseNumber;
	@NotEmpty(message = "Tipo de licença é obrigatório")
	@Pattern(regexp = "A|AB|AC|AD|AE|B|C|D|E")
	private String licenseType;
	
	public DriverDTO() {
	}
	
	public DriverDTO(String personType) {
		this.personType = personType;
	}
	
	public Long getId() {
		return id;
	}
	public String getPersonType() {
		return personType;
	}
	public Integer getIndividualId() {
		return individualId;
	}
	public Integer getCompanyId() {
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

	public void setIndividualId(Integer individualId) {
		this.individualId = individualId;
	}

	public void setCompanyId(Integer companyId) {
		this.companyId = companyId;
	}

	public void setLicenseNumber(String licenseNumber) {
		this.licenseNumber = licenseNumber;
	}

	public void setLicenseType(String licenseType) {
		this.licenseType = licenseType;
	}		
}
