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
@Table(name = "individuals", schema = "records")
@SequenceGenerator(name = "individual_seq",sequenceName = "individuals_id_seq",allocationSize = 1)
public class Individual {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "individual_seq")
	private long id;
	@Column(name = "full_name")
	private String fullName;
	private String cpf;
	private char gender;
	@Column(name = "marital_status")
	private String maritalStatus;
	private String phone;
	@Column(name = "cell_phone")
	private String cellPhone;
	private LocalDate dob;
	private String rg;
	private String rntrc;
	private String email;
	
	public long getId() {
		return id;
	}
	public String getFullName() {
		return fullName;
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
	
	public void setId(long id) {
		this.id = id;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
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
