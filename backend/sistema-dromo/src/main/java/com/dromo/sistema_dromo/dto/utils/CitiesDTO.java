package com.dromo.sistema_dromo.dto.utils;

public class CitiesDTO {
	private Integer id;
	private Integer ibgeCode;
	private String name;
	private String state;

	public Integer getId() {
		return id;
	}

	public Integer getIbgeCode() {
		return ibgeCode;
	}

	public String getName() {
		return name;
	}
	
	// Frontend precisa dessa tag para usar no input de autocomplete
	public String getState() {
		return state;
	}
	
	// Frontend precisa dessa tag para usar no input de autocomplete
	public String getLabel() {
		return name + " - " + state;
	}
	
	public int getValue() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setIbgeCode(Integer ibgeCode) {
		this.ibgeCode = ibgeCode;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setState(String state) {
		this.state = state;
	}

	public boolean validateCity() {
		if (id != null || ibgeCode != null) {
			return true;
		}
		return false;
	}
}
