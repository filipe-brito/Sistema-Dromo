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
	private LocalDate dob;
	private char gender;
	private String street;
	private int number;
	@Column(name = "zip_code")
	private String zipCode;
	
	
	public long getId() {
		return id;
	}
	public String getFullName() {
		return fullName;
	}
	public String getCpf() {
		return cpf;
	}
	public LocalDate getDob() {
		return dob;
	}
	public char getGender() {
		return gender;
	}
	public String getStreet() {
		return street;
	}
	public int getNumber() {
		return number;
	}
	public String getZipCode() {
		return zipCode;
	}	
}
