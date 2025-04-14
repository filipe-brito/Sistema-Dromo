package com.dromo.sistema_dromo.dto;

public class CompanyDTO {
	private String companyName;
	private String cnpj;
	
	public CompanyDTO(String companyName, String cnpj) {
		super();
		this.companyName = companyName;
		this.cnpj = cnpj;
	}

	public String getCompanyName() {
		return companyName;
	}

	public String getCnpj() {
		return cnpj;
	}
}
