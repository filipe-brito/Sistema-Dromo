package com.dromo.sistema_dromo.dto;

import java.time.LocalDate;

public class CompanyDTO {
	private int id;
	private String companyName;
	private String cnpj;
	private String tradeName;
	private LocalDate doe;
	private String municipalRegistration;
	private String stateRegistration;
	private String phone;
	private String email;
	
	
	public CompanyDTO(int id, String companyName, String cnpj, String tradeName, LocalDate doe, String municipalRegistration, String stateRegistration, String phone, String email) {
		super();
		this.id = id;
		this.companyName = companyName;
		this.cnpj = cnpj;
		this.tradeName = tradeName;
		this.doe = doe;
		this.municipalRegistration = municipalRegistration;
		this.stateRegistration = stateRegistration;
		this.phone = phone;
		this.email = email;
	}
	
	public CompanyDTO() {
		
	}

	public int getId() {
		return id;
	}
	
	public String getCompanyName() {
		return companyName;
	}


	public String getCnpj() {
		return cnpj;
	}


	public String getTradeName() {
		return tradeName;
	}


	public LocalDate getDoe() {
		return doe;
	}


	public String getMunicipalRegistration() {
		return municipalRegistration;
	}


	public String getStateRegistration() {
		return stateRegistration;
	}


	public String getPhone() {
		return phone;
	}


	public String getEmail() {
		return email;
	}

	
	public void setId(int id) {
		this.id = id;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}

	public void setTradeName(String tradeName) {
		this.tradeName = tradeName;
	}

	public void setDoe(LocalDate doe) {
		this.doe = doe;
	}

	public void setMunicipalRegistration(String municipalRegistration) {
		this.municipalRegistration = municipalRegistration;
	}

	public void setStateRegistration(String stateRegistration) {
		this.stateRegistration = stateRegistration;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
}
