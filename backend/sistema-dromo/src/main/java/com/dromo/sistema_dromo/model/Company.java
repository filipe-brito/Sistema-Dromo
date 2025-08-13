package com.dromo.sistema_dromo.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "companies", schema = "records")
@SequenceGenerator(name = "company_seq", sequenceName = "records.companies_id_seq", allocationSize = 1)
public class Company {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "company_seq")
	private int id;
	@Column(name = "company_name")
	private String companyName;
	private String cnpj;
	@Column(name = "trade_name")
	private String tradeName;
	private LocalDate doe;
	@Column(name = "municipal_registration")
	private String municipalRegistration;
	@Column(name = "state_registration")
	private String stateRegistration;
	private String phone;
	private String email;
	@Column(name = "profile_image_url")
	private String profileImageUrl;

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

	public String getProfileImageUrl() {
		return profileImageUrl;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public void setCnpj(String cnpj) {
		if (cnpj != null) {
			this.cnpj = cnpj.replaceAll("[^0-9]", "");
		} else {
			this.cnpj = null;
		}
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

	public void setProfileImageUrl(String profileImageUrl) {
		this.profileImageUrl = profileImageUrl;
	}

}
