package com.dromo.sistema_dromo.dto.records;

import java.time.LocalDate;
import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class CompanyDTO {
	private Integer id;
	@NotEmpty(message = "Razão social é obrigatória")
	private String companyName;
	@NotEmpty(message = "CNPJ é obrigatório")
	private String cnpj;
	private String tradeName;
	@NotNull(message = "Data de fundação é obrigatória")
	private LocalDate doe;
	private String municipalRegistration;
	private String stateRegistration;
	private String phone;
	private String email;
	private String profileImageUrl;
	private List<CompanyAddressDTO> addresses;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getCnpj() {
		return cnpj;
	}

	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}

	public String getTradeName() {
		return tradeName;
	}

	public void setTradeName(String tradeName) {
		this.tradeName = tradeName;
	}

	public LocalDate getDoe() {
		return doe;
	}

	public void setDoe(LocalDate doe) {
		this.doe = doe;
	}

	public String getMunicipalRegistration() {
		return municipalRegistration;
	}

	public void setMunicipalRegistration(String municipalRegistration) {
		this.municipalRegistration = municipalRegistration;
	}

	public String getStateRegistration() {
		return stateRegistration;
	}

	public void setStateRegistration(String stateRegistration) {
		this.stateRegistration = stateRegistration;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getProfileImageUrl() {
		return profileImageUrl;
	}

	public void setProfileImageUrl(String profileImageUrl) {
		this.profileImageUrl = profileImageUrl;
	}

	public List<CompanyAddressDTO> getAddresses() {
		return addresses;
	}

	public void setAddresses(List<CompanyAddressDTO> addresses) {
		this.addresses = addresses;
	}
}
