package com.dromo.sistema_dromo.dto.records;

public class IndividualSummaryDTO {
	private int id;
	private String name;
	private String cpf;
	private String email;

	public IndividualSummaryDTO(int id, String name, String cpf, String email) {
		this.id = id;
		this.name = name;
		this.cpf = cpf;
		this.email = email;
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

	public String getEmail() {
		return email;
	}
}
