package com.dromo.sistema_dromo.dto;

import java.time.LocalDate;

public class IndividualDTO {
	private int id;
	private String name;
    private String cpf;
    private char gender;
    private String maritalStatus;
    private String phone;
    private String cellPhone;
    private LocalDate dob;
    private String rg;
    private String rntrc;
    private String email;
    
    // Construtor
	public IndividualDTO(int id, String name, String cpf, char gender, String maritalStatus, String phone, String cellPhone, LocalDate dob, String rg, String rntrc, String email) {
		super();
		this.id = id;
		this.name = name;
		this.cpf = cpf;
		this.gender = gender;
		this.maritalStatus = maritalStatus;
		this.phone = phone;
		this.cellPhone = cellPhone;
		this.dob = dob;
		this.rg = rg;
		this.rntrc = rntrc;
		this.email = email;
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

	public String getCellPhone() {
		return cellPhone;
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

	public void setCellPhone(String cellPhone) {
		this.cellPhone = cellPhone;
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
	
	
}
