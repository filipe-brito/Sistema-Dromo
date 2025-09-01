package com.dromo.sistema_dromo.dto.records;

public class CompanySummaryDTO {
	private int id;
	private String companyName;
	private String cnpj;

	public CompanySummaryDTO(int id, String companyName, String cnpj) {
		this.id = id;
		this.companyName = companyName;
		this.cnpj = cnpj;
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
}
