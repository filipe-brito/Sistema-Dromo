package com.dromo.sistema_dromo.dto;

import java.time.LocalDate;

import com.dromo.sistema_dromo.model.Cities;

public class IndividualDTO {
	private int id;
	private String name;
        private String cpf;
        private char gender;
        private String maritalStatus;
        private String phone;
        private String cellphone;
        private LocalDate dob;
        private String rg;
        private String rntrc;
        private String email;
        private Cities birthCity;
    
    // Construtor
	public IndividualDTO(int id, String name, String cpf, char gender, String maritalStatus, String phone, String cellphone, LocalDate dob, String rg, String rntrc, String email, Cities birthCity) {
		super();
		this.id = id;
		this.name = name;
		this.cpf = cpf;
		this.gender = gender;
		this.maritalStatus = maritalStatus;
		this.phone = phone;
		this.cellphone = cellphone;
		this.dob = dob;
		this.rg = rg;
		this.rntrc = rntrc;
		this.email = email;
		this.birthCity = birthCity;
	}
	public IndividualDTO() {
		
	}

	public int getId() {
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
	
	public Cities getBirthCity() {
		return birthCity;
	}

	public void setId(int id) {
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
	
	public void setBirthCity(Cities birthCity) {
		this.birthCity = birthCity;
	}
}
