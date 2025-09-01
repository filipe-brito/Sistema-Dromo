package com.dromo.sistema_dromo.dto.utils;

public class CitiesDTO {
	private int id;
	private int ibgeCode;
	private String name;
	private String state;

	public int getId() {
		return id;
	}

	public int getIbgeCode() {
		return ibgeCode;
	}

	public String getName() {
		return name;
	}

	public String getState() {
		return state;
	}

	public String getCityAndState() {
		return name + " - " + state;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setIbgeCode(int ibgeCode) {
		this.ibgeCode = ibgeCode;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setState(String state) {
		this.state = state;
	}

}
