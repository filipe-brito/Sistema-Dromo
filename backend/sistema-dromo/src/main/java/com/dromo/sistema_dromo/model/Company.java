package com.dromo.sistema_dromo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "companies", schema = "records")
@SequenceGenerator(name = "company_seq", sequenceName = "companies_id_seq",allocationSize = 1)
public class Company {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "company_seq")
	private long id;
	@Column(name = "company_name")
	private String companyName;
	private String cnpj;
	
	public long getId() {
		return id;
	}
	public String getCompanyName() {
		return companyName;
	}
	public String getCnpj() {
		return cnpj;
	}
}
