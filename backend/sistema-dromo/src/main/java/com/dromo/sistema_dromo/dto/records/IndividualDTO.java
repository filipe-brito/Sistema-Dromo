package com.dromo.sistema_dromo.dto.records;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.dromo.sistema_dromo.dto.utils.CitiesDTO;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;

public class IndividualDTO {
	private Integer id;
	@NotEmpty(message = "Nome é obrigatório")
	private String name;
	@NotEmpty(message = "CPF é obrigatório")
	private String cpf;
	private char gender;
	private String maritalStatus;
	private String phone;
	private String cellphone;
	private LocalDate dob;
	private String rg;
	private String rntrc;
	private String email;
	private CitiesDTO birthCity;
	private String profileImageUrl;

	private List<IndividualAddressDTO> addresses;
	
	@Valid
	private DriverDTO driver;

	public Integer getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getCpf() {
		return cpf;
	}

	public char getGender() {
		return gender;
	}

	public String getMaritalStatus() {
		return maritalStatus;
	}

	public String getPhone() {
		return phone;
	}

	public String getCellphone() {
		return cellphone;
	}

	public LocalDate getDob() {
		return dob;
	}

	public String getRg() {
		return rg;
	}

	public String getRntrc() {
		return rntrc;
	}

	public String getEmail() {
		return email;
	}

	public CitiesDTO getBirthCity() {
		return birthCity;
	}

	public String getProfileImageUrl() {
		return profileImageUrl;
	}

	public List<IndividualAddressDTO> getAddresses() {
		return addresses;
	}

	public DriverDTO getDriver() {
		return driver;
	}
	
	/*
	 * Apesar de não haver um atributo "ocuppations", o JACKSON reconhece
	 * automaticamente os métodos que começam com "get" como propriedades 
	 * serializáveis.
	 * 
	 * Esse array armazena pares chave-valor, definindo true ou false para 
	 * as ocupações (propriedades) que não estiverem nulas
	 * 
	 * driver != null é um teste lógico. Retorna true se driver não for nulo
	 * e false se driver for nulo
	 */
	@JsonProperty("occupations")
	public Map<String, Boolean> getOccupations(){
		Map<String, Boolean> occupations = new HashMap<>();
		occupations.put("driver", driver != null);
		return occupations;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public void setGender(char gender) {
		this.gender = gender;
	}

	public void setMaritalStatus(String maritalStatus) {
		this.maritalStatus = maritalStatus;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public void setCellphone(String cellphone) {
		this.cellphone = cellphone;
	}

	public void setDob(LocalDate dob) {
		this.dob = dob;
	}

	public void setRg(String rg) {
		this.rg = rg;
	}

	public void setRntrc(String rntrc) {
		this.rntrc = rntrc;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setBirthCity(CitiesDTO birthCity) {
		this.birthCity = birthCity;
	}

	public void setProfileImageUrl(String profileImageUrl) {
		this.profileImageUrl = profileImageUrl;
	}

	public void setAddresses(List<IndividualAddressDTO> addresses) {
		this.addresses = addresses;
	}

	public void setDriver(DriverDTO driver) {
		this.driver = driver;
	}
}
