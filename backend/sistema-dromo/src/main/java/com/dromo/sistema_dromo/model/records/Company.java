package com.dromo.sistema_dromo.model.records;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "companies", schema = "records")
@SequenceGenerator(name = "company_seq", sequenceName = "records.companies_id_seq", allocationSize = 1)
public class Company {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "company_seq")
	private Integer id;
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

	/*
	 * Sempre que o front pedir dados de um Company, devemos retornar todos os
	 * endereços vinculados a ele. Para isso, definimos uma lista do objeto
	 * CompanyAddress . A relação aqui é de "um-para-muitos", ou seja, um company
	 * pode ter muitos endereços.
	 * 
	 * Não vinculamos o atributo à uma coluna da tabela companies_addresses do
	 * Postgre com JoinColumn, afinal, não existe uma coluna de chave estrangeira na
	 * tabela individuals, mas devemos vincular a um atributo da classe
	 * CompanyAddress, afinal é essa classe que é a "dona da relação". Essa classe
	 * possui um atributo individual que está vinculado ao company_id do bd. Para
	 * fazer esse mapeamento, usamos a propriedade "mappedBy"
	 */
	@OneToMany(mappedBy = "company", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonManagedReference
	private List<CompanyAddress> addresses = new ArrayList<>();

	// --- Helper ---
	public void addAddress(CompanyAddress address) {
		addresses.add(address); // adiciona na lista do pai
		address.setCompany(this); // seta o pai no lado "ManyToOne"
	}

	public Integer getId() {
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

	public void setId(Integer id) {
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

	public List<CompanyAddress> getAddresses() {
		return addresses;
	}

	public void setAddresses(List<CompanyAddress> addresses) {
		this.addresses = addresses;
	}

}
