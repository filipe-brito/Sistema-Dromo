package com.dromo.sistema_dromo.dto;

import java.time.LocalDate;

public class IndividualDTO {
	private long id;
	private String name;
    private String cpf;
    private LocalDate dob;
    private char gender;
    private String street;
    private int number;
    private String zipCode;
    private String email;
    
    // Construtor
	public IndividualDTO(long id, String name, String cpf, LocalDate dob, char gender, String street, int number,
			String zipCode, String email) {
		super();
		this.id = id;
		this.name = name;
		this.cpf = cpf;
		this.dob = dob;
		this.gender = gender;
		this.street = street;
		this.number = number;
		this.zipCode = zipCode;
		this.email = email;
	}

	public long getId() {
		return id;
	}

	public String getName() {
		return name;
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

	public String getEmail() {
		return email;
	}

}
